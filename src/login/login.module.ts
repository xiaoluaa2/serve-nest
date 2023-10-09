import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtKey } from './config';

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
        expiresIn: '24h',
      },
    }),
    UserTable,
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
})
export class LoginModule {}
