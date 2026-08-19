import Solution from '@/customers/models/Solution';
import { incrementDailyInteraction } from '@/customers/lib/interaction-daily-stats';
import { isValidObjectId } from '@/customers/lib/object-id';
import type { SolutionRevalidationRef } from '@/customers/lib/public-cache-invalidation';

export const SOLUTION_METRIC_FIELDS = ['views', 'likes'] as const;
export type SolutionMetricField = (typeof SOLUTION_METRIC_FIELDS)[number];

export type SolutionMetricsSnapshot = {
  id: string;
  title: string;
  views: number;
  likes: number;
  helpfulCount: number;
  unhelpfulCount: number;
};

type MetricSolutionRow = {
  _id: unknown;
  title: string;
  usageCount?: number | null;
  likesCount?: number | null;
  helpfulCount?: number | null;
  unhelpfulCount?: number | null;
  categoryId?: { slug?: string | null } | string | null;
};

type MetricUpdate = {
  views?: number;
  likes?: number;
};

type MetricUpdateOptions = {
  mode: 'increment' | 'set';
  reason?: string;
};

const SOLUTION_FIELD_BY_METRIC: Record<SolutionMetricField, 'usageCount' | 'likesCount'> = {
  views: 'usageCount',
  likes: 'likesCount',
};

export function isSolutionMetricField(value: unknown): value is SolutionMetricField {
  return typeof value === 'string' && SOLUTION_METRIC_FIELDS.includes(value as SolutionMetricField);
}

export function isIntegerMetricValue(value: unknown): value is number {
  return Number.isInteger(value) && Number.isFinite(value);
}

export function mapSolutionMetrics(solution: {
  _id: unknown;
  title: string;
  usageCount?: number | null;
  likesCount?: number | null;
  helpfulCount?: number | null;
  unhelpfulCount?: number | null;
}): SolutionMetricsSnapshot {
  return {
    id: String(solution._id),
    title: solution.title,
    views: solution.usageCount || 0,
    likes: solution.likesCount || 0,
    helpfulCount: solution.helpfulCount || 0,
    unhelpfulCount: solution.unhelpfulCount || 0,
  };
}

function getMetricSolutionCategorySlug(solution: MetricSolutionRow) {
  return typeof solution.categoryId === 'object' && solution.categoryId !== null
    ? solution.categoryId.slug || undefined
    : undefined;
}

function buildMetricInc(updates: MetricUpdate) {
  const inc: Record<string, number> = {};

  for (const metric of SOLUTION_METRIC_FIELDS) {
    const value = updates[metric];
    if (value !== undefined && value !== 0) {
      inc[SOLUTION_FIELD_BY_METRIC[metric]] = value;
    }
  }

  return inc;
}

function buildMetricSet(updates: MetricUpdate) {
  const set: Record<string, number> = {};

  for (const metric of SOLUTION_METRIC_FIELDS) {
    const value = updates[metric];
    if (value !== undefined) {
      set[SOLUTION_FIELD_BY_METRIC[metric]] = value;
    }
  }

  return set;
}

function clampNegativeDelta(value: number | undefined, currentValue: number) {
  if (value === undefined) {
    return undefined;
  }

  return value < 0 ? Math.max(value, -currentValue) : value;
}

export async function updateSolutionMetrics(
  id: string,
  updates: MetricUpdate,
  options: MetricUpdateOptions
) {
  if (!isValidObjectId(id)) {
    return null;
  }

  const current = await Solution.findById(id)
    .select('title usageCount likesCount helpfulCount unhelpfulCount categoryId')
    .populate('categoryId', 'slug')
    .lean<MetricSolutionRow | null>();

  if (!current) {
    return null;
  }

  const before = mapSolutionMetrics(current);
  const effectiveUpdates = options.mode === 'increment'
    ? {
        views: clampNegativeDelta(updates.views, before.views),
        likes: clampNegativeDelta(updates.likes, before.likes),
      }
    : updates;

  const update = options.mode === 'set'
    ? { $set: buildMetricSet(effectiveUpdates) }
    : { $inc: buildMetricInc(effectiveUpdates) };

  const hasUpdate = Object.values(update).some((fields) => Object.keys(fields).length > 0);
  const updated = hasUpdate
    ? await Solution.findByIdAndUpdate(id, update, { returnDocument: 'after' })
    .select('title usageCount likesCount helpfulCount unhelpfulCount categoryId')
    .populate('categoryId', 'slug')
    .lean<MetricSolutionRow | null>()
    : current;

  if (!updated) {
    return null;
  }

  const after = mapSolutionMetrics(updated);

  const viewsDelta = after.views - before.views;
  const likesDelta = after.likes - before.likes;
  await Promise.all([
    incrementDailyInteraction('views', viewsDelta),
    incrementDailyInteraction('likesDelta', likesDelta),
  ]);

  return {
    before,
    after,
    changed: {
      views: viewsDelta,
      likes: likesDelta,
    },
    mode: options.mode,
    reason: options.reason || null,
    revalidationRef: {
      id,
      categorySlug: getMetricSolutionCategorySlug(updated),
    } satisfies SolutionRevalidationRef,
  };
}
