import { Controller, Post, Get, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'; // Corrected import
import { FileUploadService } from './file-upload.service';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = await this.fileUploadService.uploadFile(file);
    return response;
  }
}
