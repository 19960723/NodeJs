import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Result } from '../dto/result.dto';

/**
 * 全局响应拦截器
 * 统一处理接口返回格式
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Result<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Result<T>> {
    return next.handle().pipe(
      map((data) => {
        // 如果已经是 Result 格式，直接返回
        if (data instanceof Result) {
          return data;
        }

        // 否则包装成 Result 格式
        return Result.success(data);
      }),
    );
  }
}
