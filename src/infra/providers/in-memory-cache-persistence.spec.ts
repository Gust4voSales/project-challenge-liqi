import { InMemoryCachePersistence } from "./in-memory-cache-persistence";


describe("InMemoryCachePersistence", () => {
  it("should be able to set data and get it from cache", async () => {
    const inMemoryCachePersistence = new InMemoryCachePersistence();

    const oneMinute = 60 * 1000;
    await inMemoryCachePersistence.set({ key: 'USD-BRL', value: 6.52, expirationTime: Date.now() + oneMinute });

    const value = await inMemoryCachePersistence.get('USD-BRL');

    expect(value).toBe(6.52);
  })

  it("should not be able to get expired data", async () => {
    const inMemoryCachePersistence = new InMemoryCachePersistence();

    const oneMinute = 60 * 1000;
    await inMemoryCachePersistence.set({ key: 'USD-BRL', value: 6.52, expirationTime: Date.now() - oneMinute });

    const value = await inMemoryCachePersistence.get('USD-BRL');

    expect(value).toBe(null);
  })

})