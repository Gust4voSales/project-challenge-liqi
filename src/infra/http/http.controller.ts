import { CalculateConversionService } from "@app/use-cases/calculate-conversion";
import { Body, Controller, Post } from "@nestjs/common";
import { CalculateConversionDto } from "./dtos/calculate-conversion.dto";

@Controller("/calculate-conversion")
export class HTTPController {
  constructor(private calculateConversionService: CalculateConversionService) { }

  @Post()
  async calculate(@Body() body: CalculateConversionDto) {
    const { convertedAmount } = await this.calculateConversionService.execute(body);

    return {
      convertedAmount
    };
  }
}