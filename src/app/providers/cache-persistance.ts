export type SetCachePersistanceParams = {
  key: string
  value: any
  expirationTime: number
}
export abstract class AbstractCachePersistance {
  abstract get(key: string): Promise<any | null>
  abstract set(p: SetCachePersistanceParams): Promise<void>
}