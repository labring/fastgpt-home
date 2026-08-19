import { NextResponse } from 'next/server';
import dbConnect from '@/customers/lib/db';
import { revalidateAdminRouteTree } from '@/customers/lib/admin-cache';
import { readJsonRecord } from '@/customers/lib/request-json';
import {
  getOrCreateVisitorKey,
  invalidSolutionIdResponse,
  isDuplicateKeyError,
  rateLimitPublicInteraction
} from '@/customers/lib/public-interaction';
import Solution from '@/customers/models/Solution';
import SolutionInteraction from '@/customers/models/SolutionInteraction';
import { resolveSolutionObjectId } from '@/customers/lib/solution-id';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = await resolveSolutionObjectId(rawId);
    if (!id) {
      return invalidSolutionIdResponse();
    }

    const rateLimitResponse = rateLimitPublicInteraction({
      request,
      action: 'vote',
      solutionId: id,
      limit: 10
    });
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await readJsonRecord(request);
    const { type } = body; // 'helpful' or 'unhelpful'

    if (type !== 'helpful' && type !== 'unhelpful') {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingSolution = await Solution.findOne({ _id: id, isPublished: true })
      .select('helpfulCount unhelpfulCount categoryId')
      .populate('categoryId', 'slug')
      .lean<{
        helpfulCount?: number;
        unhelpfulCount?: number;
        categoryId?: { slug?: string | null } | string | null;
      } | null>();
    if (!existingSolution) {
      return NextResponse.json(
        { error: 'Solution not found' },
        { status: 404 }
      );
    }

    const visitorKey = await getOrCreateVisitorKey();
    const voteInsert = await SolutionInteraction.findOneAndUpdate(
      { solutionId: id, visitorKey, type: 'vote' },
      {
        $setOnInsert: {
          solutionId: id,
          visitorKey,
          type: 'vote',
          votedType: type
        }
      },
      {
        upsert: true,
        returnDocument: 'before',
        setDefaultsOnInsert: true,
        includeResultMetadata: true
      }
    );
    const hasExistingVote = voteInsert.lastErrorObject?.updatedExisting === true;
    if (hasExistingVote) {
      return NextResponse.json({
        success: true,
        counted: false,
        votedType: voteInsert.value?.votedType || null,
        helpfulCount: existingSolution.helpfulCount || 0,
        unhelpfulCount: existingSolution.unhelpfulCount || 0
      });
    }

    const updateField = type === 'helpful' ? 'helpfulCount' : 'unhelpfulCount';

    const solution = await Solution.findOneAndUpdate(
      { _id: id, isPublished: true },
      { $inc: { [updateField]: 1 } },
      { returnDocument: 'after' }
    );

    if (!solution) {
      await SolutionInteraction.deleteOne({ solutionId: id, visitorKey, type: 'vote' });
      return NextResponse.json(
        { error: 'Solution not found' },
        { status: 404 }
      );
    }

    revalidateAdminRouteTree();

    return NextResponse.json({
      success: true,
      counted: true,
      votedType: type,
      helpfulCount: solution.helpfulCount,
      unhelpfulCount: solution.unhelpfulCount
    });
  } catch (error) {
    console.error('Error recording vote:', error);
    if (isDuplicateKeyError(error)) {
      const { id } = await params;
      const visitorKey = await getOrCreateVisitorKey();
      const [interaction, currentSolution] = await Promise.all([
        SolutionInteraction.findOne({ solutionId: id, visitorKey, type: 'vote' })
          .select('votedType')
          .lean<{ votedType?: 'helpful' | 'unhelpful' } | null>(),
        Solution.findById(id)
          .select('helpfulCount unhelpfulCount')
          .lean<{ helpfulCount?: number; unhelpfulCount?: number } | null>()
      ]);

      if (currentSolution) {
        return NextResponse.json({
          success: true,
          counted: false,
          votedType: interaction?.votedType || null,
          helpfulCount: currentSolution.helpfulCount || 0,
          unhelpfulCount: currentSolution.unhelpfulCount || 0
        });
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
