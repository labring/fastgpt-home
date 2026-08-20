import { describe, expect, it } from 'vitest';
import { getCustomerPublicHref } from './customer-url';

describe('getCustomerPublicHref', () => {
  it('returns a semantic internal path without the deployment prefix', () => {
    expect(
      getCustomerPublicHref({
        id: 'customer-id',
        categorySlug: 'customer-service',
        slug: 'knowledge-base-agent',
      })
    ).toBe('/customer-service/knowledge-base-agent');
  });

  it('falls back to the id when a category has no content slug', () => {
    expect(
      getCustomerPublicHref({ id: 'customer-id', categorySlug: 'customer-service' })
    ).toBe('/customer-service/customer-id');
  });

  it('uses the legacy id route when the category is unavailable', () => {
    expect(getCustomerPublicHref({ id: 'customer-id' })).toBe('/customer/customer-id');
  });
});
