import { NextRequest } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Category from '@/customers/models/Category';
import Solution from '@/customers/models/Solution';
import { getAutoCategoryColor, normalizeHexColor } from '@/customers/lib/category-color';
import { revalidateAdminRouteTree } from '@/customers/lib/admin-cache';
import {
  loadSolutionRevalidationRefsByCategoryId,
  revalidateCategoryRefs,
  revalidateSolutionRefs
} from '@/customers/lib/public-cache-invalidation';
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
import { isValidObjectId } from '@/customers/lib/object-id';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const context = createAgentRequestContext(request);
  const authError = await requireAgentAuth(request, context);
  if (authError) {
    return toAgentResponse(authError);
  }

  try {
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return toAgentResponse(errorResult(
        context,
        404,
        AGENT_ERROR_CODES.categoryNotFound,
        '分类不存在'
      ));
    }

    await dbConnect();
    await ensureCategorySlugs();
    const category = await Category.findById(id).lean();
    if (!category) {
      return toAgentResponse(errorResult(
        context,
        404,
        AGENT_ERROR_CODES.categoryNotFound,
        '分类不存在'
      ));
    }

    const solutionCount = await Solution.countDocuments({ categoryId: id, deletedAt: null });

    return toAgentResponse(successResult(context, {
        id: String(category._id),
        name: category.name,
        slug: category.slug,
        color: normalizeHexColor(category.color, getAutoCategoryColor(category.name)),
        order: category.order,
        isActive: category.isActive,
        solutionCount,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      }));
  } catch (error) {
    console.error('Error getting category:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '获取分类详情失败'
    ));
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const context = createAgentRequestContext(request);
  const authError = await requireAgentAuth(request, context);
  if (authError) {
    return toAgentResponse(authError);
  }

  try {
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return toAgentResponse(errorResult(
        context,
        404,
        AGENT_ERROR_CODES.categoryNotFound,
        '分类不存在'
      ));
    }

    await dbConnect();
    await ensureCategorySlugs();
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
        '分类名称不能为"全部"'
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

    if (!(await isCategorySlugAvailable(slug, { excludeId: id }))) {
      return toAgentResponse(errorResult(
        context,
        409,
        AGENT_ERROR_CODES.validationError,
        '该分类 Slug 已存在，请更换'
      ));
    }

    const exist = await Category.findOne({ name, _id: { $ne: id } });
    if (exist) {
      return toAgentResponse(errorResult(
        context,
        409,
        AGENT_ERROR_CODES.categoryNameConflict,
        '该分类名称已存在，请更换'
      ));
    }

    const oldCategory = await Category.findById(id);
    if (!oldCategory) {
      return toAgentResponse(errorResult(
        context,
        404,
        AGENT_ERROR_CODES.categoryNotFound,
        '分类不存在'
      ));
    }

    const color = normalizeHexColor(
      typeof body.color === 'string' ? body.color : oldCategory.color,
      getAutoCategoryColor(name)
    );
    const order = typeof body.order === 'number' ? body.order : oldCategory.order;
    const isActive = typeof body.isActive === 'boolean' ? body.isActive : oldCategory.isActive;
    const oldSlug = oldCategory.slug;
    const solutionRefs = oldSlug && oldSlug !== slug
      ? await loadSolutionRevalidationRefsByCategoryId(id)
      : [];

    await Category.findByIdAndUpdate(id, { name, slug, color, order, isActive });

    // Sync categoryName in all related solutions if name changed
    let categoryNameSynced = false;
    if (oldCategory.name !== name) {
      await Solution.updateMany(
        { categoryId: id },
        { $set: { categoryName: name } }
      );
      categoryNameSynced = true;
    }
    revalidateAdminRouteTree();
    revalidateCategoryRefs({ slug, previousSlug: oldSlug });
    if (solutionRefs.length > 0) {
      revalidateSolutionRefs(solutionRefs.map((ref) => ({
        id: ref.id,
        slug: ref.slug,
        categorySlug: slug,
        previousCategorySlug: oldSlug
      })));
    }

    return toAgentResponse(successResult(context, { id, name, slug, categoryNameSynced }));
  } catch (error) {
    console.error('Error updating category:', error);
    const resolvedError = resolveAgentDomainError(
      error instanceof Error ? error.message : '更新分类失败',
      { message: '更新分类失败' }
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const context = createAgentRequestContext(request);
  const authError = await requireAgentAuth(request, context);
  if (authError) {
    return toAgentResponse(authError);
  }

  try {
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return toAgentResponse(errorResult(
        context,
        404,
        AGENT_ERROR_CODES.categoryNotFound,
        '分类不存在'
      ));
    }

    await dbConnect();
    const category = await Category.findById(id);
    if (!category) {
      return toAgentResponse(errorResult(
        context,
        404,
        AGENT_ERROR_CODES.categoryNotFound,
        '分类不存在'
      ));
    }

    const solutionCount = await Solution.countDocuments({ categoryId: id, deletedAt: null });
    if (solutionCount > 0) {
      return toAgentResponse(errorResult(
        context,
        409,
        AGENT_ERROR_CODES.categoryNotEmpty,
        `该分类下存在 ${solutionCount} 个解决方案，无法直接删除。请先转移或删除相关方案。`
      ));
    }

    await Category.findByIdAndDelete(id);
    revalidateAdminRouteTree();
    revalidateCategoryRefs({ previousSlug: category.slug });

    return toAgentResponse(successResult(context, { id, deleted: true }));
  } catch (error) {
    console.error('Error deleting category:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '删除分类失败'
    ));
  }
}
