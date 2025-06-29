import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function ApiFingerprintHeader() {
  return applyDecorators(
    ApiHeader({
      name: 'x-device-fingerprint',
      description: 'Уникальный идентификатор устройства (fingerprint)',
      required: true,
      example: 'device-unique-id-123',
    }),
  );
}
