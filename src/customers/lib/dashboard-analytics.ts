export const DASHBOARD_TREND_DAY_COUNT = 30;
export const DASHBOARD_TIME_ZONE = 'Asia/Shanghai';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export interface DashboardTopSolution {
  _id?: string;
  title: string;
  usageCount: number;
  likesCount: number;
  isPublished: boolean;
}

export interface DashboardCategoryStat {
  name: string;
  count: number;
}

export interface DashboardStatusStats {
  published: number;
  draft: number;
}

export interface DashboardTrendPoint {
  dateKey: string;
  label: string;
  views: number;
  likesDelta: number;
}

export interface DailyInteractionSnapshot {
  dateKey: string;
  views?: number;
  likesDelta?: number;
}

function getDateParts(date: Date, timeZone = DASHBOARD_TIME_ZONE) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find((part) => part.type === 'year')?.value ?? '0000';
  const month = parts.find((part) => part.type === 'month')?.value ?? '01';
  const day = parts.find((part) => part.type === 'day')?.value ?? '01';

  return { year, month, day };
}

export function getDateKey(date = new Date(), timeZone = DASHBOARD_TIME_ZONE) {
  const { year, month, day } = getDateParts(date, timeZone);
  return `${year}-${month}-${day}`;
}

export function formatTrendLabel(dateKey: string) {
  const [, month, day] = dateKey.split('-');
  return `${month}-${day}`;
}

export function getRecentDateKeys(
  dayCount = DASHBOARD_TREND_DAY_COUNT,
  now = new Date()
) {
  return Array.from({ length: dayCount }, (_, index) => {
    const offset = dayCount - index - 1;
    const date = new Date(now.getTime() - offset * DAY_IN_MS);
    return getDateKey(date);
  });
}

export function buildDashboardTrend(
  snapshots: DailyInteractionSnapshot[],
  dayCount = DASHBOARD_TREND_DAY_COUNT
): DashboardTrendPoint[] {
  const snapshotMap = new Map(
    snapshots.map((item) => [
      item.dateKey,
      {
        views: item.views ?? 0,
        likesDelta: item.likesDelta ?? 0
      }
    ])
  );

  return getRecentDateKeys(dayCount).map((dateKey) => {
    const snapshot = snapshotMap.get(dateKey);

    return {
      dateKey,
      label: formatTrendLabel(dateKey),
      views: snapshot?.views ?? 0,
      likesDelta: snapshot?.likesDelta ?? 0
    };
  });
}
