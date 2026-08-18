import 'server-only';
import { ATTRIBUTION_QUERY_KEYS, ATTRIBUTION_QUERY_VALUE_CAPS } from '@/lib/attribution/query.mjs';

const attributionKeysJson = JSON.stringify(ATTRIBUTION_QUERY_KEYS);
const attributionValueCapsJson = JSON.stringify(ATTRIBUTION_QUERY_VALUE_CAPS);

/**
 * Keep Contact links attribution-safe before React hydration. Static export cannot
 * render the current query string into an anchor, so this capture-phase handler
 * updates the destination at the moment a user interacts with the link.
 */
export const contactLinkAttributionScript = `
(function() {
  var keys = ${attributionKeysJson};
  var valueCaps = ${attributionValueCapsJson};

  function updateContactHref(event) {
    if (event.defaultPrevented || !(event.target instanceof Element)) return;

    var anchor = event.target.closest('a[href]');
    if (!anchor) return;

    var rawHref = anchor.getAttribute('href') || '';
    if (!rawHref || rawHref.charAt(0) === '#' || /^(?:mailto:|tel:|javascript:)/i.test(rawHref)) {
      return;
    }

    var target;
    try {
      target = new URL(rawHref, window.location.href);
    } catch (_error) {
      return;
    }

    if (
      target.origin !== window.location.origin ||
      !/(?:^|\\/)contact(?:\\/embed)?\\/?$/.test(target.pathname)
    ) {
      return;
    }

    var incoming = new URLSearchParams(window.location.search);
    var forwarded = new URLSearchParams();
    keys.forEach(function(key) {
      var value = incoming.get(key);
      var maxLength = valueCaps[key];
      if (value && maxLength) {
        value = value.trim().slice(0, maxLength);
        if (value) forwarded.set(key, value);
      }
    });

    target.search = forwarded.toString() ? '?' + forwarded.toString() : '';
    anchor.setAttribute('href', target.pathname + target.search + target.hash);
  }

  document.addEventListener('pointerdown', updateContactHref, true);
  document.addEventListener('click', updateContactHref, true);
})();
`.trim();
