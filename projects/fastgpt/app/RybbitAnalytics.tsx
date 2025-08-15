'use client';

import Script from 'next/script';

const RybbitAnalytics = () => {
    const key = process.env.NEXT_PUBLIC_RYBBIT_TONGJI;
    const siteId = process.env.NEXT_PUBLIC_RYBBIT_TONGJI_SITEID;

    if (!key) return null;

    return (
        <Script
            id="rybbit-tongji"
            strategy="afterInteractive"
            data-site-id={`${siteId}`}
            src={`${key}`}
            defer
        />
    );
};

export default RybbitAnalytics;

