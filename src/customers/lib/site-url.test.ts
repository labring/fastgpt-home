import { afterEach, describe, expect, it } from 'vitest';
import { absoluteUrl, getSiteUrl } from './site-url';

const originalSiteUrl = process.env.SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) {
    delete process.env.SITE_URL;
  } else {
    process.env.SITE_URL = originalSiteUrl;
  }
});

describe('site URL', () => {
  it('uses the customers mount in local development', () => {
    delete process.env.SITE_URL;
    expect(getSiteUrl()).toBe('http://localhost:3000/customers');
    expect(absoluteUrl('/')).toBe('http://localhost:3000/customers');
  });

  it('preserves the configured base pathname for every absolute URL', () => {
    process.env.SITE_URL = 'https://fastgpt.cn/customers/';
    expect(absoluteUrl('/')).toBe('https://fastgpt.cn/customers');
    expect(absoluteUrl('/categories/finance')).toBe(
      'https://fastgpt.cn/customers/categories/finance'
    );
  });
});
