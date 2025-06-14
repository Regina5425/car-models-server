import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { IResponse } from '../interfaces/response.interface';
import { map, Observable } from 'rxjs';
import { ResponseStatus } from '../enums/response-status.enum';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        status: ResponseStatus.OK,
        data,
      })),
    );
  }
}
