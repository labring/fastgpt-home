export type DomainReason =
  | 'invalid-empty'
  | 'invalid-syntax'
  | 'unsafe-scheme'
  | 'unsafe-path'
  | 'unsafe-port'
  | 'unsafe-ip'
  | 'unsafe-loopback'
  | 'unsafe-localhost'
  | 'non-suffix'
  | 'invalid-current-host';

export type DomainDecision =
  | {
      scope: 'shared';
      domain: string;
      normalizedDomain: string;
      reason: 'default-domain' | 'matched-domain';
    }
  | { scope: 'host'; domain: null; normalizedDomain: string; reason: DomainReason };

const DEFAULT_DOMAIN = '.fastgpt.io';

function isIpv4(host: string): boolean {
  return /^(25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/.test(host);
}

function isLoopback(host: string): boolean {
  return (
    host === 'localhost' ||
    host.endsWith('.localhost') ||
    host === '127.0.0.1' ||
    host === '::1' ||
    host === '[::1]' ||
    host.startsWith('127.')
  );
}

function normalizeDomain(value: string): { domain: string; reason?: DomainReason } {
  const raw = value.trim();
  if (!raw) return { domain: '', reason: 'invalid-empty' };
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) return { domain: '', reason: 'unsafe-scheme' };
  if (/[/?#]/.test(raw) || raw.includes('\\')) return { domain: '', reason: 'unsafe-path' };
  if (/:\d+$/.test(raw)) return { domain: '', reason: 'unsafe-port' };
  if (raw.includes(':')) return { domain: '', reason: 'unsafe-ip' };
  if (/\s/.test(raw)) {
    return { domain: '', reason: 'invalid-syntax' };
  }
  const domain = raw.replace(/^\.+/, '').toLowerCase();
  if (!domain || domain.endsWith('.') || domain.startsWith('.') || domain.includes('..')) {
    return { domain: '', reason: 'invalid-syntax' };
  }
  if (isLoopback(domain))
    return {
      domain: '',
      reason:
        domain === 'localhost' || domain.endsWith('.localhost')
          ? 'unsafe-localhost'
          : 'unsafe-loopback'
    };
  if (isIpv4(domain)) return { domain: '', reason: 'unsafe-ip' };
  if (domain.startsWith('[') && domain.endsWith(']')) return { domain: '', reason: 'unsafe-ip' };
  if (!domain.includes('.')) return { domain: '', reason: 'invalid-syntax' };
  if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/.test(domain)) {
    return { domain: '', reason: 'invalid-syntax' };
  }
  return { domain };
}

export function resolveCookieDomain(
  configuredDomain: string | undefined,
  currentHostname: string
): DomainDecision {
  const current = (currentHostname || '').trim().toLowerCase().replace(/\.$/, '');
  if (
    !current ||
    isIpv4(current) ||
    current === 'localhost' ||
    current.endsWith('.localhost') ||
    current.startsWith('[') ||
    current.includes(':')
  ) {
    return { scope: 'host', domain: null, normalizedDomain: '', reason: 'invalid-current-host' };
  }
  const normalized = normalizeDomain(configuredDomain ?? DEFAULT_DOMAIN);
  if (normalized.reason)
    return { scope: 'host', domain: null, normalizedDomain: '', reason: normalized.reason };
  const { domain } = normalized;
  if (current !== domain && !current.endsWith(`.${domain}`)) {
    return { scope: 'host', domain: null, normalizedDomain: domain, reason: 'non-suffix' };
  }
  return {
    scope: 'shared',
    domain: `.${domain}`,
    normalizedDomain: domain,
    reason: configuredDomain ? 'matched-domain' : 'default-domain'
  };
}
