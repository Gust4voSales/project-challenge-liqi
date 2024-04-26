import { CurrencyCode } from "@app/types";

export abstract class ExchangeRateService {
  abstract getExchangeRate(p: { baseCode: CurrencyCode, targetCode: CurrencyCode }): Promise<{
    conversionRate: number
  }>
}