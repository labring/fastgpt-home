import { describe, expect, it } from 'vitest';
import { getSolutionPublicHref } from './solution-url';

describe('getSolutionPublicHref', () => {
  it('returns a semantic internal path without the deployment prefix', () => {
    expect(
      getSolutionPublicHref({
        id: 'solution-id',
        categorySlug: 'customer-service',
        slug: 'knowledge-base-agent',
      })
    ).toBe('/customer-service/knowledge-base-agent');
  });

  it('falls back to the id when a category has no content slug', () => {
    expect(
      getSolutionPublicHref({ id: 'solution-id', categorySlug: 'customer-service' })
    ).toBe('/customer-service/solution-id');
  });

  it('uses the legacy id route when the category is unavailable', () => {
    expect(getSolutionPublicHref({ id: 'solution-id' })).toBe('/solution/solution-id');
  });
});
