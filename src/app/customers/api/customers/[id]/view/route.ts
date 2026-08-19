import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/customers/lib/db';
import { getDateKey } from '@/customers/lib/dashboard-analytics';
import { incrementDailyInteraction } from '@/customers/lib/interaction-daily-stats';
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
      action: 'view',
      solutionId: id,
      limit: 30
    });
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const existingSolution = await Solution.findOne({ _id: id, isPublished: true })
      .select('usageCount categoryId')
      .populate('categoryId', 'slug');
    if (!existingSolution) {
      return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
    }

    const solution = await Solution.findOneAndUpdate(
      { _id: id, isPublished: true },
      { $inc: { usageCount: 1 } },
      { returnDocument: 'after' }
    );

    if (!solution) {
      return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
    }

    const visitorKey = await getOrCreateVisitorKey();
    try {
      await SolutionInteraction.findOneAndUpdate(
        { solutionId: id, visitorKey, type: 'view' },
        {
          $set: { lastViewDateKey: getDateKey() },
          $setOnInsert: { solutionId: id, visitorKey, type: 'view' }
        },
        { upsert: true, setDefaultsOnInsert: true }
      );
    } catch (interactionError) {
      if (!isDuplicateKeyError(interactionError)) {
        throw interactionError;
      }
    }

    try {
      await incrementDailyInteraction('views');
    } catch (dailyStatsError) {
      console.error('Failed to update daily view stats:', dailyStatsError);
    }

    return NextResponse.json({
      success: true,
      counted: true,
      usage: solution.formattedUsageCount || solution.usageCount.toString(),
      rawUsageCount: solution.usageCount,
      hasViewed: true
    });
  } catch (error) {
    console.error('Error viewing solution:', error);
    return NextResponse.json({ error: 'Failed to update view' }, { status: 500 });
  }
}
