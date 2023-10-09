import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  rs;
  public async getToken(payload) {
    return await this.jwtService.sign(payload);
  }
}
