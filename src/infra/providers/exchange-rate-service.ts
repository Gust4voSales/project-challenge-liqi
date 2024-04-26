import { AbstractExchangeRateService } from "@app/providers/exchange-rate-service";
import { CurrencyCode } from "@app/types";
import ENV_VARS from '@config/env'
import { Injectable } from "@nestjs/common";

type ExchangeRatePairResponse = {
  base_code: CurrencyCode,
  target_code: CurrencyCode,
  conversion_rate: number
}

@Injectable()
export class ExchangeRateService implements AbstractExchangeRateService {
  private baseURL: string

  constructor() {
    this.baseURL = `https://v6.exchangerate-api.com/v6/${ENV_VARS().EXCHANGE_RATE_API_KEY}`
  }

  // TODO handle errors
  async getExchangeRate(params: { baseCode: CurrencyCode, targetCode: CurrencyCode }): Promise<{
    conversionRate: number
  }> {
    const response = await fetch(`${this.baseURL}/pair/${params.baseCode}/${params.targetCode}`)

    const parsedJson = await response.json() as ExchangeRatePairResponse

    return { conversionRate: parsedJson.conversion_rate }
  }
}