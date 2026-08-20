import { afterEach, describe, expect, it } from 'vitest';
import { withBasePath } from './base-path';
import { absoluteUrl } from './site-url';
import { getCustomerPublicHref } from './customer-url';

const originalSiteUrl = process.env.SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) {
    delete process.env.SITE_URL;
  } else {
    process.env.SITE_URL = originalSiteUrl;
  }
});

const customer = {
  id: 'customer-id',
  categorySlug: 'customer-service',
  slug: 'knowledge-base-agent',
};

// 关键链接生成链路：getCustomerPublicHref 产出无前缀内部路径，
// withBasePath 负责内部跳转前缀，absoluteUrl 依赖 SITE_URL 尾部已含 /customers。
// 三者必须协同，任何一环漏加/多加前缀都会产生错误 canonical。
describe('customer link generation (end-to-end)', () => {
  it('builds an internal canonical path with the customers mount prefix', () => {
    expect(withBasePath(getCustomerPublicHref(customer))).toBe(
      '/customers/customer-service/knowledge-base-agent'
    );
  });

  it('builds an absolute canonical URL from SITE_URL carrying /customers', () => {
    process.env.SITE_URL = 'https://fastgpt.cn/customers';
    expect(absoluteUrl(getCustomerPublicHref(customer))).toBe(
      'https://fastgpt.cn/customers/customer-service/knowledge-base-agent'
    );
  });

  it('does not double-prefix when SITE_URL has a trailing slash', () => {
    process.env.SITE_URL = 'https://fastgpt.cn/customers/';
    expect(absoluteUrl(getCustomerPublicHref(customer))).toBe(
      'https://fastgpt.cn/customers/customer-service/knowledge-base-agent'
    );
  });

  it('builds an absolute URL for the legacy id fallback route', () => {
    process.env.SITE_URL = 'https://fastgpt.cn/customers';
    expect(absoluteUrl(getCustomerPublicHref({ id: 'customer-id' }))).toBe(
      'https://fastgpt.cn/customers/customer/customer-id'
    );
  });
});
