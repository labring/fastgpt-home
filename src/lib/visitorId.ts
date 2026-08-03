const ATTRIBUTION_STORAGE_KEY = 'xs_attr';
const VISITOR_ID_KEY = 'fastgpt_visitor_id';
const VISITOR_ID_MAX_LENGTH = 64;

function createVisitorId(): string {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return cryptoApi.randomUUID();
  }

  const random = Math.random().toString(36).slice(2, 12);
  return `fg_${Date.now().toString(36)}_${random}`;
}

function normalizeVisitorId(value?: string | null): string {
  const visitorId = value?.trim() || '';
  return visitorId.length <= VISITOR_ID_MAX_LENGTH ? visitorId : '';
}

function getIncomingVisitorId(): string {
  try {
    return normalizeVisitorId(new URLSearchParams(window.location.search).get('visitor_id'));
  } catch {
    return '';
  }
}

function getStoredAttributionVisitorId(): string {
  try {
    const raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return '';

    const stored = JSON.parse(raw) as { visitor_id?: string };
    return normalizeVisitorId(stored.visitor_id);
  } catch {
    return '';
  }
}

export function getVisitorId(): string {
  if (typeof window === 'undefined') return '';

  try {
    const storedVisitorId = normalizeVisitorId(localStorage.getItem(VISITOR_ID_KEY));
    if (storedVisitorId) return storedVisitorId;

    const incomingVisitorId = getIncomingVisitorId();
    if (incomingVisitorId) {
      localStorage.setItem(VISITOR_ID_KEY, incomingVisitorId);
      return incomingVisitorId;
    }

    const attributionVisitorId = getStoredAttributionVisitorId();
    if (attributionVisitorId) {
      localStorage.setItem(VISITOR_ID_KEY, attributionVisitorId);
      return attributionVisitorId;
    }

    const visitorId = createVisitorId();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
    return visitorId;
  } catch {
    return '';
  }
}
