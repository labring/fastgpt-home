import dbConnect from '@/customers/lib/db';
import CtaClick from '@/customers/models/CtaClick';
import { CTA_SOURCES } from '@/customers/lib/cta-constants';
import { getRecentDateKeys, formatTrendLabel } from '@/customers/lib/dashboard-analytics';

export interface CtaDailyPoint {
  dateKey: string;
  label: string;
  count: number;
}

export interface CustomerPocRank {
  customerId: string;
  customerTitle: string;
  /** 总点击数 */
  count: number;
  /** "验证该方案" (customer_hero) */
  heroCount: number;
  /** "咨询 POC 路径" (customer_sidebar) */
  sidebarCount: number;
  /** "申请免费 POC" (customer_bottom) */
  bottomCount: number;
}

export interface CtaStatsData {
  /** 全量累计（不受 days 参数影响） */
  allTimeTotals: Record<string, number>;
  /** 近 N 天各 source 每日趋势（含补零） */
  dailyTrends: Record<string, CtaDailyPoint[]>;
  /** 近 N 天所有 source 汇总每日趋势 */
  overallTrend: CtaDailyPoint[];
  /** 方案级 POC 意向排名（按点击量降序，仅统计有 customerId 的记录） */
  customerRanking: CustomerPocRank[];
  /** 数据查询时间戳（ISO string），用于前端展示数据新鲜度 */
  fetchedAt: string;
}

interface AggregatedRow {
  _id: { source: string; dateKey: string };
  count: number;
}

export async function getCtaClickStats(days = 30): Promise<CtaStatsData> {
  await dbConnect();
  const safeDays = Math.min(90, Math.max(1, days));
  const fetchedAt = new Date().toISOString();

  const [aggregates, allTimeAggregates, customerAggregates] = await Promise.all([
    // 按 source + dateKey 分组计数（近 N 天用）
    CtaClick.aggregate([
      {
        $group: {
          _id: { source: '$source', dateKey: '$dateKey' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.dateKey': 1 } }
    ]) as Promise<AggregatedRow[]>,

    // 全量按 source 汇总（不受 days 限制）
    CtaClick.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 }
        }
      }
    ]) as Promise<Array<{ _id: string; count: number }>>,

    // 方案级 POC 意向排名（按 customerId + source 分组，再按 customerId 汇总，统计三种按钮各自点击）
    CtaClick.aggregate([
      {
        $match: {
          customerId: { $exists: true, $type: 'string', $ne: '' },
          source: { $in: ['customer_hero', 'customer_sidebar', 'customer_bottom'] }
        }
      },
      {
        $group: {
          _id: { customerId: '$customerId', source: '$source' },
          customerTitle: { $last: '$customerTitle' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.customerId',
          customerTitle: { $last: '$customerTitle' },
          sources: { $push: { source: '$_id.source', count: '$count' } },
          totalCount: { $sum: '$count' }
        }
      },
      { $sort: { totalCount: -1 } },
      { $limit: 10 }
    ]) as Promise<Array<{ _id: string; customerTitle: string | null; totalCount: number; sources: Array<{ source: string; count: number }> }>>
  ]);

  // 构建 source -> dateKey -> count 查找表
  const sourceDateMap: Record<string, Record<string, number>> = {};
  for (const source of CTA_SOURCES) {
    sourceDateMap[source] = {};
  }

  for (const item of aggregates) {
    const src = item._id.source;
    const dk = item._id.dateKey;
    if (sourceDateMap[src]) {
      sourceDateMap[src][dk] = item.count;
    }
  }

  // 全量 totals
  const allTimeTotals: Record<string, number> = {};
  for (const source of CTA_SOURCES) {
    allTimeTotals[source] = 0;
  }
  for (const item of allTimeAggregates) {
    if (allTimeTotals[item._id] !== undefined) {
      allTimeTotals[item._id] = item.count;
    }
  }

  // 近 N 天趋势计算（补零填充）
  const recentDateKeys = getRecentDateKeys(safeDays);
  const dailyTrends: Record<string, CtaDailyPoint[]> = {};
  const overallDateMap: Record<string, number> = {};

  for (const source of CTA_SOURCES) {
    const trend: CtaDailyPoint[] = [];
    for (const dateKey of recentDateKeys) {
      const count = sourceDateMap[source][dateKey] || 0;
      trend.push({ dateKey, label: formatTrendLabel(dateKey), count });
      overallDateMap[dateKey] = (overallDateMap[dateKey] || 0) + count;
    }
    dailyTrends[source] = trend;
  }

  const overallTrend: CtaDailyPoint[] = recentDateKeys.map((dateKey) => ({
    dateKey,
    label: formatTrendLabel(dateKey),
    count: overallDateMap[dateKey] || 0
  }));

  // 方案级排名（含三种按钮分项统计）
  const customerRanking: CustomerPocRank[] = customerAggregates.map((item) => {
    const srcMap: Record<string, number> = {};
    for (const s of item.sources) {
      srcMap[s.source] = s.count;
    }
    return {
      customerId: item._id,
      customerTitle: item.customerTitle || '未知方案',
      count: item.totalCount,
      heroCount: srcMap['customer_hero'] || 0,
      sidebarCount: srcMap['customer_sidebar'] || 0,
      bottomCount: srcMap['customer_bottom'] || 0
    };
  });

  return { allTimeTotals, dailyTrends, overallTrend, customerRanking, fetchedAt };
}
