import { CurrencyCode, CurrencyCodeEnum } from "@app/types"
import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNumber, IsPositive } from "class-validator"

export class CalculateConversionDto {
  @ApiProperty({ type: String, example: "BRL" })
  @IsEnum(CurrencyCodeEnum, {
    message: ({ value }) => `${value} is not a valid currency code. Must be one of: ${Object.values(CurrencyCodeEnum).join(', ')}`
  })
  baseCode: CurrencyCode

  @ApiProperty({ type: String, example: "USD" })
  @IsEnum(CurrencyCodeEnum, {
    message: ({ value }) => `${value} is not a valid currency code. Must be one of: ${Object.values(CurrencyCodeEnum).join(', ')}`
  })
  targetCode: CurrencyCode

  @ApiProperty({ type: Number, example: 5 })
  @IsNumber()
  @IsPositive()
  amount: number
}