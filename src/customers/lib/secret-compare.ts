import { timingSafeEqual as nodeTimingSafeEqual } from 'crypto';

/**
 * 恒定时间字符串比较，避免通过响应时间逐字节猜测密钥。
 * 长度不等时直接返回 false（不做比较，长度本身不泄漏敏感信息）。
 */
export function timingSafeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left, 'utf8');
  const rightBuffer = Buffer.from(right, 'utf8');

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return nodeTimingSafeEqual(leftBuffer, rightBuffer);
}
