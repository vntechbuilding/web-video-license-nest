import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminV2Guard } from '../../middleware/guard/admin-v2/admin-v2.guard';
import { AdminAuthorService } from './admin-author.service';
import { PageMaxDto } from '../../middleware/dto/page-max.dto';
import { UserIdDto } from '../../middleware/dto/user-id.dto';
import { AdminAuthorCreateDto } from './dto/admin-author.create.dto';
import { AdminAuthorUpdateDto } from './dto/admin-author.update.dto';
import { AuthorIdDto } from '../../middleware/dto/author-id.dto';

@Controller('api/admin/author')
@UseGuards(AdminV2Guard)
export class AdminAuthorController {
  constructor(private authorService: AdminAuthorService) {}

  @Get()
  getAllAuthor(@Query() pageData: PageMaxDto) {
    return this.authorService.getAllAuthor(pageData);
  }

  @Get('user/:userId')
  getAllUserAuthor(@Query() pageData: PageMaxDto, @Param() userId: UserIdDto) {
    return this.authorService.getAllUserAuthor(userId.userId, pageData);
  }

  @Post()
  createAuthor(@Body() createData: AdminAuthorCreateDto) {
    return this.authorService.createAuthor(createData);
  }

  @Put()
  updateAuthor(@Body() updateData: AdminAuthorUpdateDto) {
    return this.authorService.updateAuthor(updateData);
  }

  @Delete(':authorId')
  deleteAuthor(@Param() authorId: AuthorIdDto) {
    return this.authorService.deleteAuthor(authorId.authorId);
  }
}
