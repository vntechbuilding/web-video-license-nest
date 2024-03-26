import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
import { UserIdDto } from '../../middleware/dto/user-id.dto';
import { AdminDomainFaviconDto } from './dto/admin-domain-favicon.dto';

@Controller('api/admin/domain')
@UseGuards(AdminV2Guard)
export class AdminDomainController {
  constructor(private adminDomainService: AdminDomainService) {}

  @Get()
  getAllDomain(@Query() pageData: PageDto) {
    return this.adminDomainService.getDomain(pageData);
  }

  @Get('user/:userId')
  getAllUserDomain(@Param() userId: UserIdDto) {
    return this.adminDomainService.getUserDomain(userId.userId);
  }

  @Post()
  createDomain(@Body() createData: AdminDomainCreateDto) {
    return this.adminDomainService.createDomain(createData);
  }

  @Patch('favicon')
  updateDomainFavicon(@Body() updateData: AdminDomainFaviconDto) {
    return this.adminDomainService.updateDomainFavicon(updateData);
  }

  @Put()
  updateDomain(@Body() updateData: AdminDomainUpdateDto) {
    return this.adminDomainService.updateDomain(updateData);
  }
}
