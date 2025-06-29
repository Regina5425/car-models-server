import type { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfig } from 'src/config/swagger.config';

export function setupSwagger(app: INestApplication) {
  const swaggerConfig = getSwaggerConfig();

  const document = () => SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
    customSiteTitle: 'Car Model App API',
  });
}
