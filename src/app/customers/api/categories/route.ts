import { NextResponse } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Category from '@/customers/models/Category';
import { getAutoCategoryColor, normalizeHexColor } from '@/customers/lib/category-color';
import { ensureCategorySlugs } from '@/customers/lib/category-slug';

export const dynamic = 'force-dynamic'; // 动态路由，避免构建时尝试连接数据库导致卡死

export async function GET() {
  try {
    await dbConnect();
    await ensureCategorySlugs();
    const categories = await Category.find({ isActive: true })
      .select('name slug order color _id')
      .sort({ order: 1 })
      .lean() as Array<{
        _id: { toString(): string };
        name: string;
        slug: string;
        color?: string | null;
      }>;

    return NextResponse.json(categories.map((category) => ({
      id: category._id.toString(),
      name: category.name,
      slug: category.slug,
      color: normalizeHexColor(category.color, getAutoCategoryColor(category.name))
    })), {
      headers: {
        // 分类列表全局一致且低频变化：允许 CDN/浏览器短缓存，
        // 写操作通过 revalidateCategoryRefs 失效。
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
