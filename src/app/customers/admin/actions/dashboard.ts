'use server';

import dbConnect from '@/customers/lib/db';
import {
  buildDashboardTrend,
  type DashboardCategoryStat,
  type DashboardTopCustomer
} from '@/customers/lib/dashboard-analytics';
import Customer from '@/customers/models/Customer';
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
      totalCustomers,
      totalCategories,
      publishedCustomers,
      draftCustomers,
      statsAggr,
      categoryStats,
      trendSnapshots
    ] = await Promise.all([
      Customer.countDocuments({ deletedAt: null }),
      Category.countDocuments(),
      Customer.countDocuments({ isPublished: true, deletedAt: null }),
      Customer.countDocuments({ isPublished: false, deletedAt: null }),
      Customer.aggregate([
        { $match: { deletedAt: null } },
        {
          $group: {
            _id: null,
            totalLikes: { $sum: '$likesCount' },
            totalUsage: { $sum: '$usageCount' }
          }
        }
      ]),
      Customer.aggregate([
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
    const topCustomers = await Customer.find({ deletedAt: null })
      .sort({ usageCount: -1 })
      .limit(5)
      .select('title usageCount likesCount isPublished')
      .lean<DashboardTopCustomer[]>();

    const trendStats = buildDashboardTrend(
      trendSnapshots as Array<{ dateKey: string; views?: number; likesDelta?: number }>
    );

    return {
      success: true,
      data: {
        totalCustomers,
        totalCategories,
        publishedCustomers,
        draftCustomers,
        totalLikes: stats.totalLikes,
        totalUsage: stats.totalUsage,
        topCustomers: JSON.parse(JSON.stringify(topCustomers)), // 避免 ObjectId 序列化问题
        categoryStats: JSON.parse(JSON.stringify(categoryStats as DashboardCategoryStat[])),
        trendStats
      }
    };
  } catch (error) {
    console.error('Failed to get dashboard stats:', error);
    return { success: false, error: '获取统计数据失败' };
  }
}
