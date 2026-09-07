import Script from 'next/script';
import { currentSiteVariant } from '@/lib/siteRouting';

const ClarityAnalytics = () => {
  const key = process.env.NEXT_PUBLIC_CLARITY_TONGJI;

  if (!key || currentSiteVariant !== 'cn') return null;

  return (
    <Script id="clarity-tongji" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y) {
          if (c.location.hostname !== 'fastgpt.cn') return;
          c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); };
          t = l.createElement(r); t.async = true;
          t.src = 'https://www.clarity.ms/tag/' + i;
          y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t,y);
        })(window, document, 'clarity', 'script', ${JSON.stringify(encodeURIComponent(key))});
      `}
    </Script>
  );
};

export default ClarityAnalytics;
