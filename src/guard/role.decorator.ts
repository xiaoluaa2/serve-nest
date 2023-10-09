import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
  applyDecorators,
} from '@nestjs/common';
import type { Request } from 'express';
export const Role = (...args: string[]) => SetMetadata('role', args);
export const ReqUrl = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    console.log(data, '====>');
    return req.url;
    // return applyDecorators(Role, xxx); 把多种装饰器组合
  },
);
