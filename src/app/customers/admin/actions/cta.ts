'use server';

import { getCtaClickStats } from '@/customers/lib/cta-analytics';
import { requireAdminSession } from '@/customers/lib/admin-auth';

export type { CtaDailyPoint, CtaStatsData } from '@/customers/lib/cta-analytics';

export async function getCtaStats(days = 30) {
  if (!(await requireAdminSession())) {
    return { success: false as const, error: '请先登录后台' };
  }

  try {
    const data = await getCtaClickStats(Math.min(90, Math.max(1, days)));

    return {
      success: true as const,
      data: JSON.parse(JSON.stringify(data)) as typeof data
    };
  } catch (error) {
    console.error('Failed to get CTA stats:', error);
    return { success: false as const, error: '获取 CTA 统计数据失败' };
  }
}
