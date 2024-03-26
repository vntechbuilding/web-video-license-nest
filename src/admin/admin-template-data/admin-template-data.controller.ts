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
import { TemplateIdDto } from '../../middleware/dto/template-id.dto';
import { AdminTemplateDataService } from './admin-template-data.service';
import { AdminTemplateDataCreateDto } from './dto/admin-template-data.create.dto';
import { AdminTemplateDataUpdateDto } from './dto/admin-template-data.update.dto';
import { TemplateDataIdDto } from '../../middleware/dto/template-data-id.dto';

@Controller('api/admin/template-data')
@UseGuards(AdminV2Guard)
export class AdminTemplateDataController {
  constructor(private adminTemplateService: AdminTemplateDataService) {}

  @Get(':templateId')
  getAllTemplateData(@Param() templateId: TemplateIdDto) {
    return this.adminTemplateService.getAllTemplateData(templateId.templateId);
  }

  @Post()
  createTemplateData(@Body() createData: AdminTemplateDataCreateDto) {
    return this.adminTemplateService.createTemplateData(createData);
  }

  @Put()
  updateTemplateDate(@Body() updateData: AdminTemplateDataUpdateDto) {
    return this.adminTemplateService.updateTemplateData(updateData);
  }

  @Delete(':templateDataId')
  deleteTemplateData(@Param() templateDataId: TemplateDataIdDto) {
    return this.adminTemplateService.deleteTemplateData(
      templateDataId.templateDataId,
    );
  }
}
