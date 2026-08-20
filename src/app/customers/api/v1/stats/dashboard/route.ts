import { NextRequest } from 'next/server';
import dbConnect from '@/customers/lib/db';
import Customer from '@/customers/models/Customer';
import Category from '@/customers/models/Category';
import InteractionDailyStat from '@/customers/models/InteractionDailyStat';
import { buildDashboardTrend } from '@/customers/lib/dashboard-analytics';
import {
  AGENT_ERROR_CODES,
  createAgentRequestContext,
  errorResult,
  requireAgentAuth,
  successResult,
  toAgentResponse
} from '@/customers/lib/agent-api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const context = createAgentRequestContext(request);
  const authError = await requireAgentAuth(request, context);
  if (authError) {
    return toAgentResponse(authError);
  }

  try {
    await dbConnect();

    const trendDays = Math.min(90, Math.max(1, parseInt(request.nextUrl.searchParams.get('trendDays') || '30')));

    const [
      totalCustomers,
      totalCategories,
      publishedCount,
      draftCount,
      statsAggr,
      categoryStats,
      topCustomers,
      trendSnapshots,
    ] = await Promise.all([
      Customer.countDocuments({ deletedAt: null }),
      Category.countDocuments(),
      Customer.countDocuments({ isPublished: true, deletedAt: null }),
      Customer.countDocuments({ isPublished: false, deletedAt: null }),
      Customer.aggregate([
        { $match: { deletedAt: null } },
        { $group: { _id: null, totalLikes: { $sum: '$likesCount' }, totalViews: { $sum: '$usageCount' } } },
      ]),
      Customer.aggregate([
        { $match: { deletedAt: null } },
        { $group: { _id: '$categoryId', count: { $sum: 1 } } },
        { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
        { $unwind: '$category' },
        { $project: { name: '$category.name', count: 1 } },
      ]),
      Customer.find({ deletedAt: null })
        .sort({ usageCount: -1 })
        .limit(5)
        .select('title usageCount likesCount')
        .lean(),
      InteractionDailyStat.find({})
        .sort({ dateKey: -1 })
        .limit(trendDays)
        .select('dateKey views likesDelta -_id')
        .lean(),
    ]);

    const stats = statsAggr[0] || { totalLikes: 0, totalViews: 0 };

    const trendData = buildDashboardTrend(
      trendSnapshots as Array<{ dateKey: string; views?: number; likesDelta?: number }>,
      trendDays
    );

    return toAgentResponse(successResult(context, {
        totalCustomers,
        totalCategories,
        publishedCount,
        draftCount,
        totalLikes: stats.totalLikes,
        totalViews: stats.totalViews,
        recentTrends: {
          views: trendData.map((t) => ({ date: t.dateKey, count: t.views })),
          likes: trendData.map((t) => ({ date: t.dateKey, count: t.likesDelta })),
        },
        topCustomers: (topCustomers as unknown as Array<Record<string, unknown>>).map((s) => ({
          id: String(s._id || ''),
          title: s.title,
          views: s.usageCount,
          likes: s.likesCount,
        })),
        categoryDistribution: (categoryStats as Array<{ name: string; count: number }>).map((c) => ({
          name: c.name,
          count: c.count,
        })),
      }));
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    return toAgentResponse(errorResult(
      context,
      500,
      AGENT_ERROR_CODES.internalError,
      '获取统计数据失败'
    ));
  }
}
