import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { UserRole } from 'generated/prisma';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('all')
  @Auth(UserRole.ADMIN)
  async getAllProfiles() {
    return this.userService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Auth()
  @Patch('profile/favorites/:carId')
  async toggleFavorites(
    @CurrentUser('id') id: string,
    @Param('carId') carId: string,
  ) {
    return this.userService.toggleFavorites(id, carId);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(UserRole.ADMIN)
  @Get('by-id/:id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Auth(UserRole.ADMIN)
  @Post('by-email')
  async findByEmail(@Body() body: { email: string }) {
    return this.userService.findByEmail(body.email);
  }
}
