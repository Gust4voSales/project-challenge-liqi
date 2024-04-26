import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV_VARS } from '@config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(ENV_VARS.PORT, () => console.log(`🪴 Server running on port ${ENV_VARS.PORT}!`));
}
bootstrap();
