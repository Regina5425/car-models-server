import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { UserRole } from 'generated/prisma';
import {
  ToggleFavoritesResponseDto,
  UpdateUserDto,
  UserResponseDto,
  UserWithFavoritesResponseDto,
} from './dto/user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Получение списка всех пользователей',
    description:
      'Возвращает список всех пользователей в виде массива. Только с правами админа',
  })
  @ApiOkResponse({ type: [UserResponseDto] })
  @ApiForbiddenResponse({
    description: 'Доступ запрещен (требуются права ADMIN)',
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  @Auth(UserRole.ADMIN)
  async getAllProfiles() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: 'Получение профиля пользователя',
    description: 'Возвращает данные пользователя',
  })
  @ApiOkResponse({ type: UserWithFavoritesResponseDto })
  @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.findById(id);
  }

  @ApiOperation({
    summary: 'Обновление данных пользователя',
    description: 'Возвращает обновленные данные пользователя',
  })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @HttpCode(HttpStatus.OK)
  @Put('update')
  @Auth()
  async updateProfile(
    @CurrentUser('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Избранное',
    description: 'Добавление в избранное или удаление из избранного',
  })
  @ApiParam({ name: 'carId', type: 'string', description: 'ID модели' })
  @ApiOkResponse({
    type: ToggleFavoritesResponseDto,
    description: 'Успешное добавление/удаление из избранного',
  })
  @ApiNotFoundResponse({
    description: 'Пользователь или модель не найдены',
  })
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Patch('profile/favorites/:carId')
  async toggleFavorites(
    @CurrentUser('id') id: string,
    @Param('carId') carId: string,
  ) {
    return this.userService.toggleFavorites(id, carId);
  }

  @ApiOperation({
    summary: 'Получение данных пользователя по ID',
    description: 'Возвращает данные пользователя. Только с правами админа',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'ID пользователя' })
  @ApiOkResponse({ type: UserWithFavoritesResponseDto })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @ApiForbiddenResponse({
    description: 'Доступ запрещен (требуются права ADMIN)',
  })
  @HttpCode(HttpStatus.OK)
  @Auth(UserRole.ADMIN)
  @Get('by-id/:id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @ApiOperation({
    summary: 'Получение данных пользователя по email',
    description: 'Возвращает данные пользователя. Только с правами админа',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'test@gmail.com' },
      },
    },
  })
  @ApiOkResponse({ type: UserWithFavoritesResponseDto })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @ApiForbiddenResponse({
    description: 'Доступ запрещен (требуются права ADMIN)',
  })
  @HttpCode(HttpStatus.OK)
  @Auth(UserRole.ADMIN)
  @Post('by-email')
  async findByEmail(@Body() body: { email: string }) {
    return this.userService.findByEmail(body.email);
  }
}
