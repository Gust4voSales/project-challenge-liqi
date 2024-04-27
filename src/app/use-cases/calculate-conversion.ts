import { ExchangeRate } from "@app/entities/exchange-rate"
import { AbstractExchangeRateService } from "@app/providers/exchange-rate-service"
import { CurrencyCode } from "@app/types"
import { Injectable } from "@nestjs/common"
import { GetExchangeRateService } from "./get-exchange-rate"


export type Request = {
  baseCode: CurrencyCode
  targetCode: CurrencyCode
  amount: number
}

@Injectable()
export class CalculateConversionService {
  constructor(private getExchangeRateService: GetExchangeRateService) { }

  async execute(request: Request) {
    const { baseCode, targetCode, amount } = request

    const { conversionRate } = await this.getExchangeRateService.execute({ baseCode, targetCode })

    const exchangeRate = new ExchangeRate({ baseCode, targetCode, conversionRate, amount })

    return {
      convertedAmount: exchangeRate.convertedAmount
    }
  }
}