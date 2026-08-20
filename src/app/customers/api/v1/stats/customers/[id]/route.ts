import { NextRequest } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Customer from '@/customers/models/Customer';
import {
  AGENT_ERROR_CODES,
  createAgentRequestContext,
  errorResult,
  requireAgentAuth,
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
        AGENT_ERROR_CODES.customerNotFound,
        '案例不存在'
      ));
    }

    await dbConnect();
    const customer = await Customer.findById(id)
      .select('title usageCount likesCount helpfulCount unhelpfulCount')
      .lean() as Record<string, unknown> | null;

    if (!customer) {
      return toAgentResponse(errorResult(
        context,
        404,
        AGENT_ERROR_CODES.customerNotFound,
        '案例不存在'
      ));
    }

    const helpfulCount = (customer.helpfulCount as number) || 0;
    const unhelpfulCount = (customer.unhelpfulCount as number) || 0;
    const totalVotes = helpfulCount + unhelpfulCount;
    const helpfulRate = totalVotes > 0 ? helpfulCount / totalVotes : 0;

    return toAgentResponse(successResult(context, {
        id: String(customer._id),
        title: customer.title,
        views: customer.usageCount,
        likes: customer.likesCount,
        helpfulCount,
        unhelpfulCount,
        helpfulRate: Math.round(helpfulRate * 100) / 100,
      }));
  } catch (error) {
    console.error('Error getting customer stats:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '获取统计数据失败'
    ));
  }
}
