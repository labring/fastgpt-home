import { getVisitorId } from '@/lib/visitorId';

let identifiedVisitorId = '';
let retryTimer: ReturnType<typeof setTimeout> | null = null;
let retryCount = 0;

const MAX_IDENTIFY_RETRIES = 50;
const IDENTIFY_RETRY_DELAY_MS = 200;

export function identifyRybbitVisitor(): void {
  if (typeof window === 'undefined') return;
  const visitorId = getVisitorId();
  if (!visitorId || visitorId === identifiedVisitorId) return;
  if (!window.rybbit?.identify) {
    if (retryCount >= MAX_IDENTIFY_RETRIES || retryTimer) return;
    retryCount += 1;
    retryTimer = setTimeout(() => {
      retryTimer = null;
      identifyRybbitVisitor();
    }, IDENTIFY_RETRY_DELAY_MS);
    return;
  }
  try {
    window.rybbit.identify(visitorId, {
      identity_source: 'lead_crm',
      identity_version: 'v1'
    });
    identifiedVisitorId = visitorId;
    retryCount = 0;
  } catch {
    // Analytics failures must never interrupt page rendering or CRM submission.
  }
}
