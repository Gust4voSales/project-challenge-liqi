import { CalculateConversionService } from "@app/use-cases/calculate-conversion";
import { Module } from "@nestjs/common";
import { HTTPController } from "./http.controller";
import { AbstractExchangeRateService } from "@app/providers/exchange-rate-service";
import { ExchangeRateService } from "@infra/providers/exchange-rate-service";

@Module({
  imports: [],
  controllers: [HTTPController],
  providers: [
    CalculateConversionService,
    {
      provide: AbstractExchangeRateService,
      useClass: ExchangeRateService
    }
  ],
})
export class HttpModule { }