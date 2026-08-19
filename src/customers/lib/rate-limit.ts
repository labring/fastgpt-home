type RateLimitContext = {
  count: number;
  resetTime: number;
};

const cache = new Map<string, RateLimitContext>();

/**
 * 简单的内存版 Rate Limiter
 * @param ip 请求者的 IP 地址
 * @param limit 在指定时间窗口内允许的最大请求数
 * @param windowMs 时间窗口大小 (毫秒)
 */
export function rateLimit(ip: string, limit: number, windowMs: number) {
  const now = Date.now();

  // 懒清理：当缓存过大时清理过期数据，防止恶意伪造 IP 导致内存泄漏（针对长期运行的服务）
  if (cache.size > 5000) {
    for (const [key, ctx] of cache.entries()) {
      if (now > ctx.resetTime) {
        cache.delete(key);
      }
    }
    // 极端情况下兜底
    if (cache.size > 10000) {
      cache.clear();
    }
  }

  const context = cache.get(ip);

  if (!context || now > context.resetTime) {
    cache.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true, limit, remaining: limit - 1 };
  }

  if (context.count >= limit) {
    return { success: false, limit, remaining: 0 };
  }

  context.count += 1;
  cache.set(ip, context);
  return { success: true, limit, remaining: limit - context.count };
}
