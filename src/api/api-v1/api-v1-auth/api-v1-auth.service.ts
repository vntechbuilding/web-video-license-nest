import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../middleware/prisma/prisma.service';
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
import { hash, verify } from 'argon2';
import { user, Prisma, userAuthToken } from '@prisma/client';
// import process from 'process';
import { randomUUID } from 'crypto';
import {
  createKeyAndTokenPair,
  decodeToken,
  invalidTokenInformation,
  invalidLoginInformation,
  loginDisabled,
} from '../../../utils/auth-utils/auth-utils';
import { VerifyErrors } from 'jsonwebtoken';
import { UserAuthRegisterDto } from './dto/user-auth-register.dto';
import { omit } from 'lodash';
import { InjectQueue } from '@nestjs/bull';
import { BullSendUserForgotPasswordEmail } from '../../../bull.config';
import { Queue } from 'bull';
import { UserAuthResetPasswordDto } from './dto/user-auth-reset-password.dto';
export declare type userDataType = {
  email: string;
  phone: string;
  userId: string;
  fullName: string;
};
export declare type userTokenRs = {
  accessToken: string;
  refreshToken: string;
  token: string;
} & userDataType;
@Injectable()
export class ApiV1AuthService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue(BullSendUserForgotPasswordEmail)
    private sendForgotPassword: Queue,
  ) {}
  //@InjectQueue(BullUpdateUserBalanceName) private updateUserBalance: Queue,
  register(data: UserAuthRegisterDto, ip: string, userAgent: string) {
    return from(hash(data.password)).pipe(
      switchMap((hashPassword) =>
        this.prisma.user.create({
          data: {
            hash: hashPassword,
            ...omit(data, 'password', 'passwordConfirm', 'recaptcha', 'system'),
          },
        }),
      ),
      switchMap((userData) => {
        return this.returnToken(ip, userAgent, userData);
      }),
    );
  }

  resetPassword(
    resetData: UserAuthResetPasswordDto,
    ip: string,
    userAgent: string,
  ) {
    return from(
      this.prisma.userForgotPasswordCode.findUnique({
        where: {
          code: resetData.code,
        },
        // include: {
        //   user: true,
        // },
      }),
    ).pipe(
      switchMap((userForgotPasswordCode) => {
        if (!userForgotPasswordCode) {
          throw new Error('Mã xác nhận không hợp lệ');
        }
        return from(hash(resetData.password)).pipe(
          switchMap((passwordHash) => {
            return this.prisma.user.update({
              where: {
                id: userForgotPasswordCode.userId,
              },
              data: {
                hash: passwordHash,
              },
            });
          }),
        );
      }),
      switchMap((userData) => {
        return this.returnToken(ip, userAgent, userData);
      }),
    );
  }

  forgotPassword(email: string) {
    return from(
      this.prisma.user.findUnique({
        where: {
          email: email,
        },
      }),
    ).pipe(
      switchMap((user) => {
        if (!user) {
          throw new Error('Dữ liệu không hợp lệ');
        } else {
          return from(
            this.sendForgotPassword.add(
              'send',
              {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
              },
              {
                jobId: user.id,
                removeOnFail: true,
                removeOnComplete: true,
              },
            ),
          ).pipe(map(() => true));
        }
      }),
    );
  }

  decodeToken(token: string, tokenId: string, accessToken: boolean = false) {
    return from(
      this.prisma.userAuthToken.findUnique({
        where: {
          id: tokenId,
        },
      }),
    ).pipe(
      switchMap((userAuthToken) => {
        // console.log('decodeToken userAuthToken ', userAuthToken);
        if (!userAuthToken) {
          invalidTokenInformation();
        }
        // console.log(token, tokenId);
        return decodeToken(token, userAuthToken.publicKey).pipe(
          switchMap((decoded) => {
            // console.log('decodeToken Success', decoded);
            if (!decoded) {
              invalidTokenInformation();
            }
            if (!accessToken && !decoded.refreshToken) {
              //Kiểm tra refresh token
              invalidTokenInformation();
            }
            return from(
              this.prisma.userAuthToken.update({
                where: {
                  id: userAuthToken.id,
                },
                data: {
                  usedAt: new Date(),
                },
              }),
            )
              .pipe(
                catchError((err) => {
                  console.log(err);
                  return invalidTokenInformation();
                }),
              )
              .pipe(
                map(() => {
                  return {
                    tokenId: String(decoded.tokenId).toString(),
                    userAuthToken: userAuthToken,
                    userId: String(decoded.userId).toString(),
                    token: token,
                  };
                }),
              );
          }),
          catchError((err: VerifyErrors) => {
            // console.log('decodeToken Error', err);
            if (err.name === 'TokenExpiredError') {
              if (accessToken) {
                //accessToken
                return this.logoutAccessToken(
                  userAuthToken.refreshToken,
                  token,
                ).pipe(switchMap(() => throwError(() => err)));
              } else {
                //refreshToken logout
                return this.logout(userAuthToken.refreshToken).pipe(
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
  verifyRefreshToken(token: string, tokenId: string, userId: string) {
    return this.decodeToken(token, tokenId, false).pipe(
      switchMap((decoded) => {
        if (
          decoded.userId != userId ||
          token != decoded.userAuthToken.refreshToken
        )
          invalidTokenInformation();
        return this.getUserWithAuthToken(userId, decoded.userAuthToken);
      }),
    );
  }
  // getNewAuthToken(refreshToken: string, tokenId: string, userId: string) {
  //   return this.verifyRefreshToken(refreshToken, tokenId, userId).pipe(
  //     switchMap(({ user, userAuthToken }) => {
  //       if (!user) {
  //         invalidLoginInformation();
  //       }
  //       return this.signToken(
  //         user.id,
  //         userAuthToken.ip,
  //         userAuthToken.userAgent,
  //       );
  //     }),
  //   );
  // }
  logoutAccessToken(accessToken: string, refreshToken: string) {
    return from(
      this.prisma.userAuthToken.findUnique({
        where: {
          refreshToken: refreshToken,
        },
      }),
    ).pipe(
      switchMap((authData) => {
        // console.log('logout', refreshToken, authData);
        if (authData) {
          return from(
            this.prisma.userAuthTokenExpired.upsert({
              create: {
                userId: authData.userId,
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
  logoutById(tokenId: string, userId: string) {
    return from(
      this.prisma.userAuthToken.findUnique({
        where: {
          id: tokenId,
          userId: userId,
        },
      }),
    ).pipe(
      switchMap((authData) => {
        // console.log('logout', refreshToken, authData);
        return this.logoutAuthData(authData);
      }),
    );
  }
  logout(refreshToken: string) {
    return from(
      this.prisma.userAuthToken.findUnique({
        where: {
          refreshToken: refreshToken,
        },
      }),
    ).pipe(
      switchMap((authData) => {
        // try {
        //   this.prisma.machine
        //     .update({
        //       where: {
        //         tokenId: authData.id,
        //       },
        //       data: {
        //         tokenId: null,
        //       },
        //     })
        //     .then();
        // } catch (e) {}
        // console.log('logout', refreshToken, authData);
        return this.logoutAuthData(authData);
      }),
    );
  }

  logoutAuthData(authData: userAuthToken) {
    if (authData) {
      return zip(
        this.prisma.userAuthToken.delete({
          where: {
            id: authData.id,
          },
        }),
        this.prisma.userAuthTokenExpired.upsert({
          create: {
            userId: authData.userId,
            refreshToken: authData.refreshToken,
          },
          update: {
            userId: authData.userId,
            createdAt: new Date(),
          },
          where: {
            refreshToken: authData.refreshToken,
          },
        }),
      ).pipe(
        map(([userAuthToken]) => {
          return {
            createdAt: userAuthToken.createdAt,
            id: authData.id,
          };
        }),
      );
    } else {
      return of(false);
    }
  }

  login(
    username: string,
    password: string,
    ip: string,
    userAgent: string,
  ): Observable<userTokenRs> {
    return from(
      this.prisma.user.findFirst({
        where: {
          OR: [
            {
              email: username.toLowerCase(),
            },
            {
              phone: username.toLowerCase(),
            },
          ],
        },
      }),
    ).pipe(
      switchMap((user) => {
        if (!user) {
          return invalidLoginInformation();
        }
        if (user.disabled) {
          return loginDisabled();
        }
        const pwMatches = verify(user.hash, password);
        if (!pwMatches) {
          return invalidLoginInformation();
        }
        return this.returnToken(ip, userAgent, user);
      }),
    );
  }

  returnToken(
    ip: string,
    userAgent: string,
    user: user,
  ): Observable<userTokenRs> {
    return this.signToken(user.id, ip, userAgent, new Date()).pipe(
      map((tokenData) => {
        return {
          ...tokenData,
          email: user.email,
          phone: user.phone,
          fullName: user.fullName,
          userId: user.id,
        };
      }),
    );
  }

  signToken(
    userId: string,
    ip: string,
    userAgent: string,
    createdAt = new Date(),
    authId?: string,
  ): Observable<userTokenRs> {
    const tokenId = authId ? authId : randomUUID();
    const tokenData = createKeyAndTokenPair({
      tokenId,
      userId,
    });
    // return this.removeTokenUserId(userId).pipe(
    //   switchMap(() =>
    return from(
      this.prisma.userAuthToken.create({
        data: {
          id: tokenId,
          publicKey: tokenData.publicKey,
          refreshToken: tokenData.refreshToken,
          userId: userId,
          ip,
          userAgent,
          createdAt: createdAt,
        },
      }),
    )
      .pipe(
        switchMap(() =>
          this.prisma.user.findUnique({
            where: {
              id: userId,
            },
          }),
        ),
      )
      .pipe(
        map((user) => {
          return {
            accessToken: tokenData.accessToken,
            refreshToken: tokenData.refreshToken,
            token: tokenId,
            userId: userId,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
          };
        }),
      );
    //   ),
    // );
  }

  getUserWithAuthToken(userId: string, userAuthToken: userAuthToken) {
    return from(
      this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      }),
    ).pipe(
      map((user) => {
        if (!user) invalidTokenInformation();
        return { user, userAuthToken };
      }),
    );
  }
  removeTokenUserId(userId: string) {
    return from(
      this.prisma.userAuthToken.findMany({
        where: {
          userId: userId,
        },
      }),
    ).pipe(
      switchMap((UserAuthTokenList) => {
        if (UserAuthTokenList.length) {
          const listId: Array<string> = [];
          const createData: Array<Prisma.userAuthTokenExpiredCreateManyInput> =
            [];
          UserAuthTokenList.forEach((token) => {
            listId.push(token.id);
            createData.push({
              id: token.id,
              userId: token.userId,
              refreshToken: token.refreshToken,
            });
          });
          return forkJoin([
            this.prisma.userAuthTokenExpired.createMany({
              data: createData,
              skipDuplicates: true,
            }),
            this.prisma.userAuthToken.deleteMany({
              where: {
                id: {
                  in: listId,
                },
              },
            }),
          ]);
        } else return of(true);
      }),
    );
  }
}
