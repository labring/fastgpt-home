import { NextRequest, NextResponse } from 'next/server';
import { getPublishedCustomersPage } from '@/customers/lib/data';
import {
  DEFAULT_PUBLIC_CUSTOMER_SORT_KEY,
  PUBLIC_CUSTOMERS_MAX_PAGE_SIZE,
  isPublicCustomerSortKey
} from '@/customers/lib/customer-pagination';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sortByParam = searchParams.get('sortBy');
    const data = await getPublishedCustomersPage({
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
      page: Number.parseInt(searchParams.get('page') || '1', 10),
      limit: Number.parseInt(searchParams.get('limit') || '10', 10),
      sortBy: isPublicCustomerSortKey(sortByParam) ? sortByParam : DEFAULT_PUBLIC_CUSTOMER_SORT_KEY,
      maxLimit: PUBLIC_CUSTOMERS_MAX_PAGE_SIZE
    });

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}
