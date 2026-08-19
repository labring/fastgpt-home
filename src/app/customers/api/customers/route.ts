import { NextRequest, NextResponse } from 'next/server';
import { getPublishedSolutionsPage } from '@/customers/lib/data';
import {
  DEFAULT_PUBLIC_SOLUTION_SORT_KEY,
  PUBLIC_SOLUTIONS_MAX_PAGE_SIZE,
  isPublicSolutionSortKey
} from '@/customers/lib/solution-pagination';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sortByParam = searchParams.get('sortBy');
    const data = await getPublishedSolutionsPage({
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
      page: Number.parseInt(searchParams.get('page') || '1', 10),
      limit: Number.parseInt(searchParams.get('limit') || '10', 10),
      sortBy: isPublicSolutionSortKey(sortByParam) ? sortByParam : DEFAULT_PUBLIC_SOLUTION_SORT_KEY,
      maxLimit: PUBLIC_SOLUTIONS_MAX_PAGE_SIZE
    });

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error('Error fetching solutions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch solutions' },
      { status: 500 }
    );
  }
}
