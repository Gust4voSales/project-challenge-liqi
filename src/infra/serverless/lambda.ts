import { HttpStatus } from '@nestjs/common';
import { APIGatewayProxyEvent, Callback, Context, Handler, } from 'aws-lambda';

export const createUser: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
) => {
  return {
    body: JSON.stringify({
      message: "hello world!",
    }),
    statusCode: HttpStatus.OK,
  };
};