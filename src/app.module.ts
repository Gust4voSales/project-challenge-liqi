import { Module } from '@nestjs/common';
import { HttpModule } from '@infra/http/http.module';
import { ConfigModule } from '@nestjs/config';
import envConfiguration from '@config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfiguration],
    }), HttpModule]
})
export class AppModule { }
