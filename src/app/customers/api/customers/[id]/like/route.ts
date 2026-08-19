import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/customers/lib/db';
import { incrementDailyInteraction } from '@/customers/lib/interaction-daily-stats';
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
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = await resolveSolutionObjectId(rawId);

    if (!id) {
      return invalidSolutionIdResponse();
    }

    await dbConnect();

    const rateLimitResponse = rateLimitPublicInteraction({
      request,
      action: 'like',
      solutionId: id,
      limit: 20
    });
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await readJsonRecord(request);
    const action = body.action;
    if (action !== 'like') {
      return NextResponse.json({ error: 'Invalid like action' }, { status: 400 });
    }

    const currentSolution = await Solution.findOne({ _id: id, isPublished: true })
      .select('likesCount categoryId')
      .populate('categoryId', 'slug');
    if (!currentSolution) {
      return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
    }

    const visitorKey = await getOrCreateVisitorKey();
    const interaction = await SolutionInteraction.findOneAndUpdate(
      { solutionId: id, visitorKey, type: 'like' },
      {
        $set: { liked: true },
        $setOnInsert: { solutionId: id, visitorKey, type: 'like' }
      },
      {
        upsert: true,
        returnDocument: 'before',
        setDefaultsOnInsert: true,
        includeResultMetadata: true
      }
    );
    const alreadyLiked = interaction.lastErrorObject?.updatedExisting === true &&
      interaction.value?.liked === true;

    if (alreadyLiked) {
      return NextResponse.json({
        success: true,
        counted: false,
        likes: currentSolution.likesCount,
        isLiked: true
      });
    }

    const solution = await Solution.findOneAndUpdate(
      { _id: id, isPublished: true },
      { $inc: { likesCount: 1 } },
      { returnDocument: 'after' }
    );

    if (!solution) {
      await SolutionInteraction.deleteOne({ solutionId: id, visitorKey, type: 'like' });
      return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
    }

    await incrementDailyInteraction('likesDelta', 1);

    return NextResponse.json({
      success: true,
      counted: true,
      likes: solution.likesCount,
      isLiked: true
    });
  } catch (error) {
    console.error('Error liking solution:', error);
    if (isDuplicateKeyError(error)) {
      const { id } = await params;
      const currentSolution = await Solution.findById(id).select('likesCount');
      if (currentSolution) {
        return NextResponse.json({
          success: true,
          counted: false,
          likes: currentSolution.likesCount,
          isLiked: true
        });
      }
    }

    return NextResponse.json({ error: 'Failed to update like' }, { status: 500 });
  }
}
