import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Solution from '@/customers/models/Solution';
import Category from '@/customers/models/Category';
import { getAutoCategoryColor, normalizeHexColor } from '@/customers/lib/category-color';
import { ensureCategorySlugs } from '@/customers/lib/category-slug';
import { getInteractedSolutionIdSets } from '@/customers/lib/public-interaction-state';
import { resolveSolutionObjectId } from '@/customers/lib/solution-id';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = await resolveSolutionObjectId(rawId);
    if (!id) {
      return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
    }

    await dbConnect();
    await ensureCategorySlugs();
    Category.init();

    const solution = await Solution.findById(id)
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

    if (!solution || !solution.isPublished) {
      return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
    }
    const solutionId = solution._id.toString();
    const interactionState = await getInteractedSolutionIdSets([solutionId]);

    return NextResponse.json({
      id: solutionId,
      categoryId:
        typeof solution.categoryId === 'object' && solution.categoryId !== null
          ? solution.categoryId._id?.toString() || solution.categoryId.toString?.() || ''
          : solution.categoryId?.toString() || '',
      categoryName:
        (typeof solution.categoryId === 'object' && solution.categoryId !== null
          ? solution.categoryId.name
          : undefined) ||
        solution.categoryName ||
        '未知分类',
      categorySlug:
        typeof solution.categoryId === 'object' && solution.categoryId !== null
          ? solution.categoryId.slug || ''
          : '',
      categoryColor: normalizeHexColor(
        typeof solution.categoryId === 'object' && solution.categoryId !== null
          ? solution.categoryId.color
          : undefined,
        getAutoCategoryColor(
          (typeof solution.categoryId === 'object' && solution.categoryId !== null
            ? solution.categoryId.name
            : undefined) ||
            solution.categoryName ||
            ''
        )
      ),
      title: solution.title,
      description: solution.description,
      imageUrl: solution.imageUrl,
      thumbnailUrl: solution.thumbnailUrl || solution.imageUrl,
      freeUseUrl: solution.freeUseUrl || '',
      likes: solution.likesCount,
      isLiked: interactionState.likedSolutionIds.has(solutionId),
      hasViewed: interactionState.viewedSolutionIds.has(solutionId),
      usage: solution.formattedUsageCount || solution.usageCount.toString(),
      rawUsageCount: solution.usageCount,
      content: solution.content,
      createdAt: solution.createdAt,
      updatedAt: solution.updatedAt || solution.createdAt
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error('Error fetching solution:', error);
    return NextResponse.json(
      { error: 'Failed to fetch solution' },
      { status: 500 }
    );
  }
}
