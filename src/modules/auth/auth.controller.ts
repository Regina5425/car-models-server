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
import { AuthResponseDto, SignUpDto } from './dto/auth.dto';
import { SignInDto } from './dto/auth.dto';
import {
  RefreshTokenDto,
  RefreshTokenResponseDto,
} from './dto/refresh-token.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { FingerprintGuard } from 'src/common/guards/fingerprint.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Fingerprint } from 'src/common/decorators/fingerprint.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiFingerprintHeader } from 'src/common/decorators/api-fingerprint-header.decorator';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Регистрация',
    description: 'Регистрация нового пользователя',
  })
  @ApiFingerprintHeader()
  @ApiOkResponse({ type: AuthResponseDto })
  @ApiBadRequestResponse({
    description:
      'Регистрация не удалась. Пользователь с таким email уже существует. Пожалуйста, используйте другой email или войдите в систему',
  })
  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() dto: SignUpDto, @Fingerprint() fingerprint: string) {
    return this.authService.signUp(dto, fingerprint);
  }

  @ApiOperation({
    summary: 'Авторизация',
    description: 'Авторизация пользователя',
  })
  @ApiFingerprintHeader()
  @ApiOkResponse({ type: AuthResponseDto })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @ApiUnauthorizedResponse({ description: 'Некорректный email или пароль' })
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: SignInDto, @Fingerprint() fingerprint: string) {
    return this.authService.signIn(dto, fingerprint);
  }

  @ApiOperation({
    summary: 'Выход из профиля',
    description: 'Выход из профиля',
  })
  @ApiFingerprintHeader()
  @ApiOkResponse({ type: Boolean })
  @Delete('logout')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @UseGuards(FingerprintGuard)
  async logout(
    @CurrentUser('id') userId: string,
    @Fingerprint() fingerprint: string,
  ) {
    return this.authService.logout(userId, fingerprint);
  }

  @ApiOperation({
    summary: 'Обновление токена',
    description: 'Получение нового access token',
  })
  @ApiFingerprintHeader()
  @ApiOkResponse({ type: RefreshTokenResponseDto })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @ApiUnauthorizedResponse({
    description:
      'Неверный refresh token / Неверно указано устройство / Токен отозван',
  })
  @ApiForbiddenResponse({
    description: 'Доступ отказан: невалидный токен',
  })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
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
