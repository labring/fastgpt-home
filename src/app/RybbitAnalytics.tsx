'use client';

import Script from 'next/script';
import { identifyRybbitVisitor } from '@/lib/rybbitIdentity';

const RybbitAnalytics = () => {
    const key = process.env.NEXT_PUBLIC_RYBBIT_TONGJI;
    const siteId = process.env.NEXT_PUBLIC_RYBBIT_TONGJI_SITEID;

    if (!key) return null;

    return (
        <Script
            id="rybbit-tongji"
            strategy="afterInteractive"
            defer
            data-site-id={`${siteId}`}
            src={`${key}`}
            onLoad={identifyRybbitVisitor}
            onReady={identifyRybbitVisitor}
        />
    );
};

export default RybbitAnalytics;
