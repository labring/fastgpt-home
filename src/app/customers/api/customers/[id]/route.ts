import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Customer from '@/customers/models/Customer';
import Category from '@/customers/models/Category';
import { getAutoCategoryColor, normalizeHexColor } from '@/customers/lib/category-color';
import { ensureCategorySlugs } from '@/customers/lib/category-slug';
import { getInteractedCustomerIdSets } from '@/customers/lib/public-interaction-state';
import { resolveCustomerObjectId } from '@/customers/lib/customer-id';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = await resolveCustomerObjectId(rawId);
    if (!id) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    await dbConnect();
    await ensureCategorySlugs();
    Category.init();

    const customer = await Customer.findById(id)
      .populate('categoryId', 'name slug color')
      .lean({ virtuals: true }) as
      | {
          _id: { toString(): string };
          categoryId?:
            | {
                _id?: { toString(): string };
                name?: string;
                slug?: string | null;
                color?: string | null;
                toString?: () => string;
              }
            | string
            | null;
          categoryName?: string;
          title: string;
          description: string;
          imageUrl: string;
          thumbnailUrl?: string;
          freeUseUrl?: string;
          likesCount: number;
          usageCount: number;
          formattedUsageCount?: string;
          content: string;
          createdAt?: Date;
          updatedAt?: Date;
          isPublished: boolean;
        }
      | null;

    if (!customer || !customer.isPublished) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }
    const customerId = customer._id.toString();
    const interactionState = await getInteractedCustomerIdSets([customerId]);

    return NextResponse.json({
      id: customerId,
      categoryId:
        typeof customer.categoryId === 'object' && customer.categoryId !== null
          ? customer.categoryId._id?.toString() || customer.categoryId.toString?.() || ''
          : customer.categoryId?.toString() || '',
      categoryName:
        (typeof customer.categoryId === 'object' && customer.categoryId !== null
          ? customer.categoryId.name
          : undefined) ||
        customer.categoryName ||
        '未知分类',
      categorySlug:
        typeof customer.categoryId === 'object' && customer.categoryId !== null
          ? customer.categoryId.slug || ''
          : '',
      categoryColor: normalizeHexColor(
        typeof customer.categoryId === 'object' && customer.categoryId !== null
          ? customer.categoryId.color
          : undefined,
        getAutoCategoryColor(
          (typeof customer.categoryId === 'object' && customer.categoryId !== null
            ? customer.categoryId.name
            : undefined) ||
            customer.categoryName ||
            ''
        )
      ),
      title: customer.title,
      description: customer.description,
      imageUrl: customer.imageUrl,
      thumbnailUrl: customer.thumbnailUrl || customer.imageUrl,
      freeUseUrl: customer.freeUseUrl || '',
      likes: customer.likesCount,
      isLiked: interactionState.likedCustomerIds.has(customerId),
      hasViewed: interactionState.viewedCustomerIds.has(customerId),
      usage: customer.formattedUsageCount || customer.usageCount.toString(),
      rawUsageCount: customer.usageCount,
      content: customer.content,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt || customer.createdAt
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer' },
      { status: 500 }
    );
  }
}
