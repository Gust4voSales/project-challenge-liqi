import { getCurrentTimeUnix } from "@app/utils/getCurrentTimeUnix";
import { InMemoryCachePersistence } from "./in-memory-cache-persistence";


describe("InMemoryCachePersistence", () => {
  it("should be able to set data and get it from cache", async () => {
    const inMemoryCachePersistence = new InMemoryCachePersistence();

    const oneMinute = 60;
    const nowInUnixTimestamp = getCurrentTimeUnix()
    await inMemoryCachePersistence.set({ key: 'USD-BRL', value: 6.52, expirationTime: nowInUnixTimestamp + oneMinute });

    const value = await inMemoryCachePersistence.get('USD-BRL');

    expect(value).toBe(6.52);
  })

  it("should not be able to get expired data", async () => {
    const inMemoryCachePersistence = new InMemoryCachePersistence();

    const oneMinute = 60;
    const nowInUnixTimestamp = getCurrentTimeUnix()
    await inMemoryCachePersistence.set({ key: 'USD-BRL', value: 6.52, expirationTime: nowInUnixTimestamp - oneMinute });

    const value = await inMemoryCachePersistence.get('USD-BRL');

    expect(value).toBe(null);
  })

})