'use client';

import Script from 'next/script';
import { currentSiteVariant } from '@/lib/siteRouting';

export default function SiteAnalytics() {
  const isChinaSite = currentSiteVariant === 'cn';
  const baiduId = process.env.NEXT_PUBLIC_BAIDU_TONGJI;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_TONGJI;
  const rybbitUrl = process.env.NEXT_PUBLIC_RYBBIT_TONGJI;
  const rybbitSiteId = process.env.NEXT_PUBLIC_RYBBIT_TONGJI_SITEID;
  const googleId = process.env.NEXT_PUBLIC_GOOGLE_ID;

  return (
    <>
      {isChinaSite && baiduId && (
        <Script id="baidu-tongji" strategy="afterInteractive">
          {`
            (function() {
              if (window.location.hostname !== 'fastgpt.cn') return;
              window._hmt = window._hmt || [];
              window._hmt.push(['_requirePlugin', 'UrlChangeTracker']);
              var hm = document.createElement('script');
              hm.async = true;
              hm.src = ${JSON.stringify(
                `https://hm.baidu.com/hm.js?${encodeURIComponent(baiduId)}`
              )};
              document.head.appendChild(hm);
            })();
          `}
        </Script>
      )}
      {isChinaSite && clarityId && (
        <Script id="clarity-tongji" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y) {
              if (c.location.hostname !== 'fastgpt.cn') return;
              c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); };
              t = l.createElement(r); t.async = true;
              t.src = 'https://www.clarity.ms/tag/' + i;
              y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t,y);
            })(window, document, 'clarity', 'script', ${JSON.stringify(
              encodeURIComponent(clarityId)
            )});
          `}
        </Script>
      )}
      {rybbitUrl && (
        <Script
          id="rybbit-tongji"
          strategy="lazyOnload"
          defer
          data-site-id={`${rybbitSiteId}`}
          src={rybbitUrl}
        />
      )}
      {googleId && (
        <>
          <Script
            defer
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleId)}`}
          />
          <Script id="gtag-init" defer strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${JSON.stringify(googleId)}, {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
    </>
  );
}
