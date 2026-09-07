'use client';

import GoogleAnalytics from './GoogleAnalytics';
import LeadAttribution from './LeadAttribution';
import RybbitAnalytics from './RybbitAnalytics';

export default function DeferredSiteIntegrationsContent() {
  return (
    <>
      <GoogleAnalytics />
      <RybbitAnalytics />
      <LeadAttribution />
    </>
  );
}
