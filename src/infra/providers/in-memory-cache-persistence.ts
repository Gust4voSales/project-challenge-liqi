import { AbstractCachePersistance, SetCachePersistanceParams } from "@app/providers/cache-persistance";
import { getCurrentTimeUnix } from "@app/utils/getCurrentTimeUnix";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InMemoryCachePersistence implements AbstractCachePersistance {
  private cache: Map<string, { data: any, expirationTime: number }>;

  constructor() {
    this.cache = new Map();
  }

  async get(key: string): Promise<any> {
    const cacheData = this.cache.get(key);

    // the unix time in seconds
    const nowInUnixTimestamp = getCurrentTimeUnix()

    if (!cacheData || nowInUnixTimestamp > cacheData.expirationTime) {
      this.cache.delete(key);
      return null;
    }

    return cacheData.data;
  }

  async set({ key, value, expirationTime }: SetCachePersistanceParams): Promise<void> {
    this.cache.set(key, { data: value, expirationTime });
  }
}