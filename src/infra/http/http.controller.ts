import { CalculateConversionService } from "@app/use-cases/calculate-conversion";
import { Body, Controller, Post } from "@nestjs/common";

@Controller("/calculate-conversion")
export class HTTPController {
  constructor(private calculateConversionService: CalculateConversionService) { }

  @Post()
  async calculate(@Body() body: any) { // typing `body` as any for now, TODO: add proper typing + validation
    const { convertedAmount } = await this.calculateConversionService.execute(body);

    return {
      convertedAmount
    };
  }
}