import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { zip } from 'compressing';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(564665);
    console.log(file);
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
