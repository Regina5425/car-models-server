import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from '../interfaces/jwt.interface';

@Injectable()
export class FingerprintGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  public canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return false;

    const currentFingerprint = request.headers['x-device-fingerprint'];
    if (!currentFingerprint) return false;

    try {
      const payload: JwtPayload = this.jwtService.verify(token);

      if (payload.fingerprint !== currentFingerprint) {
        throw new Error('Невалидный fingerprint устройства');
      }

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return false;
    }
  }
}
