import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtKey } from './config';
import { JwtStrategy } from './jwt.strategy';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

import { MongooseModule } from '@nestjs/mongoose';
// 引入用户数据表的格式
import { userSchema } from './user.schema';

const UserTable = MongooseModule.forFeature([
  { name: 'Users', schema: userSchema },
]);

@Module({
  imports: [
    JwtModule.register({
      //生成token的key
      secret: jwtKey.secret,
      // signOption可以在JwtModule设定
      // 或是在createToken时候设定
      signOptions: {
        //token的有效时长
        expiresIn: '60s',
      },
    }),
    UserTable,
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
})
export class LoginModule {}
