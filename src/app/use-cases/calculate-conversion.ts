import { ExchangeRate } from "@app/entities/exchange-rate"
import { ExchangeRateService } from "@app/providers/exchange-rate-service"
import { CurrencyCode } from "@app/types"


export type Request = {
  baseCode: CurrencyCode
  targetCode: CurrencyCode
  amount: number
}

export class CalculateConversionService {
  constructor(private exchangeRateService: ExchangeRateService) { }

  async execute(request: Request) {
    const { baseCode, targetCode, amount } = request
    const { conversionRate } = await this.exchangeRateService.getExchangeRate({ baseCode, targetCode })

    const exchangeRate = new ExchangeRate({ baseCode, targetCode, conversionRate, amount })

    return {
      convertedAmount: exchangeRate.convertedAmount
    }
  }
}