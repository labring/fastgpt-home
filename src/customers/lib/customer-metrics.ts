import Customer from '@/customers/models/Customer';
import { incrementDailyInteraction } from '@/customers/lib/interaction-daily-stats';
import { isValidObjectId } from '@/customers/lib/object-id';
import type { CustomerRevalidationRef } from '@/customers/lib/public-cache-invalidation';

export const CUSTOMER_METRIC_FIELDS = ['views', 'likes'] as const;
export type CustomerMetricField = (typeof CUSTOMER_METRIC_FIELDS)[number];

export type CustomerMetricsSnapshot = {
  id: string;
  title: string;
  views: number;
  likes: number;
  helpfulCount: number;
  unhelpfulCount: number;
};

type MetricCustomerRow = {
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

const CUSTOMER_FIELD_BY_METRIC: Record<CustomerMetricField, 'usageCount' | 'likesCount'> = {
  views: 'usageCount',
  likes: 'likesCount',
};

export function isIntegerMetricValue(value: unknown): value is number {
  return Number.isInteger(value) && Number.isFinite(value);
}

export function mapCustomerMetrics(customer: {
  _id: unknown;
  title: string;
  usageCount?: number | null;
  likesCount?: number | null;
  helpfulCount?: number | null;
  unhelpfulCount?: number | null;
}): CustomerMetricsSnapshot {
  return {
    id: String(customer._id),
    title: customer.title,
    views: customer.usageCount || 0,
    likes: customer.likesCount || 0,
    helpfulCount: customer.helpfulCount || 0,
    unhelpfulCount: customer.unhelpfulCount || 0,
  };
}

function getMetricCustomerCategorySlug(customer: MetricCustomerRow) {
  return typeof customer.categoryId === 'object' && customer.categoryId !== null
    ? customer.categoryId.slug || undefined
    : undefined;
}

function buildMetricInc(updates: MetricUpdate) {
  const inc: Record<string, number> = {};

  for (const metric of CUSTOMER_METRIC_FIELDS) {
    const value = updates[metric];
    if (value !== undefined && value !== 0) {
      inc[CUSTOMER_FIELD_BY_METRIC[metric]] = value;
    }
  }

  return inc;
}

function buildMetricSet(updates: MetricUpdate) {
  const set: Record<string, number> = {};

  for (const metric of CUSTOMER_METRIC_FIELDS) {
    const value = updates[metric];
    if (value !== undefined) {
      set[CUSTOMER_FIELD_BY_METRIC[metric]] = value;
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

export async function updateCustomerMetrics(
  id: string,
  updates: MetricUpdate,
  options: MetricUpdateOptions
) {
  if (!isValidObjectId(id)) {
    return null;
  }

  const current = await Customer.findById(id)
    .select('title usageCount likesCount helpfulCount unhelpfulCount categoryId')
    .populate('categoryId', 'slug')
    .lean<MetricCustomerRow | null>();

  if (!current) {
    return null;
  }

  const before = mapCustomerMetrics(current);
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
    ? await Customer.findByIdAndUpdate(id, update, { returnDocument: 'after' })
    .select('title usageCount likesCount helpfulCount unhelpfulCount categoryId')
    .populate('categoryId', 'slug')
    .lean<MetricCustomerRow | null>()
    : current;

  if (!updated) {
    return null;
  }

  const after = mapCustomerMetrics(updated);

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
      categorySlug: getMetricCustomerCategorySlug(updated),
    } satisfies CustomerRevalidationRef,
  };
}
