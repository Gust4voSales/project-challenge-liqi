import { AbstractCachePersistance } from "@app/providers/cache-persistance"
import { AbstractExchangeRateService } from "@app/providers/exchange-rate-service"
import { CurrencyCode } from "@app/types"
import { Injectable } from "@nestjs/common"

export type Request = {
  baseCode: CurrencyCode
  targetCode: CurrencyCode
}

@Injectable()
export class GetExchangeRateService {
  constructor(private exchangeRateService: AbstractExchangeRateService, private cachePersistance: AbstractCachePersistance) { }

  async execute(request: Request) {
    const { baseCode, targetCode } = request

    const cachedExchangeRate = await this.cachePersistance.get(`${baseCode}-${targetCode}`)

    if (cachedExchangeRate !== null) {
      // console.log('Got from cache')
      return {
        conversionRate: cachedExchangeRate
      }
    }

    const { conversionRate, expirationTime } = await this.exchangeRateService.getExchangeRate({ baseCode, targetCode })
    // console.log('Got from API')

    await this.cachePersistance.set({ key: `${baseCode}-${targetCode}`, value: conversionRate, expirationTime })

    return {
      conversionRate
    }
  }
}