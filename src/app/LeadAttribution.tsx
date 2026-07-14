'use client';

import { useEffect } from 'react';
import { trackVisit } from '@/lib/leadAttribution';

const LeadAttribution = () => {
  useEffect(() => {
    trackVisit();
  }, []);

  return null;
};

export default LeadAttribution;
