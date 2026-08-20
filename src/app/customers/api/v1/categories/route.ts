import { NextRequest } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Category from '@/customers/models/Category';
import Customer from '@/customers/models/Customer';
import { getAutoCategoryColor, getRandomCategoryColor, normalizeHexColor } from '@/customers/lib/category-color';
import { revalidateAdminRouteTree } from '@/customers/lib/admin-cache';
import { revalidateCategoryRefs } from '@/customers/lib/public-cache-invalidation';
import {
  ensureCategorySlugs,
  isCategorySlugAvailable,
  isValidCategorySlug,
  normalizeCategorySlug
} from '@/customers/lib/category-slug';
import {
  AGENT_ERROR_CODES,
  createAgentRequestContext,
  errorResult,
  getTrimmedString,
  isRecord,
  readJsonBody,
  requireAgentAuth,
  resolveAgentDomainError,
  successResult,
  toAgentResponse
} from '@/customers/lib/agent-api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const context = createAgentRequestContext(request);
  const authError = await requireAgentAuth(request, context);
  if (authError) {
    return toAgentResponse(authError);
  }

  try {
    await dbConnect();
    await ensureCategorySlugs();

    const includeInactive = request.nextUrl.searchParams.get('includeInactive') === 'true';
    const query: Record<string, unknown> = {};
    if (!includeInactive) {
      query.isActive = true;
    }

    const categories = await Category.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean() as Array<{
      _id: { toString(): string };
      name: string;
      slug: string;
      order: number;
      isActive: boolean;
      color?: string | null;
      createdAt?: Date;
      updatedAt?: Date;
    }>;

    // Get customer counts per category
    const counts = await Customer.aggregate([
      { $match: { deletedAt: null } },
      { $group: { _id: '$categoryId', count: { $sum: 1 } } },
    ]);
    const countMap = new Map(
      counts.map((c: { _id: { toString(): string }; count: number }) => [c._id.toString(), c.count])
    );

    return toAgentResponse(successResult(context, categories.map((cat) => ({
        id: cat._id.toString(),
        name: cat.name,
        slug: cat.slug,
        color: normalizeHexColor(cat.color, getAutoCategoryColor(cat.name)),
        order: cat.order,
        isActive: cat.isActive,
        customerCount: countMap.get(cat._id.toString()) || 0,
        createdAt: cat.createdAt,
        updatedAt: cat.updatedAt,
      }))));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '获取分类列表失败'
    ));
  }
}

export async function POST(request: NextRequest) {
  const context = createAgentRequestContext(request);
  const authError = await requireAgentAuth(request, context);
  if (authError) {
    return toAgentResponse(authError);
  }

  try {
    await dbConnect();
    const requestBody = await readJsonBody(request, context);
    if (!requestBody.success) {
      return toAgentResponse(requestBody.result);
    }

    if (!isRecord(requestBody.data)) {
      return toAgentResponse(errorResult(
        context,
        400,
        AGENT_ERROR_CODES.invalidRequestBody,
        '请求体必须是 JSON 对象'
      ));
    }

    const body = requestBody.data;
    const name = getTrimmedString(body.name);
    const slug = normalizeCategorySlug(getTrimmedString(body.slug));
    if (!name) {
      return toAgentResponse(errorResult(
        context,
        400,
        AGENT_ERROR_CODES.categoryNameRequired,
        '分类名称不能为空'
      ));
    }
    if (name === '全部') {
      return toAgentResponse(errorResult(
        context,
        400,
        AGENT_ERROR_CODES.categoryReservedName,
        '分类名称不能为"全部"，该名称为系统保留字'
      ));
    }

    if (!slug) {
      return toAgentResponse(errorResult(
        context,
        400,
        AGENT_ERROR_CODES.validationError,
        '分类 Slug 不能为空'
      ));
    }

    if (!isValidCategorySlug(slug)) {
      return toAgentResponse(errorResult(
        context,
        400,
        AGENT_ERROR_CODES.validationError,
        '分类 Slug 只能包含小写字母、数字和连字符'
      ));
    }

    if (!(await isCategorySlugAvailable(slug))) {
      return toAgentResponse(errorResult(
        context,
        409,
        AGENT_ERROR_CODES.validationError,
        '该分类 Slug 已存在，请更换'
      ));
    }

    const exist = await Category.findOne({ name });
    if (exist) {
      return toAgentResponse(errorResult(
        context,
        409,
        AGENT_ERROR_CODES.categoryNameConflict,
        '该分类名称已存在，请更换'
      ));
    }

    const color = normalizeHexColor(
      typeof body.color === 'string' ? body.color : undefined,
      getRandomCategoryColor()
    );
    const order = typeof body.order === 'number' ? body.order : 0;
    const isActive = typeof body.isActive === 'boolean' ? body.isActive : true;

    const category = await Category.create({ name, slug, color, order, isActive });
    revalidateAdminRouteTree();
    revalidateCategoryRefs({ slug });

    return toAgentResponse(successResult(context, {
        id: category._id.toString(),
        name: category.name,
        slug: category.slug,
        color: category.color,
        order: category.order,
        isActive: category.isActive,
      }, 201));
  } catch (error) {
    console.error('Error creating category:', error);
    const resolvedError = resolveAgentDomainError(
      error instanceof Error ? error.message : '创建分类失败',
      { message: '创建分类失败' }
    );

    return toAgentResponse(errorResult(
      context,
      resolvedError.status,
      resolvedError.code,
      resolvedError.message,
      resolvedError.details
    ));
  }
}
