import {
  CallHandler,
  NestInterceptor,
  Injectable,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
interface Data<T> {
  data: T;
}
@Injectable()
// 响应拦截器
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Data<T>> | Promise<Observable<Data<T>>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data: data,
          status: 0,
          success: true,
        };
      }),
    );
  }
}
