import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import * as session from 'express-session';
import { AppModule } from './app.module';
// 类型提示
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';
import { join } from 'path';

import { ResponseInterceptor } from './common/response';

import { HttpFilter } from './common/fulter';
// 守卫
const whiteList = ['/user'];
function MiddlewareAll(req: Request, res: Response, next: NextFunction) {
  if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    console.log('小盒子露出鸡脚了吧,全局中间件');
    next();
  }
}
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors());
  // app.setGlobalPrefix('api'); // 设置全局路由前缀
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // 静态目录
  app.useStaticAssets(join(__dirname, 'images'), {
    // 自定义路径
    prefix: '/img',
  });
  app.use(MiddlewareAll);
  app.use(
    session({
      secret: 'xiaolu',
      rolling: true,
      name: 'xiaolu.sid',
      cookie: { httpOnly: true },
    }),
  );
  // 拦截器 全局响应
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 异常拦截器
  app.useGlobalFilters(new HttpFilter());
  // 类型校验 官方的不用手写了
  app.useGlobalPipes(new ValidationPipe());
  // 全局守卫  2
  // app.useGlobalGuards(new RoleGuard());

  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/xiaolu',
  });
  await app.listen(5200);
}
bootstrap();
