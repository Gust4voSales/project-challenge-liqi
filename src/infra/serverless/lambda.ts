import { CreateUserService } from '@app/serverless/use-cases/create-user';
import { HttpStatus } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { APIGatewayProxyEvent, Callback, Context, Handler, SQSEvent, } from 'aws-lambda';
import { EventBridgeClient, PutEventsCommand, PutEventsRequestEntry } from "@aws-sdk/client-eventbridge";
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

export const sqsEventListener = async (event: SQSEvent) => {
  const sqsReceivedData = event.Records.map((record) => ({
    message: JSON.parse(record.body),
    messageId: record.messageId
  }))

  const eventData: PutEventsRequestEntry = {
    DetailType: 'Event',
    Detail: JSON.stringify({ data: sqsReceivedData }),
    Source: 'sqs.to.lambda.to.eventbridge',
  };

  const eventBridgeClient = new EventBridgeClient({});

  const putEventsCommand = new PutEventsCommand({
    Entries: [eventData]
  });

  console.log('eventData', eventData)

  try {
    // Send the event data to EventBridge
    const response = await eventBridgeClient.send(putEventsCommand)
    console.log(response.Entries)
  } catch (error) {
    console.log('Error: ', error)
  }
}