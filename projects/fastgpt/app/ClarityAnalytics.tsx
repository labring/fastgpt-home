'use client';

import Script from 'next/script';

const ClarityAnalytics = () => {
    const key = process.env.NEXT_PUBLIC_CLARITY_TONGJI;

    if (!key) return null;

    return (
        <Script
            id="clarity-tongji"
            strategy="afterInteractive"
            src={`https://www.clarity.ms/tag/${key}`}
        />
    );
};

export default ClarityAnalytics;

