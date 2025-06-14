import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserRole } from 'generated/prisma';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

export const Auth = (...roles: UserRole[]) => {
  if (roles.length > 0) {
    return applyDecorators(
      Roles(...roles),
      UseGuards(JwtAuthGuard, RolesGuard),
    );
  }

  return applyDecorators(UseGuards(JwtAuthGuard));
};
