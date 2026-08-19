import { describe, expect, it } from 'vitest';
import { PUBLIC_BASE_PATH, withBasePath } from './base-path';

describe('public base path', () => {
  it('defines the customers mount point', () => {
    expect(PUBLIC_BASE_PATH).toBe('/customers');
  });

  it.each([
    ['/', '/customers'],
    ['/api/customers?limit=10', '/customers/api/customers?limit=10'],
    ['/?search=ai#customers', '/customers?search=ai#customers'],
    ['/fastgpt.svg', '/customers/fastgpt.svg'],
    ['/customers/api/customers', '/customers/api/customers'],
    ['https://cdn.example.com/cover.png', 'https://cdn.example.com/cover.png'],
  ])('prefixes %s', (path, expected) => {
    expect(withBasePath(path)).toBe(expected);
  });

  it('keeps already-prefixed paths stable', () => {
    expect(withBasePath('/customers/fastgpt.svg')).toBe('/customers/fastgpt.svg');
  });
});
