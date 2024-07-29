import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('id') id: string,
    @Body('parameter1') parameter1: string,
    @Body('parameter2') parameter2: string,
  ) {
    return await this.fileUploadService.uploadFile(file, id, parameter1, parameter2);
  }
}
