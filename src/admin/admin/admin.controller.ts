import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { PageDto } from '../../middleware/dto/page.dto';
import { AdminCreateDto } from './dto/admin.create.dto';
import { AdminUpdateDto } from './dto/admin.update.dto';
import { AdminChangePasswordDto } from './dto/admin.change-password.dto';
import { AdminV2Guard } from '../../middleware/guard/admin-v2/admin-v2.guard';

@Controller('api/admin/admin')
@UseGuards(AdminV2Guard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  getAllAdmin(@Query() query: PageDto) {
    return this.adminService.getAllAdmin(query.perPage, query.page);
  }

  @Get(':id')
  getAdminById(@Param('id') id: string) {
    return this.adminService.getAdminById(id);
  }

  @Post()
  createAdmin(@Body() createData: AdminCreateDto) {
    return this.adminService.createAdmin(createData);
  }

  @Put('change-password')
  changePassword(@Body() changeData: AdminChangePasswordDto) {
    return this.adminService.updateAdminPassword(changeData);
  }

  @Put()
  updateAdmin(@Body() updateData: AdminUpdateDto) {
    return this.adminService.updateAdmin(updateData);
  }

  // @Delete(':id')
  // deleteAdmin(@Param('id') id: string) {
  //   return this.adminService.deleteAdmin(id);
  // }
}
