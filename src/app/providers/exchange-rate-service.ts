import { CurrencyCode } from "@app/types";

export abstract class AbstractExchangeRateService {
  abstract getExchangeRate(p: { baseCode: CurrencyCode, targetCode: CurrencyCode }): Promise<{
    conversionRate: number
  }>
}