import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { admin, Prisma } from '@prisma/client';
import { AdminCreateDto } from './dto/admin.create.dto';
import { hash } from 'argon2';
import { from, map, of, switchMap } from 'rxjs';
import { AdminUpdateDto } from './dto/admin.update.dto';
import { AdminChangePasswordDto } from './dto/admin.change-password.dto';
import { AdminAuthService } from '../admin-auth/admin-auth.service';
export const adminSelect: Prisma.adminSelect = {
  id: true,
  username: true,
  disabled: true,
  createdAt: true,
};
@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private adminAuthService: AdminAuthService,
  ) {}

  getAllAdmin(perPage = 10, page = 0) {
    return this.prisma.$transaction([
      this.prisma.admin.findMany({
        take: perPage,
        skip: page * perPage,
        select: adminSelect,
      }),

      this.prisma.admin.count(),
    ]);
  }

  getAdminById(id: string) {
    return this.prisma.admin.findUnique({
      where: {
        id: id,
      },
      select: adminSelect,
    });
  }

  createAdmin(create: AdminCreateDto) {
    return from(hash(create.password)).pipe(
      switchMap((hashPassword) => {
        return this.prisma.admin.create({
          data: {
            username: create.username,
            hash: hashPassword,
            disabled: create.disabled,
          },
          select: adminSelect,
        });
      }),
    );
  }

  checkDisabled(adminData: Partial<admin>) {
    if (adminData.disabled) {
      return this.adminAuthService
        .removeTokenAdminId(adminData.id)
        .pipe(map(() => adminData));
    }
    return of(adminData);
  }

  removeToken(adminData: Partial<admin>) {
    return this.adminAuthService
      .removeTokenAdminId(adminData.id)
      .pipe(map(() => adminData));
  }

  updateAdmin(update: AdminUpdateDto) {
    return from(
      this.prisma.admin.update({
        where: {
          id: update.id,
        },
        data: {
          disabled: update.disabled,
        },
        select: adminSelect,
      }),
    ).pipe(switchMap((adminData) => this.checkDisabled(adminData)));
  }

  deleteAdmin(adminId: string) {
    return from(this.prisma.admin.count())
      .pipe(
        switchMap((count) => {
          if (count > 1)
            return this.prisma.admin.delete({
              where: {
                id: adminId,
              },
              select: adminSelect,
            });
          else return of(false);
        }),
      )
      .pipe(
        switchMap((adminData) => {
          if (adminData === true || adminData === false) return of(adminData);
          return this.removeToken(adminData);
        }),
      );
  }

  updateAdminPassword(passwordData: AdminChangePasswordDto) {
    return from(hash(passwordData.password))
      .pipe(
        switchMap((hashPassword) => {
          return this.prisma.admin.update({
            where: {
              id: passwordData.id,
            },
            data: {
              hash: hashPassword,
            },
            select: adminSelect,
          });
        }),
      )
      .pipe(switchMap((adminData) => this.removeToken(adminData)));
  }
}
