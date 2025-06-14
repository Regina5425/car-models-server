import { ResponseStatus } from '../enums/response-status.enum';

export interface IResponse<T> {
  status: ResponseStatus;
  data: T;
}
