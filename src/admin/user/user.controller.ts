import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../../middleware/guard/admin.guard';
import { UserService } from './user.service';
import { PageDto } from '../../middleware/dto/page.dto';

import { UserCreateDto } from './dto/user.create.dto';
import { UserChangePasswordDto } from './dto/user.change-password.dto';
import { UserUpdateDisabledDto } from './dto/user.update-disabled.dto';
import { UserUpdateDto } from './dto/user.update.dto';

@Controller('api/admin/user')
@UseGuards(AdminGuard)
export class UserController {
  constructor(private user: UserService) {}

  @Get()
  getAllUser(@Query() query: PageDto) {
    return this.user.getAllUser(query.perPage, query.page);
  }

  @Post()
  createUser(@Body() createData: UserCreateDto) {
    return this.user.createUser(createData);
  }
  @Put('change-password')
  changePassword(@Body() data: UserChangePasswordDto) {
    return this.user.changePassword(data);
  }

  @Put('disabled')
  updateDisabled(@Body() data: UserUpdateDisabledDto) {
    return this.user.updateDisabled(data);
  }

  @Put()
  updateUser(@Body() data: UserUpdateDto) {
    return this.user.updateUser(data);
  }
  // @Delete(':id')
  // deleteUser(@Param('id') id: string) {
  //   return this.user.deleteUser(id);
  // }
}
