import Script from 'next/script';
import { currentSiteVariant } from '@/lib/siteRouting';

const BaiduAnalytics = () => {
  const key = process.env.NEXT_PUBLIC_BAIDU_TONGJI;

  if (!key || currentSiteVariant !== 'cn') return null;

  return (
    <Script id="baidu-tongji" strategy="afterInteractive">
      {`
        (function() {
          if (window.location.hostname !== 'fastgpt.cn') return;
          window._hmt = window._hmt || [];
          window._hmt.push(['_requirePlugin', 'UrlChangeTracker']);
          var hm = document.createElement('script');
          hm.async = true;
          hm.src = ${JSON.stringify(`https://hm.baidu.com/hm.js?${encodeURIComponent(key)}`)};
          document.head.appendChild(hm);
        })();
      `}
    </Script>
  );
};

export default BaiduAnalytics;
