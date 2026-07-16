'use client';

import { useEffect } from 'react';
import { reportAnonymousAttribution } from '@/lib/leadAttribution';

const LeadAttribution = () => {
  useEffect(() => {
    void reportAnonymousAttribution();
  }, []);

  return null;
};

export default LeadAttribution;
