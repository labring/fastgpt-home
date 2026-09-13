'use client';

import * as m from 'framer-motion/m';

interface GradientBlobsProps {
  colors?: string[];
  // large=true 时使用与主页 Hero 一致的 720–760px 大光斑 + aurora 色相动画
  large?: boolean;
}

const defaultColors = ['#F4F5A0', '#C9A8F5'];

interface BlobSpec {
  w: number;
  h: number;
  left?: string;
  right?: string;
  ml?: number;
  top: number;
  x: number[];
  y: number[];
  s: number[];
  dur: number;
  delay?: number;
}

// 默认（小）光斑 — 供 /price 等页面使用
const defaultDesktop: BlobSpec[] = [
  { w: 620, h: 620, left: '15%', top: -160, x: [0, 80, 120, 40, -20, 0], y: [0, -20, 10, -15, 5, 0], s: [1, 1.05, 0.95, 1.08, 0.97, 1], dur: 10 },
  { w: 620, h: 620, left: '35%', top: -140, x: [0, -80, -100, -30, 30, 0], y: [0, 15, -10, 20, -5, 0], s: [1, 0.95, 1.1, 0.97, 1.05, 1], dur: 12 }
];

const defaultMobile: BlobSpec[] = [
  { w: 400, h: 400, left: '0%', top: -140, x: [0, 40, 60, 15, -15, 0], y: [0, -10, 5, -8, 3, 0], s: [1, 1.05, 0.95, 1.08, 0.97, 1], dur: 10 },
  { w: 400, h: 400, right: '0%', top: -120, x: [0, -40, -50, -10, 15, 0], y: [0, 8, -5, 10, -3, 0], s: [1, 0.95, 1.1, 0.97, 1.05, 1], dur: 12 }
];

// 大光斑 — 与主页 Hero 一致（4 个桌面 + 3 个移动光斑，720–760px）
const largeDesktop: BlobSpec[] = [
  { w: 720, h: 720, left: '5%', top: -60, x: [0, 180, 240, 80, -40, 0], y: [0, 40, -30, 60, 15, 0], s: [1, 1.15, 0.9, 1.1, 0.95, 1], dur: 14 },
  { w: 760, h: 760, left: '20%', top: -80, x: [0, -160, -220, -60, 40, 0], y: [0, 30, 80, -25, 55, 0], s: [1, 0.9, 1.2, 0.95, 1.1, 1], dur: 16 },
  { w: 660, h: 660, left: '30%', top: -20, x: [0, 140, -160, 100, -60, 0], y: [0, -60, -15, 45, -30, 0], s: [1, 1.1, 0.85, 1.2, 0.9, 1], dur: 18, delay: 1.5 },
  { w: 600, h: 600, left: '40%', top: 20, x: [0, -100, 160, -40, 100, 0], y: [0, 40, -50, 70, -15, 0], s: [1, 0.95, 1.15, 0.9, 1.1, 1], dur: 20, delay: 3 }
];

const largeMobile: BlobSpec[] = [
  { w: 520, h: 520, left: '10%', top: 120, x: [0, 60, 120, 20, -20, 0], y: [0, 20, -10, 30, 10, 0], s: [1, 1.15, 0.9, 1.1, 0.95, 1], dur: 14 },
  { w: 540, h: 540, right: '10%', top: 100, x: [0, -60, -100, -20, 20, 0], y: [0, 20, 40, -15, 30, 0], s: [1, 0.9, 1.2, 0.95, 1.1, 1], dur: 16 },
  { w: 460, h: 460, left: '50%', top: 200, ml: -230, x: [0, 60, -80, 40, -20, 0], y: [0, -20, -5, 15, -10, 0], s: [1, 1.1, 0.85, 1.2, 0.9, 1], dur: 18, delay: 1.5 }
];

export default function GradientBlobs({ colors = defaultColors, large = false }: GradientBlobsProps) {
  const desktop = large ? largeDesktop : defaultDesktop;
  const mobile = large ? largeMobile : defaultMobile;
  const opacity = large ? 0.6 : 0.4;

  const render = (blobs: BlobSpec[], isMobile: boolean) =>
    blobs.map((b, i) => {
      const color = colors[i % colors.length];
      return (
        <m.div
          key={`${isMobile ? 'm' : 'd'}${i}`}
          aria-hidden
          className={`pointer-events-none absolute rounded-full ${isMobile ? 'md:hidden' : 'hidden md:block'}`}
          style={{
            width: b.w,
            height: b.h,
            ...(b.left ? { left: b.left } : { right: b.right }),
            top: b.top,
            ...(b.ml ? { marginLeft: b.ml } : {}),
            filter: 'blur(80px)',
            opacity,
            zIndex: 0,
            background: `radial-gradient(circle, ${color} 0%, ${color}00 70%)`,
            ...(large ? { animation: 'aurora-hue 20s ease-in-out infinite' } : {})
          }}
          animate={{ x: b.x, y: b.y, scale: b.s }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay || 0 }}
        />
      );
    });

  return (
    <>
      {render(desktop, false)}
      {render(mobile, true)}
    </>
  );
}
