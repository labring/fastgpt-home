type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

export async function withLlmIndexCache<T>(
  key: string,
  ttlMs: number,
  factory: () => Promise<T>
): Promise<T> {
  const entry = cache.get(key);

  if (entry && entry.expiresAt > Date.now()) {
    return entry.value as T;
  }

  const value = await factory();
  cache.set(key, { value, expiresAt: Date.now() + ttlMs });
  return value;
}
