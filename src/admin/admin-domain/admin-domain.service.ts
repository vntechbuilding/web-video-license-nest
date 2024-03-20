import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../middleware/prisma/prisma.service';
import { AdminDomainCreateDto } from './dto/admin-domain.create.dto';
import { AdminDomainUpdateDto } from './dto/admin-domain.update.dto';
import { PageDto } from '../../middleware/dto/page.dto';

@Injectable()
export class AdminDomainService {
  constructor(private prisma: PrismaService) {}

  getDomain(pageQuery: PageDto) {
    return this.prisma.findManyAndCount('domain', {
      skip: pageQuery.perPage * pageQuery.page,
      take: pageQuery.perPage,
      include: {
        user: true,
      },
    });
    // return this.prisma.domain.findMany({
    //   take: pageQuery.perPage,
    //   skip: pageQuery.perPage * pageQuery.page,
    //   include: {
    //     user: true,
    //   },
    // });
  }

  createDomain(createData: AdminDomainCreateDto) {
    return this.prisma.domain.create({
      data: createData,
    });
  }

  updateDomain(updateData: AdminDomainUpdateDto) {
    return this.prisma.domain.update({
      where: {
        id: updateData.id,
      },
      data: updateData,
    });
  }
}
