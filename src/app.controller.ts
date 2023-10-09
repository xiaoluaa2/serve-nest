import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
// 全局or非全局 需要导入
import { UserService2 } from './user/user.service2';
// Controller就一个作用，分割路由，调用处理方法，返回http请求结果。
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly UserService2: UserService2,
  ) {}

  @Get()
  getHello(): string {
    return this.UserService2.getHello();
  }
}
