import { DocumentBuilder } from "@nestjs/swagger";

export const options = new DocumentBuilder()
  .setTitle('Currency Conversion API')
  .setDescription('An API that allows you to calculate the conversion value between two currencies considering the current cotation')
  .setVersion('1.0')
  .build();