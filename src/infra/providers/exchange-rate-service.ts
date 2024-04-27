import { ExternalServiceError } from "@app/errors/external-service.error";
import { AbstractExchangeRateService } from "@app/providers/exchange-rate-service";
import { CurrencyCode } from "@app/types";
import ENV_VARS from '@config/env'
import { Injectable } from "@nestjs/common";

type ExchangeRatePairResponse = {
  result: 'success' | 'error',
  base_code: CurrencyCode,
  target_code: CurrencyCode,
  conversion_rate: number,
  time_next_update_unix: number
  "error-type"?: string
}

@Injectable()
export class ExchangeRateService implements AbstractExchangeRateService {
  private baseURL: string

  constructor() {
    this.baseURL = `https://v6.exchangerate-api.com/v6/${ENV_VARS().EXCHANGE_RATE_API_KEY}`
  }

  async getExchangeRate(params: { baseCode: CurrencyCode, targetCode: CurrencyCode }): Promise<{
    conversionRate: number,
    expirationTime?: number
  }> {
    try {
      const response = await fetch(`${this.baseURL}/pair/${params.baseCode}/${params.targetCode}`)

      const parsedJson = await response.json() as ExchangeRatePairResponse
      // console.log('parsedJson', parsedJson)

      if (parsedJson.result === 'error') {
        throw new ExternalServiceError('Exchange-Rate API', parsedJson["error-type"])
      }

      // time_next_update_unix is the unix time in seconds for the next update
      // so if we want to keep a cache of the conversionRate we need to set its expiration time to the next update time
      return { conversionRate: parsedJson.conversion_rate, expirationTime: parsedJson.time_next_update_unix }
    } catch (error) {
      if (error instanceof ExternalServiceError) throw error

      throw new ExternalServiceError('Exchange-Rate API', "Unkown error.")
    }
  }
}