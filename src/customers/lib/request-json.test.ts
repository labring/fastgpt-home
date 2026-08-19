import { describe, expect, it } from 'vitest';
import { readJsonRecord } from './request-json';

describe('readJsonRecord', () => {
  it('returns parsed JSON objects', async () => {
    const request = new Request('https://example.com', {
      method: 'POST',
      body: JSON.stringify({ name: 'FastGPT' })
    });

    await expect(readJsonRecord(request)).resolves.toEqual({ name: 'FastGPT' });
  });

  it('returns an empty object for invalid JSON or non-object JSON', async () => {
    const invalidRequest = new Request('https://example.com', {
      method: 'POST',
      body: '{bad'
    });
    const arrayRequest = new Request('https://example.com', {
      method: 'POST',
      body: JSON.stringify(['bad'])
    });

    await expect(readJsonRecord(invalidRequest)).resolves.toEqual({});
    await expect(readJsonRecord(arrayRequest)).resolves.toEqual({});
  });
});
