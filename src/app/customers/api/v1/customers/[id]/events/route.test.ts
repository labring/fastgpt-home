import { describe, expect, it } from 'vitest';
import { parseEventPayload } from './route';

describe('agent customer event payload', () => {
  it('accepts additive public interaction events', () => {
    expect(parseEventPayload({ type: 'view' })).toMatchObject({
      success: true,
      data: { type: 'view' }
    });
    expect(parseEventPayload({ type: 'like' })).toMatchObject({
      success: true,
      data: { type: 'like' }
    });
  });

  it('rejects unlike because public likes are like-once only', () => {
    expect(parseEventPayload({ type: 'unlike' })).toMatchObject({
      success: false,
      details: { allowedTypes: ['view', 'like'] }
    });
  });
});
