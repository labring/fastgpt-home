import { NextRequest } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Customer from '@/customers/models/Customer';
import { generateCustomerCover } from '@/customers/lib/customer-cover';
import { saveCustomerForAgent } from '@/customers/lib/customer-admin-service';
import {
  AGENT_ERROR_CODES,
  createAgentRequestContext,
  errorResult,
  requireAgentAuth,
  resolveAgentDomainError,
  successResult,
  toAgentResponse
} from '@/customers/lib/agent-api';
import { isValidObjectId } from '@/customers/lib/object-id';

export const dynamic = 'force-dynamic';

type CustomerCoverDocument = {
  _id: unknown;
  title?: string | null;
  description?: string | null;
  content?: string | null;
  imageUrl?: string | null;
  categoryId?: unknown;
  isPublished?: boolean;
  storageFolder?: string | null;
};

export async function POST(
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
        AGENT_ERROR_CODES.customerNotFound,
        '案例不存在'
      ));
    }

    await dbConnect();
    // 允许对任意状态的文章生成封面，便于 AI 在草稿或已删除核查场景中复用同一接口。
    const customer = await Customer.findOne({ _id: id, deletedAt: { $exists: true } })
      .lean<CustomerCoverDocument | null>();

    if (!customer) {
      return toAgentResponse(errorResult(
        context,
        404,
        AGENT_ERROR_CODES.customerNotFound,
        '案例不存在'
      ));
    }

    const storageFolder = String(customer.storageFolder || id).trim();
    const coverResult = await generateCustomerCover({
      title: customer.title || '',
      description: customer.description || '',
      content: customer.content || '',
      storageFolder
    });

    const saveResult = await saveCustomerForAgent({
      id,
      title: String(customer.title || ''),
      description: String(customer.description || ''),
      categoryId: String(customer.categoryId || ''),
      content: String(customer.content || ''),
      imageUrl: coverResult.imageUrl,
      thumbnailUrl: coverResult.thumbnailUrl,
      isPublished: customer.isPublished === true
    });

    if (!saveResult.success) {
      const resolvedError = resolveAgentDomainError(
        saveResult.error || '封面写回失败',
        { message: '封面写回失败' }
      );

      return toAgentResponse(errorResult(
        context,
        resolvedError.status,
        resolvedError.code,
        resolvedError.message,
        resolvedError.details
      ));
    }

    return toAgentResponse(successResult(context, {
      id,
      imageUrl: coverResult.imageUrl,
      thumbnailUrl: coverResult.thumbnailUrl,
      query: coverResult.query,
      reason: coverResult.reason,
      source: coverResult.source
    }));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'AI 匹配封面失败';
    const code =
      message === '请先填写标题、描述或正文内容'
        ? AGENT_ERROR_CODES.validationError
        : message === '没有找到合适的横向封面图，请补充更具体的标题或描述'
          ? AGENT_ERROR_CODES.customerNotFound
          : AGENT_ERROR_CODES.internalError;
    const status =
      message === '请先填写标题、描述或正文内容'
        ? 400
        : message === '没有找到合适的横向封面图，请补充更具体的标题或描述'
          ? 404
          : 500;

    console.error('Agent customer cover generation error:', error);
    return toAgentResponse(errorResult(context, status, code, message));
  }
}
