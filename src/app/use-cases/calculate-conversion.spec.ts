import { AbstractExchangeRateService } from "@app/providers/exchange-rate-service";
import { CalculateConversionService, Request } from "./calculate-conversion";
import { GetExchangeRateService } from "./get-exchange-rate";
import { AbstractCachePersistance } from "@app/providers/cache-persistance";

describe('CalculateConversion', () => {
  let exchangeRateService: AbstractExchangeRateService
  let cachePersistance: AbstractCachePersistance

  let getExchangeRateService: GetExchangeRateService = new GetExchangeRateService(exchangeRateService, cachePersistance);

  it('should return the correct converted amount for the given currency code', async () => {
    const request: Request = {
      baseCode: 'USD',
      targetCode: 'BRL',
      amount: 2,
    };

    const calculateConversionService = new CalculateConversionService(getExchangeRateService);

    // Mocked implementation. GetExchangeRateService already has its implementation covered by unit tests
    jest.spyOn(getExchangeRateService, 'execute').mockResolvedValue({ conversionRate: 5.52 });

    const result = await calculateConversionService.execute({
      baseCode: request.baseCode,
      targetCode: request.targetCode,
      amount: request.amount,
    });

    // 2 * 5.52 = 11.04
    expect(result.convertedAmount).toBe(11.04);
  })
})