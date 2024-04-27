import ENV_VARS from '@config/env';
import { options as swaggerOptions } from '@config/swagger';
import { ExternalServiceFilter } from '@infra/exception-filters/external-service.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  app.useGlobalFilters(new ExternalServiceFilter());

  app.enableCors();

  await app.listen(ENV_VARS().PORT, () => console.log(`🪴 Server running on port ${ENV_VARS().PORT}!`));
}
bootstrap();
