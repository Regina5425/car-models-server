import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true,
    exposedHeaders: true,
  });

  await app.listen(config.getOrThrow<number>('PORT') ?? 4200);
}
bootstrap();
