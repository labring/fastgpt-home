'use client';

import { motion } from 'framer-motion';

interface GradientBlobsProps {
  colors?: string[];
}

const defaultColors = ['#F4F5A0', '#C9A8F5'];
const defaultFade = ['85%', '70%'];

const desktopBlobs = [
  { w: 620, h: 620, left: '15%', top: -160, x: [0, 80, 120, 40, -20, 0], y: [0, -20, 10, -15, 5, 0], s: [1, 1.05, 0.95, 1.08, 0.97, 1], dur: 10 },
  { w: 620, h: 620, left: '35%', top: -140, x: [0, -80, -100, -30, 30, 0], y: [0, 15, -10, 20, -5, 0], s: [1, 0.95, 1.1, 0.97, 1.05, 1], dur: 12 },
];

const mobileBlobs = [
  { w: 400, h: 400, left: '0%', top: -140, x: [0, 40, 60, 15, -15, 0], y: [0, -10, 5, -8, 3, 0], s: [1, 1.05, 0.95, 1.08, 0.97, 1], dur: 10 },
  { w: 400, h: 400, right: '0%', top: -120, x: [0, -40, -50, -10, 15, 0], y: [0, 8, -5, 10, -3, 0], s: [1, 0.95, 1.1, 0.97, 1.05, 1], dur: 12 },
];

export default function GradientBlobs({ colors = defaultColors }: GradientBlobsProps) {
  const getColor = (i: number) => colors[i % colors.length];
  const getFade = (i: number) => (defaultFade[i % defaultFade.length]);

  return (
    <>
      {desktopBlobs.map((b, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="pointer-events-none absolute hidden md:block rounded-full"
          style={{
            width: b.w,
            height: b.h,
            left: b.left,
            top: b.top,
            filter: 'blur(80px)',
            opacity: 0.4,
            zIndex: 0,
            background: `radial-gradient(circle, ${getColor(i)} 0%, ${getColor(i)}00 ${getFade(i)})`
          }}
          animate={{ x: b.x, y: b.y, scale: b.s }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {mobileBlobs.map((b, i) => (
        <motion.div
          key={`m${i}`}
          aria-hidden
          className="pointer-events-none absolute md:hidden rounded-full"
          style={{
            width: b.w,
            height: b.h,
            ...(b.left ? { left: b.left } : { right: b.right }),
            top: b.top,
            filter: 'blur(80px)',
            opacity: 0.4,
            zIndex: 0,
            background: `radial-gradient(circle, ${getColor(i)} 0%, ${getColor(i)}00 ${getFade(i)})`
          }}
          animate={{ x: b.x, y: b.y, scale: b.s }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </>
  );
}
