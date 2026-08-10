import { resolveCookieDomain, type DomainDecision } from '../primitives/domain';
import type { StorageResult, StorageStatusReason } from './status';

export const COOKIE_MAX_AGE_SECONDS = 15_552_000;

export interface CookieOperationOptions {
  configuredDomain?: string;
  currentHostname?: string;
  scope?: DomainDecision['scope'];
}

export interface CookieOperationResult extends StorageResult<null> {
  scope: DomainDecision['scope'];
}

type CookieScopeDecision = {
  scope: DomainDecision['scope'];
  domain: string | null;
  normalizedDomain: string;
  reason: StorageStatusReason;
};

function getCurrentHostname(override?: string): string {
  if (override) return override;
  if (typeof window === 'undefined') return '';
  return window.location.hostname;
}

function getCurrentCookieString(override?: string): string {
  if (override !== undefined) return override;
  if (typeof document === 'undefined') return '';
  return document.cookie;
}

function buildScopeDecision(options: CookieOperationOptions = {}): CookieScopeDecision {
  const resolved = resolveCookieDomain(
    options.configuredDomain,
    getCurrentHostname(options.currentHostname)
  );
  if (options.scope === 'host') {
    return {
      scope: 'host',
      domain: null,
      normalizedDomain: resolved.normalizedDomain,
      reason: 'forced-host-only'
    };
  }
  return resolved;
}

function buildOperationResult(
  scope: DomainDecision['scope'],
  ok: boolean,
  reason: StorageStatusReason
): CookieOperationResult {
  return {
    ok,
    status: ok ? 'cookie' : 'unavailable',
    reason,
    value: null,
    scope
  };
}

export function buildCookieAssignment(
  name: string,
  value: string,
  decision: Pick<CookieScopeDecision, 'scope' | 'domain'>,
  maxAgeSeconds = COOKIE_MAX_AGE_SECONDS
): string {
  const parts = [`${name}=${value}`];
  if (decision.scope === 'shared' && decision.domain) {
    parts.push(`Domain=${decision.domain}`);
  }
  parts.push('Path=/', 'SameSite=Lax', 'Secure', `Max-Age=${maxAgeSeconds}`);
  return parts.join('; ');
}

export function readCookieValues(name: string, cookieString = getCurrentCookieString()): string[] {
  if (!cookieString) return [];
  const prefix = `${name}=`;
  return cookieString
    .split(';')
    .map((segment) => segment.trim())
    .filter((segment) => segment.startsWith(prefix))
    .map((segment) => segment.slice(prefix.length));
}

export function readCookieValue(
  name: string,
  cookieString = getCurrentCookieString()
): string | null {
  return readCookieValues(name, cookieString)[0] ?? null;
}

export function writeCookieValue(
  name: string,
  value: string,
  options: CookieOperationOptions = {}
): CookieOperationResult {
  const decision = buildScopeDecision(options);
  if (typeof document === 'undefined') {
    return buildOperationResult(decision.scope, false, 'cookie-write-blocked');
  }
  try {
    document.cookie = buildCookieAssignment(name, value, decision);
  } catch {
    return buildOperationResult(decision.scope, false, 'cookie-write-blocked');
  }
  return buildOperationResult(decision.scope, true, decision.reason);
}

export function removeCookieValue(
  name: string,
  options: CookieOperationOptions = {}
): CookieOperationResult {
  const decision = buildScopeDecision(options);
  if (typeof document === 'undefined') {
    return buildOperationResult(decision.scope, false, 'cookie-remove-blocked');
  }
  try {
    document.cookie = buildCookieAssignment(name, '', decision, 0);
  } catch {
    return buildOperationResult(decision.scope, false, 'cookie-remove-blocked');
  }
  if (readCookieValue(name) !== null) {
    return buildOperationResult(decision.scope, false, 'cookie-read-mismatch');
  }
  return buildOperationResult(decision.scope, true, 'cookie-removed');
}
