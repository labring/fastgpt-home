'use client';

import type { Variants } from 'framer-motion';
import * as m from 'framer-motion/m';
import type { ReactNode } from 'react';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.06,
  initialDelay = 0,
  once = true
}: StaggerProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay
      }
    }
  };

  // Prewarm the stagger before the grid reaches the viewport so its first
  // item is visible when the user arrives at the section.
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '0px 0px 48px 0px' }}
      variants={variants}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
  distance = 24,
  duration = 0.6
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  return (
    <m.div className={className} variants={variants}>
      {children}
    </m.div>
  );
}
