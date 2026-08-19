import { NextRequest } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Solution from '@/customers/models/Solution';
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
        AGENT_ERROR_CODES.solutionNotFound,
        '案例不存在'
      ));
    }

    await dbConnect();
    const solution = await Solution.findById(id)
      .select('title usageCount likesCount helpfulCount unhelpfulCount')
      .lean() as Record<string, unknown> | null;

    if (!solution) {
      return toAgentResponse(errorResult(
        context,
        404,
        AGENT_ERROR_CODES.solutionNotFound,
        '案例不存在'
      ));
    }

    const helpfulCount = (solution.helpfulCount as number) || 0;
    const unhelpfulCount = (solution.unhelpfulCount as number) || 0;
    const totalVotes = helpfulCount + unhelpfulCount;
    const helpfulRate = totalVotes > 0 ? helpfulCount / totalVotes : 0;

    return toAgentResponse(successResult(context, {
        id: String(solution._id),
        title: solution.title,
        views: solution.usageCount,
        likes: solution.likesCount,
        helpfulCount,
        unhelpfulCount,
        helpfulRate: Math.round(helpfulRate * 100) / 100,
      }));
  } catch (error) {
    console.error('Error getting solution stats:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '获取统计数据失败'
    ));
  }
}
