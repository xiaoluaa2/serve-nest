import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthGuard } from '@nestjs/passport';

import { User } from './user.interface';
interface UserResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

@Controller('login')
export class LoginController {
  JwtDemoService: any;
  constructor(private readonly loginService: LoginService) {}
  // jwt验证
  // @UseGuards(AuthGuard('auth'))
  @UseGuards(AuthGuard('jwt'))
  @Post('tokenIn')
  aPost(@Body() req) {
    console.log('req');
    console.log(req);
    return 55;
  }

  @Post('getToken')
  getTokenByUserId(@Body() user: any) {
    return this.loginService.createToken(user);
  }

  @Get('users')
  async findAll(): Promise<UserResponse<User[]>> {
    return {
      code: 200,
      data: await this.loginService.findAll(),
      message: 'Success',
    };
  }

  // @Post()
  // create(@Body() createLoginDto: CreateLoginDto) {
  //   return this.loginService.create(createLoginDto);
  // }

  // @Get()
  // findAll() {
  //   return this.loginService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.loginService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
  //   return this.loginService.update(+id, updateLoginDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.loginService.remove(+id);
  // }
}
