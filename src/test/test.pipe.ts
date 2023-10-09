import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// npm i class-validator class-transformer  安装这两个库 做校验.
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
@Injectable()
export class TestPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype, value);
    const err = await validate(DTO);

    if (err.length) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
