import { CalculateConversionService } from "@app/use-cases/calculate-conversion";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CalculateConversionDto } from "./dtos/calculate-conversion.dto";

@ApiTags("Calculate Conversion")
@Controller("/calculate-conversion")
export class HTTPController {
  constructor(private calculateConversionService: CalculateConversionService) { }

  @ApiResponse({
    status: 200,
    description: 'Calculate the conversion amount of the base currency to the target another',
    schema: {
      type: 'object',
      properties: {
        convertedAmount: {
          type: 'number',
          example: 0.969,
        }
      }
    }
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async calculate(@Body() body: CalculateConversionDto) {
    const { convertedAmount } = await this.calculateConversionService.execute(body);

    return {
      convertedAmount
    };
  }
}