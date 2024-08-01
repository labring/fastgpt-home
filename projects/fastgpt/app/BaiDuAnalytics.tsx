'use client';

import Script from 'next/script';

const BaiduAnalytics = () => {
  const key = process.env.NEXT_PUBLIC_BAIDU_TONGJI;

  if (!key) return null;

  return (
    <Script
      id="baidu-tongji"
      strategy="afterInteractive"
      src={`https://hm.baidu.com/hm.js?${key}`}
    />
  );
};

export default BaiduAnalytics;
