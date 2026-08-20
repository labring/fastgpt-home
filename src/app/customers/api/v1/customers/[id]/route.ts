import { NextRequest } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Customer from '@/customers/models/Customer';
import { getAutoCategoryColor, normalizeHexColor } from '@/customers/lib/category-color';
import {
  saveCustomerForAgent,
  type SaveCustomerInput
} from '@/customers/lib/customer-admin-service';
import { moveCustomerToTrash } from '@/customers/lib/customer-trash';
import { ensureCategorySlugs } from '@/customers/lib/category-slug';
import {
  AGENT_ERROR_CODES,
  createAgentRequestContext,
  errorResult,
  getOptionalTrimmedString,
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

const TITLE_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 500;

type PopulatedCategory = {
  _id?: unknown;
  name?: string | null;
  slug?: string | null;
  color?: string | null;
};

type CustomerDetailRow = {
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
  content: string;
  mediaUrls?: string[] | null;
  storageFolder: string;
  isPublished: boolean;
  deletedAt?: Date | null;
  deletedSource?: 'admin' | 'agent' | null;
  createdAt: Date;
  updatedAt: Date;
};

type PutCustomerPayload = {
  title: string;
  description: string;
  slug?: string;
  categoryId: string;
  content: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  freeUseUrl?: string;
  isPublished?: boolean;
  newlyUploadedUrls: string[];
};

type PatchCustomerPayload = {
  title?: string;
  description?: string;
  slug?: string;
  categoryId?: string;
  content?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  freeUseUrl?: string;
  isPublished?: boolean;
  newlyUploadedUrls: string[];
};

function getRequiredTrimmedString(value: unknown) {
  return getOptionalTrimmedString(value) || '';
}

function getStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string');
}

function validateTitle(title: string | undefined) {
  if (title !== undefined && title.length > TITLE_MAX_LENGTH) {
    return `标题长度不能超过 ${TITLE_MAX_LENGTH} 字符`;
  }
}

function validateDescription(description: string | undefined) {
  if (description !== undefined && description.length > DESCRIPTION_MAX_LENGTH) {
    return `描述长度不能超过 ${DESCRIPTION_MAX_LENGTH} 字符`;
  }
}

function parsePutCustomerPayload(body: unknown):
  | { success: true; data: PutCustomerPayload }
  | { success: false; error: string } {
  if (!isRecord(body)) {
    return { success: false, error: '请求体必须是 JSON 对象' };
  }

  const title = getRequiredTrimmedString(body.title);
  const description = getRequiredTrimmedString(body.description);
  const categoryId = getRequiredTrimmedString(body.categoryId);
  const content = getRequiredTrimmedString(body.content);
  const missingFields = [
    !title ? 'title' : null,
    !description ? 'description' : null,
    !categoryId ? 'categoryId' : null,
    !content ? 'content' : null,
  ].filter((field): field is string => Boolean(field));

  if (missingFields.length > 0) {
    return { success: false, error: `缺少必填字段: ${missingFields.join(', ')}` };
  }

  const titleError = validateTitle(title);
  if (titleError) {
    return { success: false, error: titleError };
  }

  const descriptionError = validateDescription(description);
  if (descriptionError) {
    return { success: false, error: descriptionError };
  }

  return {
    success: true,
    data: {
      title,
      description,
      slug: getOptionalTrimmedString(body.slug),
      categoryId,
      content,
      imageUrl: getOptionalTrimmedString(body.imageUrl),
      thumbnailUrl: getOptionalTrimmedString(body.thumbnailUrl),
      freeUseUrl: getOptionalTrimmedString(body.freeUseUrl),
      isPublished: typeof body.isPublished === 'boolean' ? body.isPublished : undefined,
      newlyUploadedUrls: getStringArray(body.newlyUploadedUrls),
    },
  };
}

function parsePatchCustomerPayload(body: unknown):
  | { success: true; data: PatchCustomerPayload }
  | { success: false; error: string } {
  if (!isRecord(body)) {
    return { success: false, error: '请求体必须是 JSON 对象' };
  }

  const title = getOptionalTrimmedString(body.title);
  const description = getOptionalTrimmedString(body.description);
  const titleError = validateTitle(title);
  if (titleError) {
    return { success: false, error: titleError };
  }

  const descriptionError = validateDescription(description);
  if (descriptionError) {
    return { success: false, error: descriptionError };
  }

  return {
    success: true,
    data: {
      title,
      description,
      slug: getOptionalTrimmedString(body.slug),
      categoryId: getOptionalTrimmedString(body.categoryId),
      content: getOptionalTrimmedString(body.content),
      imageUrl: getOptionalTrimmedString(body.imageUrl),
      thumbnailUrl: getOptionalTrimmedString(body.thumbnailUrl),
      freeUseUrl: getOptionalTrimmedString(body.freeUseUrl),
      isPublished: typeof body.isPublished === 'boolean' ? body.isPublished : undefined,
      newlyUploadedUrls: getStringArray(body.newlyUploadedUrls),
    },
  };
}

function isPopulatedCategory(value: CustomerDetailRow['categoryId']): value is PopulatedCategory {
  return typeof value === 'object' && value !== null;
}

function getCategoryDisplayInfo(customer: CustomerDetailRow) {
  const populatedCategory = isPopulatedCategory(customer.categoryId) ? customer.categoryId : null;
  const categoryName = populatedCategory?.name || customer.categoryName || '未知分类';

  return {
    categoryId: populatedCategory?._id
      ? String(populatedCategory._id)
      : String(customer.categoryId || ''),
    categoryName,
    categorySlug: populatedCategory?.slug || '',
    categoryColor: normalizeHexColor(
      populatedCategory?.color,
      getAutoCategoryColor(categoryName)
    ),
  };
}

function mapCustomerDetail(customer: CustomerDetailRow) {
  return {
    id: String(customer._id || ''),
    ...getCategoryDisplayInfo(customer),
    slug: customer.slug || '',
    title: customer.title,
    description: customer.description,
    imageUrl: customer.imageUrl,
    thumbnailUrl: customer.thumbnailUrl || customer.imageUrl,
    freeUseUrl: customer.freeUseUrl || '',
    likesCount: customer.likesCount,
    usageCount: customer.usageCount,
    helpfulCount: customer.helpfulCount || 0,
    unhelpfulCount: customer.unhelpfulCount || 0,
    content: customer.content,
    mediaUrls: customer.mediaUrls || [],
    storageFolder: customer.storageFolder,
    isPublished: customer.isPublished,
    deletedAt: customer.deletedAt || null,
    deletedSource: customer.deletedSource || null,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
  };
}

function buildPatchSaveInput(
  id: string,
  existingCustomer: {
    title: string;
    description: string;
    slug?: string | null;
    categoryId: unknown;
    content: string;
    imageUrl: string;
    thumbnailUrl?: string | null;
    freeUseUrl?: string | null;
    isPublished: boolean;
  },
  payload: PatchCustomerPayload
): SaveCustomerInput {
  return {
    id,
    title: payload.title ?? existingCustomer.title,
    description: payload.description ?? existingCustomer.description,
    slug: payload.slug ?? existingCustomer.slug ?? undefined,
    categoryId: payload.categoryId ?? String(existingCustomer.categoryId),
    content: payload.content ?? existingCustomer.content,
    imageUrl: payload.imageUrl ?? existingCustomer.imageUrl,
    thumbnailUrl: payload.thumbnailUrl ?? existingCustomer.thumbnailUrl ?? existingCustomer.imageUrl,
    freeUseUrl: payload.freeUseUrl ?? existingCustomer.freeUseUrl ?? '',
    isPublished: payload.isPublished ?? existingCustomer.isPublished,
    newlyUploadedUrls: payload.newlyUploadedUrls,
  };
}

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
    await dbConnect();
    await ensureCategorySlugs();
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return toAgentResponse(errorResult(
        context,
        404,
        AGENT_ERROR_CODES.customerNotFound,
        '案例不存在'
      ));
    }

    // 绕过 pre-find 中间件以获取任意状态的文档
    const customer = await Customer.findOne({ _id: id, deletedAt: { $exists: true } })
      .populate('categoryId', 'name slug color')
      .lean<CustomerDetailRow | null>({ virtuals: true });

    if (!customer) {
      return toAgentResponse(errorResult(
        context,
        404,
        AGENT_ERROR_CODES.customerNotFound,
        '案例不存在'
      ));
    }

    return toAgentResponse(successResult(context, mapCustomerDetail(customer)));
  } catch (error) {
    console.error('Error getting customer:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '获取解决方案详情失败'
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
    await dbConnect();
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return toAgentResponse(errorResult(
        context,
        404,
        AGENT_ERROR_CODES.customerNotFound,
        '案例不存在'
      ));
    }

    const requestBody = await readJsonBody(request, context);
    if (!requestBody.success) {
      return toAgentResponse(requestBody.result);
    }

    const parsedPayload = parsePutCustomerPayload(requestBody.data);
    if (!parsedPayload.success) {
      return toAgentResponse(errorResult(
        context,
        400,
        AGENT_ERROR_CODES.validationError,
        parsedPayload.error
      ));
    }

    const payload = parsedPayload.data;

    const result = await saveCustomerForAgent({
      id,
      title: payload.title,
      description: payload.description,
      slug: payload.slug,
      categoryId: payload.categoryId,
      content: payload.content,
      imageUrl: payload.imageUrl,
      thumbnailUrl: payload.thumbnailUrl,
      freeUseUrl: payload.freeUseUrl,
      isPublished: payload.isPublished,
      newlyUploadedUrls: payload.newlyUploadedUrls,
    });

    if (!result.success) {
      const resolvedError = resolveAgentDomainError(
        result.error || '更新失败',
        { message: '更新解决方案失败' }
      );

      return toAgentResponse(errorResult(
        context,
        resolvedError.status,
        resolvedError.code,
        resolvedError.message,
        resolvedError.details
      ));
    }

    return toAgentResponse(successResult(context, { id }));
  } catch (error) {
    console.error('Error updating customer:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '更新解决方案失败'
    ));
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const context = createAgentRequestContext(request);
  const authError = await requireAgentAuth(request, context);
  if (authError) {
    return toAgentResponse(authError);
  }

  try {
    const result = await runAgentIdempotentOperation(request, context, async () => {
      await dbConnect();
      const { id } = await params;
      if (!isValidObjectId(id)) {
        return errorResult(
          context,
          404,
          AGENT_ERROR_CODES.customerNotFound,
          '案例不存在'
        );
      }

      const requestBody = await readJsonBody(request, context);
      if (!requestBody.success) {
        return requestBody.result;
      }

      const parsedPayload = parsePatchCustomerPayload(requestBody.data);
      if (!parsedPayload.success) {
        return errorResult(
          context,
          400,
          AGENT_ERROR_CODES.validationError,
          parsedPayload.error
        );
      }

      const payload = parsedPayload.data;

      const existingCustomer = await Customer.findOne({ _id: id, deletedAt: { $exists: true } });
      if (!existingCustomer) {
        return errorResult(
          context,
          404,
          AGENT_ERROR_CODES.customerNotFound,
          '案例不存在'
        );
      }

      const saveResult = await saveCustomerForAgent(buildPatchSaveInput(id, existingCustomer, payload));

      if (!saveResult.success) {
        const resolvedError = resolveAgentDomainError(
          saveResult.error || '更新失败',
          { message: '部分更新失败' }
        );

        return errorResult(
          context,
          resolvedError.status,
          resolvedError.code,
          resolvedError.message,
          resolvedError.details
        );
      }

      return successResult(context, { id });
    });

    return toAgentResponse(result);
  } catch (error) {
    console.error('Error patching customer:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '部分更新失败'
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
    await dbConnect();
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return toAgentResponse(errorResult(
        context,
        404,
        AGENT_ERROR_CODES.customerNotFound,
        '案例不存在'
      ));
    }

    const result = await moveCustomerToTrash(id, 'agent');
    if (!result.success) {
      const resolvedError = resolveAgentDomainError(
        result.error || '删除失败',
        { message: '删除失败' }
      );

      return toAgentResponse(errorResult(
        context,
        resolvedError.status,
        resolvedError.code,
        resolvedError.message,
        resolvedError.details
      ));
    }

    return toAgentResponse(successResult(context, { id, deleted: true, mode: 'trash' as const }));
  } catch (error) {
    console.error('Error deleting customer:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '删除失败'
    ));
  }
}
