import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }
}
