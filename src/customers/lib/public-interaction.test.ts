import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cookies } from 'next/headers';
import { getOrCreateVisitorKey, VISITOR_COOKIE_NAME } from './public-interaction';

vi.mock('next/headers', () => ({
  cookies: vi.fn()
}));

describe('public interaction visitor cookie', () => {
  const get = vi.fn();
  const set = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(cookies).mockResolvedValue({ get, set } as never);
  });

  it('reuses a valid visitor key without resetting the cookie', async () => {
    const visitorKey = 'validVisitorKey_123456789012345678901234';
    get.mockReturnValue({ value: visitorKey });

    await expect(getOrCreateVisitorKey()).resolves.toBe(visitorKey);
    expect(set).not.toHaveBeenCalled();
  });

  it('scopes a new visitor cookie to the public customers mount', async () => {
    get.mockReturnValue(undefined);

    const visitorKey = await getOrCreateVisitorKey();

    expect(visitorKey).toMatch(/^[a-zA-Z0-9_-]{32}$/);
    expect(set).toHaveBeenCalledWith(
      VISITOR_COOKIE_NAME,
      visitorKey,
      expect.objectContaining({
        httpOnly: true,
        sameSite: 'lax',
        path: '/customers'
      })
    );
  });
});
