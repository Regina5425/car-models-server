import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Car Model App API')
    .setDescription('API для мобильного приложения Car Model App')
    .setVersion('1.0.0')
    .setContact(
      'Regina',
      'https://github.com/Regina5425/car-models-server',
      'reina5425@gmail.com',
    )
    .addBearerAuth()
    .build();
}
