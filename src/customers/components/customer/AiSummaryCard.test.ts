import { beforeEach, describe, expect, it } from 'vitest';
import {
  buildAiSummaryCacheKey,
  readAiSummaryCache,
} from './AiSummaryCard';

describe('AI summary cache versioning', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('includes the customer updatedAt version in cache keys', () => {
    expect(buildAiSummaryCacheKey('customer-a', '2026-01-01T00:00:00.000Z', 'chatHistory'))
      .toBe('ai_cache_customer-a_2026-01-01T00:00:00.000Z_chatHistory');
  });

  it('does not read stale cache entries from a previous content version', () => {
    sessionStorage.setItem(
      buildAiSummaryCacheKey('customer-a', '2026-01-01T00:00:00.000Z', 'painPoints'),
      '旧摘要'
    );
    sessionStorage.setItem(
      buildAiSummaryCacheKey('customer-a', '2026-01-01T00:00:00.000Z', 'hasGenerated'),
      'true'
    );

    expect(readAiSummaryCache('customer-a', '2026-01-02T00:00:00.000Z')).toEqual({
      painPoints: '',
      capabilities: '',
      value: '',
      hasGeneratedSummary: false,
      chatHistory: [],
    });
  });
});
