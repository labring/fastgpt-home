import { NextResponse } from 'next/server';
import dbConnect from '@/customers/lib/db';
import { revalidateAdminRouteTree } from '@/customers/lib/admin-cache';
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
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = await resolveCustomerObjectId(rawId);
    if (!id) {
      return invalidCustomerIdResponse();
    }

    const rateLimitResponse = rateLimitPublicInteraction({
      request,
      action: 'vote',
      customerId: id,
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

    const existingCustomer = await Customer.findOne({ _id: id, isPublished: true })
      .select('helpfulCount unhelpfulCount categoryId')
      .populate('categoryId', 'slug')
      .lean<{
        helpfulCount?: number;
        unhelpfulCount?: number;
        categoryId?: { slug?: string | null } | string | null;
      } | null>();
    if (!existingCustomer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    const visitorKey = await getOrCreateVisitorKey();
    const voteInsert = await CustomerInteraction.findOneAndUpdate(
      { customerId: id, visitorKey, type: 'vote' },
      {
        $setOnInsert: {
          customerId: id,
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
        helpfulCount: existingCustomer.helpfulCount || 0,
        unhelpfulCount: existingCustomer.unhelpfulCount || 0
      });
    }

    const updateField = type === 'helpful' ? 'helpfulCount' : 'unhelpfulCount';

    const customer = await Customer.findOneAndUpdate(
      { _id: id, isPublished: true },
      { $inc: { [updateField]: 1 } },
      { returnDocument: 'after' }
    );

    if (!customer) {
      await CustomerInteraction.deleteOne({ customerId: id, visitorKey, type: 'vote' });
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    revalidateAdminRouteTree();

    return NextResponse.json({
      success: true,
      counted: true,
      votedType: type,
      helpfulCount: customer.helpfulCount,
      unhelpfulCount: customer.unhelpfulCount
    });
  } catch (error) {
    console.error('Error recording vote:', error);
    if (isDuplicateKeyError(error)) {
      // rawId 可能是 slug，先解析为 ObjectId 再查询，避免 CastError 导致降级分支失效。
      const { id: rawId } = await params;
      const resolvedId = await resolveCustomerObjectId(rawId);
      if (resolvedId) {
        const visitorKey = await getOrCreateVisitorKey();
        const [interaction, currentCustomer] = await Promise.all([
          CustomerInteraction.findOne({ customerId: resolvedId, visitorKey, type: 'vote' })
            .select('votedType')
            .lean<{ votedType?: 'helpful' | 'unhelpful' } | null>(),
          Customer.findById(resolvedId)
            .select('helpfulCount unhelpfulCount')
            .lean<{ helpfulCount?: number; unhelpfulCount?: number } | null>()
        ]);

        if (currentCustomer) {
          return NextResponse.json({
            success: true,
            counted: false,
            votedType: interaction?.votedType || null,
            helpfulCount: currentCustomer.helpfulCount || 0,
            unhelpfulCount: currentCustomer.unhelpfulCount || 0
          });
        }
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
