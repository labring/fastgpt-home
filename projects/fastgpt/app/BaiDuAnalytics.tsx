'use client';

import Script from 'next/script';

const BaiDuAnalytics = () => {
  const key = process.env.NEXT_PUBLIC_BAIDU_TONGJI;

  return (
    <>
      {key ? (
        <Script
          id="baidu-tongji"
          strategy="afterInteractive"
          src={`https://hm.baidu.com/hm.js?${key}`}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default BaiDuAnalytics;
