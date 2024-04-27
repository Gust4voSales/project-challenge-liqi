import { CreateUserService } from '@app/serverless/use-cases/create-user';
import { HttpStatus } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { APIGatewayProxyEvent, Callback, Context, Handler, } from 'aws-lambda';
import { AppModule } from 'src/app.module';

export const createUser: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
) => {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const createUserService = appContext.get(CreateUserService);

  const response = await createUserService.execute(event.body);

  return {
    body: response,
    statusCode: HttpStatus.OK,
  };
};