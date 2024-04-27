import { NestFactory } from '@nestjs/core';
import ENV_VARS from '@config/env';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExternalServiceFilter } from '@infra/exception-filters/external-service.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  app.useGlobalFilters(new ExternalServiceFilter());

  app.enableCors();
  await app.listen(ENV_VARS().PORT, () => console.log(`🪴 Server running on port ${ENV_VARS().PORT}!`));
}
bootstrap();
