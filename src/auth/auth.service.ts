import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';
import { User } from 'generated/prisma';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private userService: UserService,
  ) {}

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isValidPassword = await verify(user.password, dto.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Некорректный пароль');
    }

    return user;
  }

  private returnUserFileds(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
    };
  }

  private issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h', //TODO: сменить на 15 мин
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async getTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync<{ id: string }>(refreshToken);

    if (!result) {
      throw new UnauthorizedException('Неверный refresh token');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: result.id,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const tokens = this.issueTokens(user.id);

    return {
      user: this.returnUserFileds(user),
      ...tokens,
    };
  }

  async signUp(dto: SignUpDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existUser) {
      throw new BadRequestException(
        'Регистрация не удалась. Пользователь с таким email уже существует. Пожалуйста, используйте другой email или войдите в систему',
      );
    }

    const newUser = await this.userService.create(dto);

    const tokens = this.issueTokens(newUser.id);

    return {
      user: this.returnUserFileds(newUser),
      ...tokens,
    };
  }

  async signIn(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const tokens = this.issueTokens(user.id);

    return {
      user: this.returnUserFileds(user),
      ...tokens,
    };
  }
}
