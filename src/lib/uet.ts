/**
 * Microsoft Advertising UET (Universal Event Tracking) bridge. The tag itself
 * is loaded by UetAnalytics when NEXT_PUBLIC_BING_UET_ID is configured; this
 * module only pushes the conversion event and never blocks the caller.
 */

declare global {
  interface Window {
    uetq?: unknown[];
  }
}

/** Push the lead_submit conversion event; the Bing Ads conversion goal maps to this name. */
export function fireUetConversion() {
  try {
    window.uetq = window.uetq || [];
    window.uetq.push(['event', 'lead_submit', {}]);
  } catch {
    // Measurement failures must never interrupt a saved CRM lead.
  }
}
