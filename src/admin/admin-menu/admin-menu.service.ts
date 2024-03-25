import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { from, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { BuildMenuTree } from '../../utils/build-menu-tree';
import { AdminMenuCreateDto } from './dto/admin-menu.create.dto';
import { AdminMenuUpdateDto } from './dto/admin-menu.update.dto';
import { omit } from 'lodash';
@Injectable()
export class AdminMenuService {
  constructor(private prisma: PrismaService) {}

  getAllMenu() {
    return from(
      this.prisma.menu.findMany({
        include: {
          domain: true,
        },
        orderBy: {
          sortOrder: 'asc',
        },
      }),
    ).pipe(map((listMenu) => BuildMenuTree(listMenu)));
  }

  getAllUserMenu(userId: string) {
    return from(
      this.prisma.menu.findMany({
        where: {
          domain: {
            userId: userId,
          },
        },
        orderBy: {
          sortOrder: 'asc',
        },
        include: {
          domain: true,
        },
      }),
    ).pipe(map((listMenu) => BuildMenuTree(listMenu)));
  }

  getAllDomainMenu(domainId: string) {
    return from(
      this.prisma.menu.findMany({
        where: {
          domainId,
        },
        orderBy: {
          sortOrder: 'asc',
        },
        include: {
          domain: true,
        },
      }),
    ).pipe(map((listMenu) => BuildMenuTree(listMenu)));
  }

  createMenu(createData: AdminMenuCreateDto) {
    return this.prisma.menu.create({
      data: createData,
    });
  }

  updateMenu(updateData: AdminMenuUpdateDto) {
    return this.prisma.menu.update({
      where: {
        id: updateData.menuId,
      },
      data: omit(updateData, 'menuId'),
    });
  }
  deleteMenu(menuId: string) {
    return from(
      this.prisma.menu.updateMany({
        where: {
          parentId: menuId,
        },
        data: {
          parentId: null,
        },
      }),
    ).pipe(
      switchMap(() =>
        this.prisma.menu.delete({
          where: {
            id: menuId,
          },
        }),
      ),
    );
  }
}
