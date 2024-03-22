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
import { AdminPublisherService } from './admin-publisher.service';
import { PageMaxDto } from '../../middleware/dto/page-max.dto';
import { UserIdDto } from '../../middleware/dto/user-id.dto';
import { AdminPublisherCreateDto } from './dto/admin-publisher.create.dto';
import { AdminPublisherUpdateDto } from './dto/admin-publisher.update.dto';
import { PublisherIdDto } from '../../middleware/dto/publisher-id.dto';

@Controller('api/admin/publisher')
@UseGuards(AdminV2Guard)
export class AdminPublisherController {
  constructor(private publisherService: AdminPublisherService) {}
  @Get()
  getAllPublisher(@Query() pageData: PageMaxDto) {
    return this.publisherService.getAllPublisher(pageData);
  }

  @Get('user/:userId')
  getAllUserPublisher(
    @Query() pageData: PageMaxDto,
    @Param() userId: UserIdDto,
  ) {
    return this.publisherService.getAllUserPublisher(userId.userId, pageData);
  }

  @Post()
  createPublisher(@Body() createData: AdminPublisherCreateDto) {
    return this.publisherService.createPublisher(createData);
  }

  @Put()
  updatePublisher(@Body() updateData: AdminPublisherUpdateDto) {
    return this.publisherService.updatePublisher(updateData);
  }

  @Delete(':publisherId')
  deletePublisher(@Param() publisherId: PublisherIdDto) {
    return this.publisherService.deletePublisher(publisherId.publisherId);
  }
}
