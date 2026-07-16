'use client';

import { useEffect } from 'react';
import { reportAnonymousVisitor } from '@/lib/leadAttribution';

const LeadAttribution = () => {
  useEffect(() => {
    void reportAnonymousVisitor();
  }, []);

  return null;
};

export default LeadAttribution;
