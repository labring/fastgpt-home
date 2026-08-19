import { describe, expect, it } from 'vitest';
import { createPlainTextResponse } from './solution-readable-content';

describe('createPlainTextResponse', () => {
  it('returns no-store cache headers for derived public text', async () => {
    const response = createPlainTextResponse('FastGPT');

    expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
    expect(response.headers.get('Cache-Control')).toBe('no-store, max-age=0');
    await expect(response.text()).resolves.toBe('FastGPT');
  });
});
