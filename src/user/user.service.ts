import { Injectable } from '@nestjs/common';

import * as svgCaptcha from 'svg-captcha';
// 为了在 user.service 中操作数据库
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// 引入数据类型
import { CreateUserDTO, EditUserDTO } from './user.dto';
import { User } from './user.interface';
interface UserResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}
@Injectable()
export class UserService {
  // 构造函数，让 user.service 在实例化时，能够接收到数据库 Model，进而操作数据库
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  // 查找所有用户
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  // 查找单个用户
  // async findOne(_id: string): Promise<User> {
  //   return await this.userModel.findById(_id);
  // }
  async findOne(uname: any): Promise<any> {
    console.log(uname.name);
    console.log('===>');
    const res = await this.userModel.find({ user_name: uname.name });
    console.log(res);
    return res;
  }

  // 添加单个用户
  async addOne(body: CreateUserDTO) {
    // console.log(body);
    const res = await this.userModel.create(body);
    // console.log('res');
    // console.log(res.user_name);
    return res.user_name;
  }

  // 编辑单个用户
  async editOne(_id: string, body: EditUserDTO): Promise<void> {
    await this.userModel.findByIdAndUpdate(_id, body);
  }

  // 删除单个用户
  async deleteOne(_id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(_id);
  }

  createCode() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });
    return captcha;
  }
}
