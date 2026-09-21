'use client';

import Script from 'next/script';
import { currentSiteVariant } from '@/lib/siteRouting';

/**
 * Microsoft Advertising UET tag. Renders nothing unless NEXT_PUBLIC_BING_UET_ID
 * is configured; conversion events are pushed from the ads lead form callback
 * via fireUetConversion(). Only the China build loads the tag, keeping preview
 * and international builds out of paid conversion reporting.
 */
export default function UetAnalytics() {
  const uetId = process.env.NEXT_PUBLIC_BING_UET_ID?.trim();
  if (!uetId || currentSiteVariant !== 'cn') return null;

  return (
    <Script id="bing-uet" strategy="afterInteractive">
      {`
        (function(w, d, t, r, u) {
          var f, n, i;
          w[u] = w[u] || [];
          f = function() {
            var o = { ti: ${JSON.stringify(uetId)} };
            o.q = w[u];
            w[u] = new UET(o);
            w[u].push('pageLoad');
          };
          n = d.createElement(t);
          n.src = r;
          n.async = 1;
          n.onload = n.onreadystatechange = function() {
            var s = this.readyState;
            if (s && s !== 'loaded' && s !== 'complete') return;
            f();
            n.onload = n.onreadystatechange = null;
          };
          i = d.getElementsByTagName(t)[0];
          i.parentNode.insertBefore(n, i);
        })(window, document, 'script', 'https://bat.bing.com/bat.js', 'uetq');
      `}
    </Script>
  );
}
