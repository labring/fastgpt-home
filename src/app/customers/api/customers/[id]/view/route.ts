import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/customers/lib/db';
import { getDateKey } from '@/customers/lib/dashboard-analytics';
import { incrementDailyInteraction } from '@/customers/lib/interaction-daily-stats';
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
  try {
    const { id: rawId } = await params;
    const id = await resolveCustomerObjectId(rawId);

    if (!id) {
      return invalidCustomerIdResponse();
    }

    await dbConnect();

    const rateLimitResponse = rateLimitPublicInteraction({
      request,
      action: 'view',
      customerId: id,
      limit: 30
    });
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const existingCustomer = await Customer.findOne({ _id: id, isPublished: true })
      .select('usageCount categoryId')
      .populate('categoryId', 'slug');
    if (!existingCustomer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    const visitorKey = await getOrCreateVisitorKey();
    const dateKey = getDateKey();

    // 同一访客同一天只计一次浏览，防止刷新/脚本刷爆 usageCount（人气榜依据）。
    const existingView = await CustomerInteraction.findOne({
      customerId: id,
      visitorKey,
      type: 'view'
    })
      .select('lastViewDateKey')
      .lean<{ lastViewDateKey?: string | null } | null>();

    const alreadyCountedToday = existingView?.lastViewDateKey === dateKey;

    const customer = alreadyCountedToday
      ? existingCustomer
      : await Customer.findOneAndUpdate(
          { _id: id, isPublished: true },
          { $inc: { usageCount: 1 } },
          { returnDocument: 'after' }
        );

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    try {
      await CustomerInteraction.findOneAndUpdate(
        { customerId: id, visitorKey, type: 'view' },
        {
          $set: { lastViewDateKey: dateKey },
          $setOnInsert: { customerId: id, visitorKey, type: 'view' }
        },
        { upsert: true, setDefaultsOnInsert: true }
      );
    } catch (interactionError) {
      if (!isDuplicateKeyError(interactionError)) {
        throw interactionError;
      }
    }

    try {
      // 仅真实计数的浏览累加日统计，避免同日重复访问反复写入。
      if (!alreadyCountedToday) {
        await incrementDailyInteraction('views');
      }
    } catch (dailyStatsError) {
      console.error('Failed to update daily view stats:', dailyStatsError);
    }

    return NextResponse.json({
      success: true,
      counted: !alreadyCountedToday,
      usage: customer.formattedUsageCount || customer.usageCount.toString(),
      rawUsageCount: customer.usageCount,
      hasViewed: true
    });
  } catch (error) {
    console.error('Error viewing customer:', error);
    return NextResponse.json({ error: 'Failed to update view' }, { status: 500 });
  }
}
