import { NextResponse } from 'next/server';
import { getFastGptGitHubStars } from '@/customers/lib/github-stats';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getFastGptGitHubStars();

  return NextResponse.json(data, {
    headers: {
      // 与 github-stats 的 6 小时内存缓存语义对齐：CDN/浏览器也缓存 6 小时。
      'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400'
    }
  });
}
