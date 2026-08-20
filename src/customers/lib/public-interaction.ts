import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { PUBLIC_BASE_PATH } from '@/customers/lib/base-path';
import { isValidObjectId } from '@/customers/lib/object-id';
import { rateLimit } from '@/customers/lib/rate-limit';

export const VISITOR_COOKIE_NAME = 'fg_visitor';
const VISITOR_COOKIE_MAX_AGE_SECONDS = 180 * 24 * 60 * 60;
const VISITOR_COOKIE_VALUE_PATTERN = /^[a-zA-Z0-9_-]{24,96}$/;

export { isValidObjectId };

export function invalidCustomerIdResponse() {
  return NextResponse.json({ error: 'Invalid customer id' }, { status: 400 });
}

export function isValidVisitorKey(value: unknown) {
  return typeof value === 'string' && VISITOR_COOKIE_VALUE_PATTERN.test(value);
}

export async function getOrCreateVisitorKey() {
  const cookieStore = await cookies();
  const existingValue = cookieStore.get(VISITOR_COOKIE_NAME)?.value;

  if (isValidVisitorKey(existingValue)) {
    return existingValue;
  }

  const visitorKey = crypto.randomBytes(24).toString('base64url');
  cookieStore.set(VISITOR_COOKIE_NAME, visitorKey, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: PUBLIC_BASE_PATH,
    maxAge: VISITOR_COOKIE_MAX_AGE_SECONDS
  });

  return visitorKey;
}

export function getPublicInteractionClientIp(request: NextRequest | Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown-ip';
}

export function rateLimitPublicInteraction({
  request,
  action,
  customerId,
  limit = 30,
  windowMs = 60 * 1000
}: {
  request: NextRequest | Request;
  action: string;
  customerId: string;
  limit?: number;
  windowMs?: number;
}) {
  const ip = getPublicInteractionClientIp(request);
  const result = rateLimit(`public-interaction:${action}:${customerId}:${ip}`, limit, windowMs);

  if (!result.success) {
    return NextResponse.json(
      { error: '操作过于频繁，请稍后再试' },
      { status: 429 }
    );
  }

  return null;
}

export function isDuplicateKeyError(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 11000
  );
}
