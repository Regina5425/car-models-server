import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from '../interfaces/jwt.interface';

@Injectable()
export class FingerprintGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  public canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    const currentFingerprint = request.headers['x-device-fingerprint'];

    if (!token || !currentFingerprint) {
      throw new ForbiddenException(
        'Доступ отказан: не задан токен или fingerprint',
      );
    }

    try {
      const payload: JwtPayload = this.jwtService.verify(token);
      const isFingerprintValid = payload.fingerprint === currentFingerprint;

      if (!isFingerprintValid) {
        throw new ForbiddenException(
          'Доступ отказан: невалидный fingerprint устройства',
        );
      }

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new ForbiddenException('Доступ отказан: невалидный токен');
    }
  }
}
