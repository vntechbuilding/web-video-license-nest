import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminV2Guard } from '../../middleware/guard/admin-v2/admin-v2.guard';
import { AdminTemplateService } from './admin-template.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { TemplateZipMulterOptions } from '../../utils/template-zip-file-filter';
import { UnzipTemplateInterceptor } from '../../middleware/interceptors/unzip-template.interceptor';
import { CleanupInterceptor } from '../../middleware/interceptors/cleanup-interceptor';
import { AdminTemplateCreateDto } from './dto/admin-template.create.dto';
import { AdminTemplateUpdateDto } from './dto/admin-template.update.dto';
import { TemplateIdDto } from '../../middleware/dto/template-id.dto';
import { PageMaxDto } from '../../middleware/dto/page-max.dto';
import { RemoveNullObject } from '../../utils/remove-null-object';

@Controller('api/admin/template')
@UseGuards(AdminV2Guard)
export class AdminTemplateController {
  constructor(private templateService: AdminTemplateService) {}

  @Get()
  getAllTemplate(@Query() pageDto: PageMaxDto) {
    return this.templateService.getAllTemplate(pageDto);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', TemplateZipMulterOptions()),
    UnzipTemplateInterceptor,
    CleanupInterceptor,
  )
  createTemplate(
    @Body() createData: AdminTemplateCreateDto,
    @UploadedFile() file: string,
  ) {
    return this.templateService.createTemplate({
      ...createData,
      code: file,
    });
  }
  @Put('zip')
  @UseInterceptors(
    FileInterceptor('file', TemplateZipMulterOptions()),
    UnzipTemplateInterceptor,
    CleanupInterceptor,
  )
  updateZipFile(
    @Body() updateData: TemplateIdDto,
    @UploadedFile() file: string,
  ) {
    return this.templateService.updateZipTemplate(updateData.templateId, file);
  }

  @Put()
  updateTemplate(@Body() updateData: AdminTemplateUpdateDto) {
    return this.templateService.updateTemplate(
      RemoveNullObject(updateData) as any,
    );
  }

  @Delete(':templateId')
  deleteTemplate(@Param() templateId: TemplateIdDto) {
    return this.templateService.deleteTemplate(templateId.templateId);
  }
}
