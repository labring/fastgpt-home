import { NextRequest } from 'next/server';
import type { SortOrder } from 'mongoose';
import dbConnect from '@/customers/lib/db';
import Solution from '@/customers/models/Solution';
import Category from '@/customers/models/Category';
import {
  createSkeletonSolutionForAgent,
  saveSolutionForAgent
} from '@/customers/lib/solution-admin-service';
import { getAutoCategoryColor, normalizeHexColor } from '@/customers/lib/category-color';
import { ensureCategorySlugs } from '@/customers/lib/category-slug';
import {
  AGENT_ERROR_CODES,
  createAgentRequestContext,
  errorResult,
  getOptionalTrimmedString,
  getTrimmedString,
  isRecord,
  readJsonBody,
  requireAgentAuth,
  resolveAgentDomainError,
  successResult,
  toAgentResponse
} from '@/customers/lib/agent-api';
import { runAgentIdempotentOperation } from '@/customers/lib/agent-idempotency';
import { isValidObjectId } from '@/customers/lib/object-id';

export const dynamic = 'force-dynamic';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;
const TITLE_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 500;
const DEFAULT_IMAGE_URL = '/fastgpt.svg';

type SolutionStatus = 'published' | 'draft' | 'deleted';

type PopulatedCategory = {
  _id?: unknown;
  name?: string | null;
  slug?: string | null;
  color?: string | null;
};

type SolutionListRow = {
  _id: unknown;
  categoryId: string | PopulatedCategory | null;
  categoryName?: string | null;
  slug?: string | null;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl?: string | null;
  freeUseUrl?: string | null;
  likesCount: number;
  usageCount: number;
  helpfulCount?: number | null;
  unhelpfulCount?: number | null;
  isPublished: boolean;
  deletedAt?: Date | null;
  deletedSource?: 'admin' | 'agent' | null;
  createdAt: Date;
  updatedAt: Date;
};

type CreateSolutionPayload = {
  title: string;
  description: string;
  slug?: string;
  categoryId: string;
  content: string;
  imageUrl: string;
  thumbnailUrl: string;
  freeUseUrl?: string;
  isPublished: boolean;
};

function parsePositiveInteger(value: string | null, fallback: number, max?: number) {
  const parsedValue = Number.parseInt(value ?? '', 10);
  if (Number.isNaN(parsedValue) || parsedValue < 1) {
    return fallback;
  }

  return max ? Math.min(parsedValue, max) : parsedValue;
}

function parseStatus(value: string | null): SolutionStatus {
  return value === 'draft' || value === 'deleted' ? value : 'published';
}

function parseCreateSolutionPayload(body: unknown):
  | { success: true; data: CreateSolutionPayload }
  | { success: false; error: string } {
  if (!isRecord(body)) {
    return { success: false, error: '请求体必须是 JSON 对象' };
  }

  const title = getTrimmedString(body.title);
  const description = getTrimmedString(body.description);
  const categoryId = getTrimmedString(body.categoryId);
  const content = getTrimmedString(body.content);
  const missingFields = [
    !title ? 'title' : null,
    !description ? 'description' : null,
    !categoryId ? 'categoryId' : null,
    !content ? 'content' : null,
  ].filter((field): field is string => Boolean(field));

  if (missingFields.length > 0) {
    return { success: false, error: `缺少必填字段: ${missingFields.join(', ')}` };
  }

  if (title.length > TITLE_MAX_LENGTH) {
    return { success: false, error: `标题长度不能超过 ${TITLE_MAX_LENGTH} 字符` };
  }

  if (description.length > DESCRIPTION_MAX_LENGTH) {
    return { success: false, error: `描述长度不能超过 ${DESCRIPTION_MAX_LENGTH} 字符` };
  }

  const imageUrl = getTrimmedString(body.imageUrl) || DEFAULT_IMAGE_URL;
  const thumbnailUrl = getTrimmedString(body.thumbnailUrl) || imageUrl;
  const freeUseUrl = getOptionalTrimmedString(body.freeUseUrl);

  return {
    success: true,
    data: {
      title,
      description,
      slug: getOptionalTrimmedString(body.slug),
      categoryId,
      content,
      imageUrl,
      thumbnailUrl,
      freeUseUrl,
      isPublished: body.isPublished === true,
    },
  };
}

function isPopulatedCategory(value: SolutionListRow['categoryId']): value is PopulatedCategory {
  return typeof value === 'object' && value !== null;
}

function getCategoryDisplayInfo(solution: SolutionListRow) {
  const populatedCategory = isPopulatedCategory(solution.categoryId) ? solution.categoryId : null;
  const categoryName = populatedCategory?.name || solution.categoryName || '未知分类';

  return {
    categoryId: populatedCategory?._id
      ? String(populatedCategory._id)
      : String(solution.categoryId || ''),
    categoryName,
    categorySlug: populatedCategory?.slug || '',
    categoryColor: normalizeHexColor(
      populatedCategory?.color,
      getAutoCategoryColor(categoryName)
    ),
  };
}

export async function GET(request: NextRequest) {
  const context = createAgentRequestContext(request);
  const authError = await requireAgentAuth(request, context);
  if (authError) {
    return toAgentResponse(authError);
  }

  try {
    await dbConnect();
    await ensureCategorySlugs();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const status = parseStatus(searchParams.get('status'));
    const page = parsePositiveInteger(searchParams.get('page'), DEFAULT_PAGE);
    const limit = parsePositiveInteger(searchParams.get('limit'), DEFAULT_LIMIT, MAX_LIMIT);
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};

    if (status === 'deleted') {
      query.deletedAt = { $ne: null };
    } else if (status === 'draft') {
      query.deletedAt = null;
      query.isPublished = false;
    } else {
      query.deletedAt = null;
      query.isPublished = true;
    }

    if (category && category !== 'all') {
      const matchedCategory = await Category.findOne({ slug: category }).select('_id');
      query.categoryId = matchedCategory?._id || null;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const sortOptions: Record<string, SortOrder | { $meta: 'textScore' }> = search
      ? { score: { $meta: 'textScore' } }
      : { createdAt: -1 };

    const [solutions, total] = await Promise.all([
      Solution.find(query, search ? { score: { $meta: 'textScore' } } : {})
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .select('-content -mediaUrls')
        .populate('categoryId', 'name slug color')
        .lean<SolutionListRow[]>({ virtuals: true }),
      Solution.countDocuments(query),
    ]);

    return toAgentResponse(successResult(context, {
      items: solutions.map((s) => ({
        id: String(s._id || ''),
        ...getCategoryDisplayInfo(s),
        slug: s.slug || '',
        title: s.title,
        description: s.description,
        imageUrl: s.imageUrl,
        thumbnailUrl: s.thumbnailUrl || s.imageUrl,
        freeUseUrl: s.freeUseUrl || '',
        likesCount: s.likesCount,
        usageCount: s.usageCount,
        helpfulCount: s.helpfulCount || 0,
        unhelpfulCount: s.unhelpfulCount || 0,
        isPublished: s.isPublished,
        deletedAt: s.deletedAt || null,
        deletedSource: s.deletedSource || null,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }));
  } catch (error) {
    console.error('Error fetching solutions:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '获取解决方案列表失败'
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
    const result = await runAgentIdempotentOperation(request, context, async () => {
      const requestBody = await readJsonBody(request, context);
      if (!requestBody.success) {
        return requestBody.result;
      }

      const parsedPayload = parseCreateSolutionPayload(requestBody.data);
      if (!parsedPayload.success) {
        return errorResult(
          context,
          400,
          AGENT_ERROR_CODES.validationError,
          parsedPayload.error
        );
      }

      const payload = parsedPayload.data;
      if (!isValidObjectId(payload.categoryId)) {
        return errorResult(
          context,
          404,
          AGENT_ERROR_CODES.categoryNotFound,
          '无效的分类'
        );
      }

      const result = await createSkeletonSolutionForAgent();
      if (!result.success || !result.id) {
        const resolvedError = resolveAgentDomainError(
          result.error || '创建失败',
          { message: '创建解决方案失败' }
        );

        return errorResult(
          context,
          resolvedError.status,
          resolvedError.code,
          resolvedError.message,
          resolvedError.details
        );
      }

      const saveResult = await saveSolutionForAgent({
        id: result.id,
        title: payload.title,
        description: payload.description,
        slug: payload.slug,
        categoryId: payload.categoryId,
        content: payload.content,
        imageUrl: payload.imageUrl,
        thumbnailUrl: payload.thumbnailUrl,
        freeUseUrl: payload.freeUseUrl,
        isPublished: payload.isPublished,
      });

      if (!saveResult.success) {
        const resolvedError = resolveAgentDomainError(
          saveResult.error || '保存失败',
          { message: '创建解决方案失败' }
        );

        return errorResult(
          context,
          resolvedError.status,
          resolvedError.code,
          resolvedError.message,
          resolvedError.details
        );
      }

      return successResult(context, {
        id: result.id,
        storageFolder: result.id,
        title: payload.title,
      }, 201);
    });

    return toAgentResponse(result);
  } catch (error) {
    console.error('Error creating solution:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '创建解决方案失败'
    ));
  }
}
