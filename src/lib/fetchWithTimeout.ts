export const CRM_REQUEST_TIMEOUT_MS = 20_000;

/**
 * Abort a network request when the CRM does not respond within the configured
 * window. This keeps form submissions retryable instead of leaving them in a
 * permanent loading state.
 */
export function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  timeoutMs = CRM_REQUEST_TIMEOUT_MS
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(input, { ...init, signal: controller.signal }).finally(() => {
    clearTimeout(timeoutId);
  });
}
