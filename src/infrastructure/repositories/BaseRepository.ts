export abstract class BaseRepository<T, K> {
  protected cache = new Map<K, { data: T; timestamp: number }>();
  protected readonly cacheTTL = 5 * 60 * 1000; // 5 minutes

  protected isValidCache(key: K): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.cacheTTL;
  }

  protected setCache(key: K, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  protected getCache(key: K): T | null {
    return this.isValidCache(key) ? this.cache.get(key)!.data : null;
  }

  protected clearCache(key?: K): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  protected getCacheSize(): number {
    return this.cache.size;
  }

  protected cleanExpiredCache(): void {
    const now = Date.now();
    const expiredKeys: K[] = [];

    this.cache.forEach((value, key) => {
      if (now - value.timestamp > this.cacheTTL) {
        expiredKeys.push(key);
      }
    });

    expiredKeys.forEach(key => this.cache.delete(key));
  }

  abstract findById(id: K): Promise<T>;
  abstract save(entity: T): Promise<T>;
  abstract delete(id: K): Promise<void>;
}
