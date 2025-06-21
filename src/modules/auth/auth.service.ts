import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { verify } from 'argon2';
import { User } from 'generated/prisma';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from 'src/modules/user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/common/interfaces/jwt.interface';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    );
  }

  async validateUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  private async validateUser(dto: SignInDto) {
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

  private async generateTokens(userId: string, fingerprint: string) {
    const payload: JwtPayload = { id: userId, fingerprint };

    const accessToken = this.jwt.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    const refreshToken = this.jwt.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    await this.prisma.refreshToken.upsert({
      where: {
        userId_fingerprint: {
          userId,
          fingerprint,
        },
      },
      update: {
        token: refreshToken,
      },
      create: {
        userId,
        token: refreshToken,
        fingerprint,
      },
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string, fingerprint: string) {
    const payload = await this.jwt.verifyAsync<JwtPayload>(refreshToken);

    if (!payload) {
      throw new UnauthorizedException('Неверный refresh token');
    }

    if (payload.fingerprint !== fingerprint) {
      throw new UnauthorizedException('Неверное устройство');
    }

    const storedToken = await this.prisma.refreshToken.findFirst({
      where: { userId: payload.id, fingerprint, token: refreshToken },
    });

    if (!storedToken) {
      throw new UnauthorizedException('Токен отозван');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const tokens = await this.generateTokens(user.id, fingerprint);

    return {
      user: this.returnUserFileds(user),
      ...tokens,
    };
  }

  async signUp(dto: SignUpDto, fingerprint: string) {
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
    const tokens = await this.generateTokens(newUser.id, fingerprint);

    return {
      user: this.returnUserFileds(newUser),
      ...tokens,
    };
  }

  async signIn(dto: SignInDto, fingerprint: string) {
    const user = await this.validateUser(dto);
    const tokens = await this.generateTokens(user.id, fingerprint);

    return {
      user: this.returnUserFileds(user),
      ...tokens,
    };
  }

  async logout(userId: string, fingerprint: string) {
    await this.prisma.refreshToken.deleteMany({
      where: {
        userId,
        fingerprint,
      },
    });
  }
}
