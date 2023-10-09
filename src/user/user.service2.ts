import { Injectable, Req, Res, Session } from '@nestjs/common';

@Injectable()
export class UserService2 {
  getHello() {
    return `hello 共享模块`;
  }
}
