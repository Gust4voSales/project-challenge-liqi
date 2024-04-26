import { NestFactory } from '@nestjs/core';
import ENV_VARS from '@config/env';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(ENV_VARS().PORT, () => console.log(`🪴 Server running on port ${ENV_VARS().PORT}!`));
}
bootstrap();
