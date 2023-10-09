import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtKey } from './config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtKey.secret,
    });
  }
  // Passport会自动verify jwt，如果key不正确，或是相关信息

  async validate(payload) {
    console.log('payload');
    console.log(payload);

    //payload与加密前的json对象一样
    //因为已经验证过token了所以在payload中进行验证用户信息是否为空

    if (!payload.username) {
      return false;
    }
    const user = { username: payload.username };
    console.log(user);
    //返回后可在req中得到返回的值
    return user;
  }
}
