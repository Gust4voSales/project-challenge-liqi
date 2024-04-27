import { CreateUserService } from '@app/serverless/use-cases/create-user';
import { Module } from '@nestjs/common';

@Module({
  providers: [CreateUserService],
})
export class ServerlessModule { }
