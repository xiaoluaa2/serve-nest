import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// 为了在 user.service 中操作数据库
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// 引入数据类型
import { User } from './user.interface';

@Injectable()
export class LoginService {
  constructor(
    // 注入UsersService，所以需要import UsersModule
    // 底下的provider才能被注入
    private readonly jwtService: JwtService,
    @InjectModel('Users') private readonly userModel: Model<User>,
  ) {}
  // 登陆成功
  async createToken(user) {
    console.log('888888888888888888888888');

    const payload = { username: user.username };
    //在实际项目中一般要进行数据库验证查看用户用户名密码是否正确
    const data = await this.userModel.findOne({
      user_name: user.username,
      password: user.password,
    });
    if (!data) {
      return { error: '登陆失败' };
    }
    return {
      success: {
        user: user,
        token: this.jwtService.sign(payload),
      },
    };
  }

  // 查找所有用户
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }
}
