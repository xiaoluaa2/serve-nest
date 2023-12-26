import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO, EditUserDTO } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';
interface UserResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

@Controller('user')
export class UserController {
  // 简写 默认命名 简写居多
  // constructor( private readonly userService: UserService) {}
  constructor(
    @Inject('ABC') private readonly userService: UserService,
    @Inject('zidingyizhi') private readonly ss: string[],
    @Inject('gongchang') private readonly gongchang: number,
    // 全局or非全局 全局模块不需要导入 在app.module导入
    @Inject('Config') private readonly base: any,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('xxx')
  xxx() {
    console.log('xxx');
    return 'xxx';
  }

  // GET /user/users
  @Get('users')
  async findAll(): Promise<UserResponse<User[]>> {
    return {
      code: 200,
      data: await this.userService.findAll(),
      message: 'Success.',
    };
  }

  // GET /user/:_id
  @Post('userMessage')
  async findOne(@Body() uname: any): Promise<UserResponse<User>> {
    console.log('xxxx');

    console.log(uname);
    return {
      code: 200,
      data: await this.userService.findOne(uname),
      message: 'Success',
    };
  }

  // POST /user
  @Post('addUser')
  async addOne(@Body() body: CreateUserDTO) {
    const res = await this.userService.addOne(body);
    console.log('***********');
    console.log(body);
    console.log(res);
    if (res == body.user_name) {
      return {
        code: 200,
        message: 'Success',
      };
    }
  }

  // PUT /user/:_id
  @Put(':_id')
  async editOne(
    @Param('_id') _id: string,
    @Body() body: EditUserDTO,
  ): Promise<UserResponse> {
    await this.userService.editOne(_id, body);
    return {
      code: 200,
      message: 'Success.',
    };
  }

  // DELETE /user/:_id
  @Delete(':_id')
  async deleteOne(@Param('_id') _id: string): Promise<UserResponse> {
    await this.userService.deleteOne(_id);
    return {
      code: 200,
      message: 'Success.',
    };
  }
}
