import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { FingerprintGuard } from 'src/common/guards/fingerprint.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Fingerprint } from 'src/common/decorators/fingerprint.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() dto: SignUpDto, @Fingerprint() fingerprint: string) {
    return this.authService.signUp(dto, fingerprint);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: SignInDto, @Fingerprint() fingerprint: string) {
    return this.authService.signIn(dto, fingerprint);
  }

  @Delete('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth()
  @UseGuards(FingerprintGuard)
  async logout(
    @CurrentUser('id') userId: string,
    @Fingerprint() fingerprint: string,
  ) {
    return this.authService.logout(userId, fingerprint);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @UseGuards(FingerprintGuard)
  async getToken(
    @Body() dto: RefreshTokenDto,
    @Fingerprint() fingerprint: string,
  ) {
    return this.authService.refreshToken(dto.refreshToken, fingerprint);
  }
}
