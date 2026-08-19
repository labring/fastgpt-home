import { beforeEach, describe, expect, it } from 'vitest';
import {
  buildAiSummaryCacheKey,
  readAiSummaryCache,
} from './AiSummaryCard';

describe('AI summary cache versioning', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('includes the solution updatedAt version in cache keys', () => {
    expect(buildAiSummaryCacheKey('solution-a', '2026-01-01T00:00:00.000Z', 'chatHistory'))
      .toBe('ai_cache_solution-a_2026-01-01T00:00:00.000Z_chatHistory');
  });

  it('does not read stale cache entries from a previous content version', () => {
    sessionStorage.setItem(
      buildAiSummaryCacheKey('solution-a', '2026-01-01T00:00:00.000Z', 'painPoints'),
      '旧摘要'
    );
    sessionStorage.setItem(
      buildAiSummaryCacheKey('solution-a', '2026-01-01T00:00:00.000Z', 'hasGenerated'),
      'true'
    );

    expect(readAiSummaryCache('solution-a', '2026-01-02T00:00:00.000Z')).toEqual({
      painPoints: '',
      capabilities: '',
      value: '',
      hasGeneratedSummary: false,
      chatHistory: [],
    });
  });
});
