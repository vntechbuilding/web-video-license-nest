import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import {
  catchError,
  forkJoin,
  from,
  map,
  Observable,
  of,
  switchMap,
  throwError,
  zip,
} from 'rxjs';
import {
  createKeyAndTokenPair,
  invalidLoginInformation,
  invalidTokenInformation,
  loginDisabled,
  decodeToken,
} from '../../utils/auth-utils/auth-utils';
import { VerifyErrors } from 'jsonwebtoken';
import { verify } from 'argon2';
import { Prisma, admin, adminAuthToken } from '@prisma/client';
import { randomUUID } from 'crypto';
export declare type adminTokenRs = {
  accessToken: string;
  refreshToken: string;
  token: string;
  userId: string;
  username: string;
};
@Injectable()
export class AdminAuthService {
  constructor(private prisma: PrismaService) {}

  decodeToken(token: string, tokenId: string, accessToken: boolean = false) {
    return from(
      this.prisma.adminAuthToken.findUnique({
        where: {
          id: tokenId,
        },
      }),
    ).pipe(
      switchMap((adminAuthToken) => {
        // console.log('decodeToken adminAuthToken ', adminAuthToken);
        if (!adminAuthToken) {
          invalidTokenInformation();
        }
        // console.log(token, tokenId);
        return decodeToken(token, adminAuthToken.publicKey).pipe(
          map((decoded) => {
            // console.log('decodeToken Success', decoded);
            if (!decoded) {
              invalidTokenInformation();
            }
            if (!accessToken && !decoded.refreshToken) {
              //Kiểm tra refresh token
              invalidTokenInformation();
            }
            return {
              tokenId: String(decoded.tokenId).toString(),
              adminAuthToken: adminAuthToken,
              adminId: String(decoded.adminId).toString(),
              token: token,
            };
          }),
          catchError((err: VerifyErrors) => {
            // console.log('decodeToken Error', err);
            if (err.name === 'TokenExpiredError') {
              if (accessToken) {
                //accessToken
                return this.logoutAccessToken(
                  adminAuthToken.refreshToken,
                  token,
                ).pipe(switchMap(() => throwError(() => err)));
              } else {
                //refreshToken logout
                return this.logout(adminAuthToken.refreshToken).pipe(
                  switchMap(() => throwError(() => err)),
                );
              }
            }
            return throwError(() => err);
          }),
        );
      }),
    );
  }
  verifyRefreshToken(token: string, tokenId: string, adminId: string) {
    return this.decodeToken(token, tokenId, false).pipe(
      switchMap((decoded) => {
        if (
          decoded.adminId != adminId ||
          token != decoded.adminAuthToken.refreshToken
        )
          invalidTokenInformation();
        return this.getAdminWithAuthToken(adminId, decoded.adminAuthToken);
      }),
    );
  }
  getNewAuthToken(refreshToken: string, tokenId: string, adminId: string) {
    return this.verifyRefreshToken(refreshToken, tokenId, adminId).pipe(
      switchMap(({ admin, adminAuthToken }) => {
        if (!admin) {
          invalidLoginInformation();
        }
        return this.signToken(
          admin.id,
          adminAuthToken.ip,
          adminAuthToken.userAgent,
        );
      }),
    );
  }
  logoutAccessToken(accessToken: string, refreshToken: string) {
    return from(
      this.prisma.adminAuthToken.findUnique({
        where: {
          refreshToken: refreshToken,
        },
      }),
    ).pipe(
      switchMap((authData) => {
        // console.log('logout', refreshToken, authData);
        if (authData) {
          return from(
            this.prisma.adminAuthTokenExpired.upsert({
              create: {
                adminId: authData.adminId,
                accessToken: [accessToken],
              },
              update: {
                accessToken: {
                  push: accessToken,
                },
              },
              where: {
                refreshToken: authData.refreshToken,
              },
            }),
          ).pipe(map(() => true));
        } else {
          return of(false);
        }
      }),
    );
  }

  logout(refreshToken: string) {
    return from(
      this.prisma.adminAuthToken.findUnique({
        where: {
          refreshToken: refreshToken,
        },
      }),
    ).pipe(
      switchMap((authData) => {
        // console.log('logout', refreshToken, authData);
        if (authData) {
          return zip(
            this.prisma.adminAuthToken.delete({
              where: {
                refreshToken: refreshToken,
              },
            }),
            this.prisma.adminAuthTokenExpired.upsert({
              create: {
                adminId: authData.adminId,
                refreshToken: authData.refreshToken,
              },
              update: {
                adminId: authData.adminId,
                createdAt: new Date(),
              },
              where: {
                refreshToken: authData.refreshToken,
              },
            }),
          ).pipe(map(() => true));
        } else {
          return of(false);
        }
      }),
    );
  }

  login(
    username: string,
    password: string,
    ip: string,
    userAgent: string,
  ): Observable<adminTokenRs> {
    return from(
      this.prisma.admin.findUnique({
        where: {
          username: username,
        },
      }),
    ).pipe(
      switchMap((admin) => {
        if (!admin) {
          return invalidLoginInformation();
        }
        if (admin.disabled) {
          return loginDisabled();
        }
        const pwMatches = verify(admin.hash, password);
        if (!pwMatches) {
          return invalidLoginInformation();
        }
        return this.returnToken(ip, userAgent, admin);
      }),
    );
  }

  returnToken(
    ip: string,
    userAgent: string,
    admin: admin,
  ): Observable<adminTokenRs> {
    return this.signToken(admin.id, ip, userAgent).pipe(
      map((tokenData) => {
        return {
          ...tokenData,
          username: admin.username,
          userId: admin.id,
        };
      }),
    );
  }

  signToken(
    adminId: string,
    ip: string,
    userAgent: string,
  ): Observable<adminTokenRs> {
    const tokenId = randomUUID();
    const tokenData = createKeyAndTokenPair({
      tokenId,
      adminId,
    });
    return this.removeTokenAdminId(adminId).pipe(
      switchMap(() =>
        from(
          this.prisma.adminAuthToken.create({
            data: {
              id: tokenId,
              publicKey: tokenData.publicKey,
              refreshToken: tokenData.refreshToken,
              adminId: adminId,
              ip,
              userAgent,
            },
            include: {
              admin: true,
            },
          }),
        ).pipe(
          map((adminAuthToken) => {
            return {
              accessToken: tokenData.accessToken,
              refreshToken: tokenData.refreshToken,
              token: tokenId,
              userId: adminId,
              username: adminAuthToken.admin.username,
            };
          }),
        ),
      ),
    );
  }

  getAdminWithAuthToken(adminId: string, adminAuthToken: adminAuthToken) {
    return from(
      this.prisma.admin.findUnique({
        where: {
          id: adminId,
        },
      }),
    ).pipe(
      map((admin) => {
        if (!admin) invalidTokenInformation();
        return { admin, adminAuthToken };
      }),
    );
  }
  removeTokenAdminId(adminId: string) {
    return from(
      this.prisma.adminAuthToken.findMany({
        where: {
          adminId: adminId,
        },
      }),
    ).pipe(
      switchMap((adminAuthTokenList) => {
        if (adminAuthTokenList.length) {
          const listId: Array<string> = [];
          const createData: Array<Prisma.adminAuthTokenExpiredCreateManyInput> =
            [];
          adminAuthTokenList.forEach((token) => {
            listId.push(token.id);
            createData.push({
              id: token.id,
              adminId: token.adminId,
              refreshToken: token.refreshToken,
            });
          });
          return forkJoin(
            this.prisma.adminAuthTokenExpired.createMany({
              data: createData,
              skipDuplicates: true,
            }),
            this.prisma.adminAuthToken.deleteMany({
              where: {
                id: {
                  in: listId,
                },
              },
            }),
          );
        } else return of(true);
      }),
    );
  }
}
