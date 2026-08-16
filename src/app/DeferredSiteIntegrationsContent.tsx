'use client';

import BaiDuAnalytics from './BaiDuAnalytics';
import ClarityAnalytics from './ClarityAnalytics';
import GoogleAnalytics from './GoogleAnalytics';
import LeadAttribution from './LeadAttribution';
import RybbitAnalytics from './RybbitAnalytics';

export default function DeferredSiteIntegrationsContent() {
  return (
    <>
      <GoogleAnalytics />
      <BaiDuAnalytics />
      <ClarityAnalytics />
      <RybbitAnalytics />
      <LeadAttribution />
    </>
  );
}
