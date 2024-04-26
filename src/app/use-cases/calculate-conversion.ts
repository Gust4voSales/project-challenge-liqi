import { ExchangeRate } from "@app/entities/exchange-rate"
import { AbstractExchangeRateService } from "@app/providers/exchange-rate-service"
import { CurrencyCode } from "@app/types"
import { Injectable } from "@nestjs/common"


export type Request = {
  baseCode: CurrencyCode
  targetCode: CurrencyCode
  amount: number
}

@Injectable()
export class CalculateConversionService {
  constructor(private exchangeRateService: AbstractExchangeRateService) { }

  async execute(request: Request) {
    const { baseCode, targetCode, amount } = request
    const { conversionRate } = await this.exchangeRateService.getExchangeRate({ baseCode, targetCode })

    const exchangeRate = new ExchangeRate({ baseCode, targetCode, conversionRate, amount })

    return {
      convertedAmount: exchangeRate.convertedAmount
    }
  }
}