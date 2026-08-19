/**
 * 轻量级内存固定窗口频率限制器，无需外部依赖。
 * 用于公开 API 端点防刷。
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const store = new Map<string, Bucket>();

// 每 60 秒清理过期桶，防止内存泄漏
let gcTimer: ReturnType<typeof setInterval> | null = null;

function ensureGc() {
  if (gcTimer) return;
  gcTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of store) {
      if (now >= bucket.resetAt) {
        store.delete(key);
      }
    }
  }, 60_000);
  // 允许进程退出
  if (gcTimer && typeof gcTimer === 'object' && 'unref' in gcTimer) {
    (gcTimer as NodeJS.Timeout).unref();
  }
}

/**
 * 检查是否超出频率限制（固定窗口）。
 * @param key    标识符（通常为 IP）
 * @param limit  窗口内最大请求数
 * @param windowMs 窗口时长（毫秒）
 * @returns 是否允许及剩余配额
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  ensureGc();

  const now = Date.now();
  let bucket = store.get(key);

  // 窗口已过期或首次访问，创建新桶
  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 1, resetAt: now + windowMs };
    store.set(key, bucket);
    return { allowed: true, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  bucket.count += 1;
  return { allowed: true, remaining: limit - bucket.count };
}
