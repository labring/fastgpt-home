import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/customers/lib/db';
import { rateLimit } from '@/customers/lib/rate-limit';
import AdminSession from '@/customers/models/AdminSession';

export const ADMIN_SESSION_COOKIE = '__Host-admin_session';

const SESSION_MAX_AGE_SECONDS = 12 * 60 * 60;
const SESSION_TOUCH_INTERVAL_MS = 5 * 60 * 1000;
const LOGIN_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_RATE_LIMIT_MAX = 8;

function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function getCookieName() {
  return process.env.NODE_ENV === 'production'
    ? ADMIN_SESSION_COOKIE
    : 'admin_session';
}

function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS
  };
}

function getClientIp(request: NextRequest | Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown-ip';
}

export function isAdminPortalEnabled() {
  return process.env.CUSTOMERS_ADMIN_ENABLED === 'true';
}

export async function createAdminSession(userAgent = '') {
  await dbConnect();

  const token = crypto.randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);

  await AdminSession.create({
    tokenHash: hashToken(token),
    userAgent: userAgent.slice(0, 300),
    lastSeenAt: new Date(),
    expiresAt
  });

  const cookieStore = await cookies();
  cookieStore.set(getCookieName(), token, getCookieOptions());
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;

  if (token) {
    await dbConnect();
    await AdminSession.deleteOne({ tokenHash: hashToken(token) });
  }

  cookieStore.delete(getCookieName());
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getCookieName())?.value;
  if (!token) {
    return null;
  }

  await dbConnect();
  const session = await AdminSession.findOne({
    tokenHash: hashToken(token),
    expiresAt: { $gt: new Date() }
  });

  if (!session) {
    return null;
  }

  if (Date.now() - session.lastSeenAt.getTime() > SESSION_TOUCH_INTERVAL_MS) {
    session.lastSeenAt = new Date();
    await session.save();
  }

  return session;
}

export async function requireAdminSession() {
  return Boolean(await getAdminSession());
}

export async function isLoginRateLimited(request: NextRequest | Request) {
  const key = `admin-login:${getClientIp(request)}`;
  const result = rateLimit(key, LOGIN_RATE_LIMIT_MAX, LOGIN_RATE_LIMIT_WINDOW_MS);
  return !result.success;
}

export function unauthorizedJson() {
  return NextResponse.json(
    { success: false, error: '请先登录后台' },
    { status: 401, headers: getAdminSecurityHeaders() }
  );
}

export function forbiddenJson(message = '禁止访问') {
  return NextResponse.json(
    { success: false, error: message },
    { status: 403, headers: getAdminSecurityHeaders() }
  );
}

export function getAdminSecurityHeaders() {
  return {
    'Cache-Control': 'no-store',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'Content-Security-Policy': "frame-ancestors 'none'"
  };
}

export async function requireAdminApiAccess(request?: NextRequest | Request) {
  if (!isAdminPortalEnabled()) {
    return { ok: false as const, response: forbiddenJson() };
  }

  if (request && !isAllowedAdminMutationOrigin(request)) {
    return { ok: false as const, response: forbiddenJson('请求来源不被允许') };
  }

  const authenticated = await requireAdminSession();
  if (!authenticated) {
    return { ok: false as const, response: unauthorizedJson() };
  }

  return { ok: true as const };
}

export function isAllowedAdminMutationOrigin(request: NextRequest | Request) {
  const method = request.method.toUpperCase();
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
    return true;
  }

  const origin = request.headers.get('origin');
  if (!origin) {
    return true;
  }

  const forwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!forwardedHost) {
    return false;
  }

  try {
    return new URL(origin).host === forwardedHost;
  } catch {
    return false;
  }
}
