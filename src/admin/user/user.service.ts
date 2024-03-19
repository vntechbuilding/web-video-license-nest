import { Injectable } from '@nestjs/common';
import { Prisma, user } from '@prisma/client';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { from, map, of, switchMap } from 'rxjs';
import { UserCreateDto } from './dto/user.create.dto';
import { hash } from 'argon2';
import { omit } from 'lodash';
import { UserUpdateDto } from './dto/user.update.dto';
import { UserUpdateDisabledDto } from './dto/user.update-disabled.dto';
import { UserChangePasswordDto } from './dto/user.change-password.dto';
import { ApiV1AuthService } from '../../api/api-v1/api-v1-auth/api-v1-auth.service';
export const userSelect: Prisma.userSelect = {
  id: true,
  email: true,
  phone: true,
  fullName: true,
  disabled: true,
  createdAt: true,
};
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private userAuth: ApiV1AuthService,
  ) {}

  getAllUser(perPage = 10, page = 0) {
    return from(
      this.prisma.$transaction([
        this.prisma.user.findMany({
          take: perPage,
          skip: page * perPage,
          select: userSelect,
        }),
        this.prisma.user.count(),
      ]),
    ).pipe(map(([data, count]) => ({ data, count })));
  }

  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: userSelect,
    });
  }
  createUser(data: UserCreateDto) {
    return from(hash(data.password)).pipe(
      switchMap((hashPassword) =>
        this.prisma.user.create({
          data: {
            ...omit(data, 'password', 'passwordConfirm'),
            hash: hashPassword,
          },
          select: userSelect,
        }),
      ),
    );
  }

  //TODO
  updateUser(data: UserUpdateDto) {
    return from(
      this.prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          ...omit(data, 'id'),
        },
        select: userSelect,
      }),
    ).pipe(switchMap((userData) => this.checkDisabled(userData)));
  }

  //TODO
  updateDisabled(data: UserUpdateDisabledDto) {
    return from(
      this.prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          disabled: data.disabled,
        },
        select: userSelect,
      }),
    ).pipe(switchMap((userData) => this.checkDisabled(userData)));
  }

  deleteUser(userId: string) {
    return from(
      this.prisma.user.delete({
        where: {
          id: userId,
        },
        select: userSelect,
      }),
    ).pipe(switchMap((userData) => this.removeToken(userData)));
  }

  //TODO
  changePassword(changePasswordData: UserChangePasswordDto) {
    return from(hash(changePasswordData.password))
      .pipe(
        switchMap((hashPassword) => {
          return this.prisma.user.update({
            where: {
              id: changePasswordData.id,
            },
            data: {
              hash: hashPassword,
            },
            select: userSelect,
          });
        }),
      )
      .pipe(switchMap((userData) => this.removeToken(userData)));
  }

  checkDisabled(userData: Partial<user>) {
    if (userData.disabled) {
      return this.userAuth
        .removeTokenUserId(userData.id)
        .pipe(map(() => userData));
    }
    return of(userData);
  }

  removeToken(userData: Partial<user>) {
    return this.userAuth
      .removeTokenUserId(userData.id)
      .pipe(map(() => userData));
  }
}
