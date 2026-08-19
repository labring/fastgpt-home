const NEXT_RSC_MEASURE_PREFIX = '\u200b';
const NEGATIVE_TIMESTAMP_ERROR_TEXT = 'negative time stamp';
const SERVER_COMPONENTS_TRACK_GROUP = 'Server Components';
const GUARD_MARK = Symbol.for('fastgpt.next-rsc-performance-measure-guard');

type MeasureLike = (
  measureName: string,
  startOrMeasureOptions?: string | PerformanceMeasureOptions,
  endMark?: string
) => PerformanceMeasure;

type GuardedMeasure = MeasureLike & {
  [GUARD_MARK]?: true;
};

function isObjectLike(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isServerComponentsMeasure(
  measureName: string,
  startOrMeasureOptions?: string | PerformanceMeasureOptions
): boolean {
  if (measureName.startsWith(NEXT_RSC_MEASURE_PREFIX)) {
    return true;
  }

  if (!isObjectLike(startOrMeasureOptions)) {
    return false;
  }

  const detail = startOrMeasureOptions.detail;
  if (!isObjectLike(detail)) {
    return false;
  }

  const devtools = detail.devtools;
  if (!isObjectLike(devtools) || typeof devtools.trackGroup !== 'string') {
    return false;
  }

  return devtools.trackGroup.includes(SERVER_COMPONENTS_TRACK_GROUP);
}

export function isNextRscNegativeTimestampMeasureError(
  measureName: string,
  startOrMeasureOptions: string | PerformanceMeasureOptions | undefined,
  error: unknown
): boolean {
  return (
    error instanceof TypeError &&
    error.message.includes(NEGATIVE_TIMESTAMP_ERROR_TEXT) &&
    isServerComponentsMeasure(measureName, startOrMeasureOptions)
  );
}

function normalizeTimestamp(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? value
    : fallback;
}

export function sanitizePerformanceMeasureOptions(
  options?: PerformanceMeasureOptions
): PerformanceMeasureOptions {
  const sanitized: PerformanceMeasureOptions = { ...(options ?? {}) };
  const start = normalizeTimestamp(sanitized.start, 0);
  const end = normalizeTimestamp(sanitized.end, start);

  sanitized.start = end < start ? end : start;
  sanitized.end = end;

  return sanitized;
}

export function installNextRscPerformanceMeasureGuard(
  targetPerformance: Performance | undefined =
    typeof performance === 'undefined' ? undefined : performance
): boolean {
  if (!targetPerformance || typeof targetPerformance.measure !== 'function') {
    return false;
  }

  const currentMeasure = targetPerformance.measure as GuardedMeasure;
  if (currentMeasure[GUARD_MARK]) {
    return false;
  }

  const originalMeasure = currentMeasure.bind(targetPerformance) as MeasureLike;
  const guardedMeasure: GuardedMeasure = (function (
    measureName: string,
    startOrMeasureOptions?: string | PerformanceMeasureOptions,
    endMark?: string
  ) {
    try {
      if (arguments.length <= 1) {
        return originalMeasure(measureName);
      }

      if (arguments.length === 2) {
        return originalMeasure(measureName, startOrMeasureOptions);
      }

      return originalMeasure(measureName, startOrMeasureOptions, endMark);
    } catch (error) {
      if (!isNextRscNegativeTimestampMeasureError(measureName, startOrMeasureOptions, error)) {
        throw error;
      }

      if (typeof startOrMeasureOptions === 'string') {
        return undefined as unknown as PerformanceMeasure;
      }

      try {
        return originalMeasure(
          measureName,
          sanitizePerformanceMeasureOptions(startOrMeasureOptions)
        );
      } catch {
        return undefined as unknown as PerformanceMeasure;
      }
    }
  }) as GuardedMeasure;

  guardedMeasure[GUARD_MARK] = true;

  try {
    Object.defineProperty(targetPerformance, 'measure', {
      configurable: true,
      writable: true,
      value: guardedMeasure
    });
  } catch {
    try {
      targetPerformance.measure = guardedMeasure;
    } catch {
      return false;
    }
  }

  return true;
}
