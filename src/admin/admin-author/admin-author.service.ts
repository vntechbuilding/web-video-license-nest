import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { PageMaxDto } from '../../middleware/dto/page-max.dto';
import { AdminAuthorCreateDto } from './dto/admin-author.create.dto';
import { AdminAuthorUpdateDto } from './dto/admin-author.update.dto';
import { omit } from 'lodash';

@Injectable()
export class AdminAuthorService {
  constructor(private prisma: PrismaService) {}

  getAllAuthor(pageData: PageMaxDto) {
    return this.prisma.findManyAndCount('author', {
      take: pageData.perPage,
      skip: pageData.page * pageData.perPage,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });
  }

  getAllUserAuthor(userId: string, pageData: PageMaxDto) {
    return this.prisma.findManyAndCount(
      'author',
      {
        take: pageData.perPage,
        skip: pageData.page * pageData.perPage,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
        },
      },
      {
        userId: userId,
      },
    );
  }

  createAuthor(createData: AdminAuthorCreateDto) {
    return this.prisma.author.create({
      data: createData,
    });
  }

  updateAuthor(updateData: AdminAuthorUpdateDto) {
    return this.prisma.author.update({
      where: {
        id: updateData.authorId,
      },
      data: {
        ...omit(updateData, 'authorId'),
      },
    });
  }

  deleteAuthor(authorId: string) {
    return this.prisma.author.delete({
      where: {
        id: authorId,
      },
    });
  }
}
