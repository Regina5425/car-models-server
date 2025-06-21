import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export const Fingerprint = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request: Request = ctx.switchToHttp().getRequest();
    const fingerprint = request.headers['x-device-fingerprint'] as string;

    if (!fingerprint) {
      throw new UnauthorizedException('Требуется fingerprint устройства');
    }

    return fingerprint;
  },
);
