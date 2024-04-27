import { CalculateConversionService } from "@app/use-cases/calculate-conversion";
import { Module } from "@nestjs/common";
import { HTTPController } from "./http.controller";
import { AbstractExchangeRateService } from "@app/providers/exchange-rate-service";
import { ExchangeRateService } from "@infra/providers/exchange-rate-service";
import { GetExchangeRateService } from "@app/use-cases/get-exchange-rate";
import { AbstractCachePersistance } from "@app/providers/cache-persistance";
import { InMemoryCachePersistence } from "@infra/providers/in-memory-cache-persistence";

@Module({
  imports: [],
  controllers: [HTTPController],
  providers: [
    GetExchangeRateService,
    CalculateConversionService,
    {
      provide: AbstractExchangeRateService,
      useClass: ExchangeRateService
    },
    {
      provide: AbstractCachePersistance,
      useClass: InMemoryCachePersistence
    },
  ],
})
export class HttpModule { }