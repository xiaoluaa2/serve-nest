// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { jwtKey } from './config';
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: jwtKey.secret,
//     });
//   }
//   // Passport会自动verify jwt，如果key不正确，或是相关信息

//   async validate(payload) {
//     console.log('payload');
//     console.log(payload);

//     //payload与加密前的json对象一样
//     //因为已经验证过token了所以在payload中进行验证用户信息是否为空
//     if (!payload.username || !payload.password) {
//       return false;
//     }
//     const user = { username: payload.username, password: payload.password };
//     //返回后可在req中得到返回的值
//     return user;
//   }
// }
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtKey } from './config';
// import * as crypto from 'crypto-js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtKey.secret,
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: any) {
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    const info = payload.info;

    // const userInfo = crypto.AES.decrypt(info, 'salt').toString(crypto.enc.Utf8);

    // console.log(JSON.parse(userInfo));
    return {
      info,
    };
  }
}
