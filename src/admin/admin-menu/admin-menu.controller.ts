import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminV2Guard } from '../../middleware/guard/admin-v2/admin-v2.guard';
import { AdminMenuService } from './admin-menu.service';
import { UserIdDto } from '../../middleware/dto/user-id.dto';
import { DomainIdDto } from '../../middleware/dto/domain-id.dto';
import { AdminMenuCreateDto } from './dto/admin-menu.create.dto';
import { AdminMenuUpdateDto } from './dto/admin-menu.update.dto';
import { MenuIdDto } from '../../middleware/dto/menu-id.dto';

@Controller('api/admin/menu')
@UseGuards(AdminV2Guard)
export class AdminMenuController {
  constructor(private menuService: AdminMenuService) {}

  @Get()
  getAllMenu() {
    return this.menuService.getAllMenu();
  }

  @Get('user/:userId')
  getAllUserMenu(@Param() userData: UserIdDto) {
    return this.menuService.getAllUserMenu(userData.userId);
  }

  @Get('domain/:domainId')
  getAllDomainMenu(@Param() domainData: DomainIdDto) {
    return this.menuService.getAllDomainMenu(domainData.domainId);
  }

  @Post()
  createMenu(@Body() createData: AdminMenuCreateDto) {
    return this.menuService.createMenu(createData);
  }

  @Put() updateMenu(@Body() updateData: AdminMenuUpdateDto) {
    return this.menuService.updateMenu(updateData);
  }
  @Delete(':menuId') deleteMenu(@Param() idData: MenuIdDto) {
    return this.menuService.deleteMenu(idData.menuId);
  }
}
