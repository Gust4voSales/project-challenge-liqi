import { AbstractExchangeRateService } from "@app/providers/exchange-rate-service";
import { CalculateConversionService, Request } from "./calculate-conversion";

// Mocking ExchangeRateService class, because it is an inverse depencency of the CalculateConversionService
class MockExchangeRateService implements AbstractExchangeRateService {
  async getExchangeRate() {
    return { conversionRate: 5.52 }; // Mocked conversion rate
  }
}


describe('CalculateConversion', () => {
  const mockedExchangeRateService = new MockExchangeRateService();

  it('should return the correct converted amount for the given currency code', async () => {
    const request: Request = {
      baseCode: 'USD',
      targetCode: 'BRL',
      amount: 2,
    };

    const calculateConversionService = new CalculateConversionService(mockedExchangeRateService);

    const result = await calculateConversionService.execute({
      baseCode: request.baseCode,
      targetCode: request.targetCode,
      amount: request.amount,
    });

    // 2 * 5.52 = 11.04
    expect(result.convertedAmount).toBe(11.04);
  })
})