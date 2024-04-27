import { AbstractCachePersistance } from "@app/providers/cache-persistance";
import { AbstractExchangeRateService } from "@app/providers/exchange-rate-service";
import { GetExchangeRateService } from "./get-exchange-rate";

class MockExchangeRateService implements AbstractExchangeRateService {
  async getExchangeRate() {
    return { conversionRate: 5.52 }; // Mocked conversion rate
  }
}

class MockCachePersistance implements AbstractCachePersistance {
  async get(_: string) {
    return 6.52; // Mocked returned value from cache
  }
  async set() { }
}

const cachePersistance = new MockCachePersistance()

describe("GetExchangeRate", () => {
  let getExchangeRateService: GetExchangeRateService

  beforeEach(() => {
    getExchangeRateService = new GetExchangeRateService(new MockExchangeRateService(), cachePersistance)
  })

  it("should be able to get the conversion rate from the API when cache not available", async () => {
    jest.spyOn(cachePersistance, 'get').mockResolvedValueOnce(null)

    const { conversionRate } = await getExchangeRateService.execute({ baseCode: "USD", targetCode: "BRL" })

    expect(conversionRate).toBe(5.52)
  });

  it("should be able to get the conversion rate from cache when available", async () => {
    const { conversionRate } = await getExchangeRateService.execute({ baseCode: "USD", targetCode: "BRL" })

    expect(conversionRate).toBe(6.52)
  });
})