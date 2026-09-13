'use client';

import dynamic from 'next/dynamic';

// Load path-specific recovery only when the shared static 404 is displayed.
export default dynamic(() => import('./NotFoundRecovery'), { ssr: false });
