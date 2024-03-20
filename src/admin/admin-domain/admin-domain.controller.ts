import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminV2Guard } from '../../middleware/guard/admin-v2/admin-v2.guard';
import { AdminDomainService } from './admin-domain.service';
import { PageDto } from '../../middleware/dto/page.dto';
import { AdminDomainCreateDto } from './dto/admin-domain.create.dto';
import { AdminDomainUpdateDto } from './dto/admin-domain.update.dto';

@Controller('api/admin/domain')
@UseGuards(AdminV2Guard)
export class AdminDomainController {
  constructor(private adminDomainService: AdminDomainService) {}

  @Get()
  getAllDomain(@Query() pageData: PageDto) {
    return this.adminDomainService.getDomain(pageData);
  }

  @Post()
  createDomain(@Body() createData: AdminDomainCreateDto) {
    return this.adminDomainService.createDomain(createData);
  }

  @Put()
  updateDomain(@Body() updateData: AdminDomainUpdateDto) {
    return this.adminDomainService.updateDomain(updateData);
  }
}