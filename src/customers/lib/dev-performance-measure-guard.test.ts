import { describe, expect, it, vi } from 'vitest';
import {
  installNextRscPerformanceMeasureGuard,
  isNextRscNegativeTimestampMeasureError,
  sanitizePerformanceMeasureOptions
} from './dev-performance-measure-guard';

describe('Next RSC performance measure guard', () => {
  it('recognizes only Next Server Component negative timestamp measure errors', () => {
    const options = {
      start: 0,
      end: -Infinity,
      detail: {
        devtools: {
          trackGroup: 'Server Components ⚛'
        }
      }
    };

    expect(
      isNextRscNegativeTimestampMeasureError(
        '\u200bSemanticCustomerPage',
        options,
        new TypeError("Failed to execute 'measure' on 'Performance': cannot have a negative time stamp.")
      )
    ).toBe(true);
    expect(
      isNextRscNegativeTimestampMeasureError(
        'regular-measure',
        options,
        new TypeError("Failed to execute 'measure' on 'Performance': cannot have a negative time stamp.")
      )
    ).toBe(true);
    expect(
      isNextRscNegativeTimestampMeasureError(
        'regular-measure',
        { start: -1, end: 0 },
        new TypeError("Failed to execute 'measure' on 'Performance': cannot have a negative time stamp.")
      )
    ).toBe(false);
  });

  it('sanitizes non-finite and negative timestamps while preserving details', () => {
    expect(
      sanitizePerformanceMeasureOptions({
        start: 18,
        end: -Infinity,
        detail: { devtools: { trackGroup: 'Server Components ⚛' } }
      })
    ).toEqual({
      start: 18,
      end: 18,
      detail: { devtools: { trackGroup: 'Server Components ⚛' } }
    });

    expect(
      sanitizePerformanceMeasureOptions({
        start: 20,
        end: 10
      })
    ).toEqual({
      start: 10,
      end: 10
    });
  });

  it('retries a Next RSC negative timestamp measure with sanitized options', () => {
    const measure = vi
      .fn()
      .mockImplementationOnce(() => {
        throw new TypeError("Failed to execute 'measure' on 'Performance': cannot have a negative time stamp.");
      })
      .mockReturnValueOnce({} as PerformanceMeasure);

    const targetPerformance = { measure } as unknown as Performance;

    expect(installNextRscPerformanceMeasureGuard(targetPerformance)).toBe(true);

    targetPerformance.measure('\u200bSemanticCustomerPage', {
      start: 12,
      end: -Infinity,
      detail: { devtools: { trackGroup: 'Server Components ⚛' } }
    });

    expect(measure).toHaveBeenCalledTimes(2);
    expect(measure).toHaveBeenLastCalledWith('\u200bSemanticCustomerPage', {
      start: 12,
      end: 12,
      detail: { devtools: { trackGroup: 'Server Components ⚛' } }
    });
  });

  it('does not swallow unrelated performance measure errors', () => {
    const error = new TypeError('custom failure');
    const targetPerformance = {
      measure: vi.fn(() => {
        throw error;
      })
    } as unknown as Performance;

    installNextRscPerformanceMeasureGuard(targetPerformance);

    expect(() => targetPerformance.measure('regular-measure', { start: -1, end: 0 })).toThrow(error);
  });
});
