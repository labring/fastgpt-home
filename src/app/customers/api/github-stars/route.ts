import { NextResponse } from 'next/server';
import { getFastGptGitHubStars } from '@/customers/lib/github-stats';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getFastGptGitHubStars();

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}
