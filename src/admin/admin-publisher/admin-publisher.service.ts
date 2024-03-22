import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { PageMaxDto } from '../../middleware/dto/page-max.dto';
import { omit } from 'lodash';
import { AdminPublisherCreateDto } from './dto/admin-publisher.create.dto';
import { AdminPublisherUpdateDto } from './dto/admin-publisher.update.dto';

@Injectable()
export class AdminPublisherService {
  constructor(private prisma: PrismaService) {}

  getAllPublisher(pageData: PageMaxDto) {
    return this.prisma.findManyAndCount('publisher', {
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

  getAllUserPublisher(userId: string, pageData: PageMaxDto) {
    return this.prisma.findManyAndCount(
      'publisher',
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

  createPublisher(createData: AdminPublisherCreateDto) {
    return this.prisma.publisher.create({
      data: createData,
    });
  }

  updatePublisher(updateData: AdminPublisherUpdateDto) {
    return this.prisma.publisher.update({
      where: {
        id: updateData.publisherId,
      },
      data: {
        ...omit(updateData, 'publisherId'),
      },
    });
  }

  deletePublisher(publisherId: string) {
    return this.prisma.publisher.delete({
      where: {
        id: publisherId,
      },
    });
  }
}
