'use client';

import { LazyMotion, MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

const loadMotionFeatures = () =>
  import('@/components/home/motion/motionFeatures').then((module) => module.default);

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
