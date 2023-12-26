import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { zip } from 'compressing';
import { Response } from 'express';
import { join } from 'path';
import { UploadService } from './upload.service';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    if (file) {
      return file.filename;
    }
  }

  @Get('export')
  downLoad(@Res() res: Response) {
    res.download(join(__dirname, '../images/1683273234601.jpeg'));
  }

  @Get('stream')
  async downLoadStream(@Res() res: Response) {
    const tarStream = new zip.Stream();
    await tarStream.addEntry(join(__dirname, '../images/1683273234601.jpeg'));
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment;filename=xiaolu');
    tarStream.pipe(res);
    // 需要前端解析流文件
  }
}
