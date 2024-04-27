import { Module } from '@nestjs/common';
import { HttpModule } from '@infra/http/http.module';
import { ConfigModule } from '@nestjs/config';
import envConfiguration from '@config/env';
import { ServerlessModule } from '@infra/serverless/serverless.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfiguration],
    }), HttpModule, ServerlessModule]
})
export class AppModule { }
