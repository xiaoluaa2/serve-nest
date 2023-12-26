import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
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
        if (data['success']) {
          return {
            data: data.success,
            status: 0,
            success: true,
          };
        } else {
          return {
            data: data.error,
            status: 1,
            success: false,
          };
        }
      }),
    );
  }
}
