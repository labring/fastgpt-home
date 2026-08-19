'use server';

import dbConnect from '@/customers/lib/db';
import {
  buildDashboardTrend,
  type DashboardCategoryStat,
  type DashboardTopSolution
} from '@/customers/lib/dashboard-analytics';
import Solution from '@/customers/models/Solution';
import Category from '@/customers/models/Category';
import InteractionDailyStat from '@/customers/models/InteractionDailyStat';
import { requireAdminSession } from '@/customers/lib/admin-auth';

export async function getDashboardStats() {
  if (!(await requireAdminSession())) {
    return { success: false as const, error: '请先登录后台' };
  }

  await dbConnect();

  try {
    const [
      totalSolutions,
      totalCategories,
      publishedSolutions,
      draftSolutions,
      statsAggr,
      categoryStats,
      trendSnapshots
    ] = await Promise.all([
      Solution.countDocuments({ deletedAt: null }),
      Category.countDocuments(),
      Solution.countDocuments({ isPublished: true, deletedAt: null }),
      Solution.countDocuments({ isPublished: false, deletedAt: null }),
      Solution.aggregate([
        { $match: { deletedAt: null } },
        {
          $group: {
            _id: null,
            totalLikes: { $sum: '$likesCount' },
            totalUsage: { $sum: '$usageCount' }
          }
        }
      ]),
      Solution.aggregate([
        { $match: { deletedAt: null } },
        { $group: { _id: '$categoryId', count: { $sum: 1 } } },
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: '_id',
            as: 'category'
          }
        },
        { $unwind: '$category' },
        {
          $project: {
            name: '$category.name',
            count: 1
          }
        }
      ]),
      InteractionDailyStat.find({})
        .sort({ dateKey: -1 })
        .limit(30)
        .select('dateKey views likesDelta -_id')
        .lean()
    ]);

    const stats = statsAggr[0] || { totalLikes: 0, totalUsage: 0 };

    // 获取访问量 Top 5 解决方案
    const topSolutions = await Solution.find({ deletedAt: null })
      .sort({ usageCount: -1 })
      .limit(5)
      .select('title usageCount likesCount isPublished')
      .lean<DashboardTopSolution[]>();

    const trendStats = buildDashboardTrend(
      trendSnapshots as Array<{ dateKey: string; views?: number; likesDelta?: number }>
    );

    return {
      success: true,
      data: {
        totalSolutions,
        totalCategories,
        publishedSolutions,
        draftSolutions,
        totalLikes: stats.totalLikes,
        totalUsage: stats.totalUsage,
        topSolutions: JSON.parse(JSON.stringify(topSolutions)), // 避免 ObjectId 序列化问题
        categoryStats: JSON.parse(JSON.stringify(categoryStats as DashboardCategoryStat[])),
        trendStats
      }
    };
  } catch (error) {
    console.error('Failed to get dashboard stats:', error);
    return { success: false, error: '获取统计数据失败' };
  }
}
