import { CurrencyCode, CurrencyCodeEnum } from "@app/types"
import { IsEnum, IsNumber, IsPositive } from "class-validator"

export class CalculateConversionDto {
  @IsEnum(CurrencyCodeEnum, {
    message: ({ value }) => `${value} is not a valid currency code. Must be one of: ${Object.values(CurrencyCodeEnum).join(', ')}`
  })
  baseCode: CurrencyCode

  @IsEnum(CurrencyCodeEnum, {
    message: ({ value }) => `${value} is not a valid currency code. Must be one of: ${Object.values(CurrencyCodeEnum).join(', ')}`
  })
  targetCode: CurrencyCode

  @IsNumber()
  @IsPositive()
  amount: number
}