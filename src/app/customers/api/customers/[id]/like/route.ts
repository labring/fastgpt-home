import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/customers/lib/db';
import { incrementDailyInteraction } from '@/customers/lib/interaction-daily-stats';
import { readJsonRecord } from '@/customers/lib/request-json';
import {
  getOrCreateVisitorKey,
  invalidCustomerIdResponse,
  isDuplicateKeyError,
  rateLimitPublicInteraction
} from '@/customers/lib/public-interaction';
import Customer from '@/customers/models/Customer';
import CustomerInteraction from '@/customers/models/CustomerInteraction';
import { resolveCustomerObjectId } from '@/customers/lib/customer-id';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;

  try {
    const id = await resolveCustomerObjectId(rawId);

    if (!id) {
      return invalidCustomerIdResponse();
    }

    await dbConnect();

    const rateLimitResponse = rateLimitPublicInteraction({
      request,
      action: 'like',
      customerId: id,
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

    const currentCustomer = await Customer.findOne({ _id: id, isPublished: true })
      .select('likesCount categoryId')
      .populate('categoryId', 'slug');
    if (!currentCustomer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const visitorKey = await getOrCreateVisitorKey();
    const interaction = await CustomerInteraction.findOneAndUpdate(
      { customerId: id, visitorKey, type: 'like' },
      {
        $set: { liked: true },
        $setOnInsert: { customerId: id, visitorKey, type: 'like' }
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
        likes: currentCustomer.likesCount,
        isLiked: true
      });
    }

    const customer = await Customer.findOneAndUpdate(
      { _id: id, isPublished: true },
      { $inc: { likesCount: 1 } },
      { returnDocument: 'after' }
    );

    if (!customer) {
      await CustomerInteraction.deleteOne({ customerId: id, visitorKey, type: 'like' });
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    await incrementDailyInteraction('likesDelta', 1);

    return NextResponse.json({
      success: true,
      counted: true,
      likes: customer.likesCount,
      isLiked: true
    });
  } catch (error) {
    console.error('Error liking customer:', error);
    if (isDuplicateKeyError(error)) {
      // rawId 可能是 slug，先解析为 ObjectId 再 findById，避免 CastError 导致降级分支失效。
      const resolvedId = await resolveCustomerObjectId(rawId);
      if (resolvedId) {
        const currentCustomer = await Customer.findById(resolvedId).select('likesCount');
        if (currentCustomer) {
          return NextResponse.json({
            success: true,
            counted: false,
            likes: currentCustomer.likesCount,
            isLiked: true
          });
        }
      }
    }

    return NextResponse.json({ error: 'Failed to update like' }, { status: 500 });
  }
}
