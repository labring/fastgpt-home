'use client';

import { ArrowUpRight } from 'lucide-react';
import { useScroll, useSpring, useTransform } from 'framer-motion';
import * as m from 'framer-motion/m';
import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';
import { getHeroDashboardAsset } from '@/components/home/assets';
import { useStartUrl } from '@/components/home/hooks/useStartUrl';
import { useContactUrl } from '@/components/home/hooks/useContactUrl';
import { formatGitHubStars } from '@/lib/githubStarsDisplay';
import { RYBBIT_EVENTS, rybbitClickAttrs } from '@/lib/rybbitEvents';

interface HeroProps {
  stars: number;
  locale: string;
  t: {
    githubStars: string;
    followUs: string;
    brand: string;
    title: string;
    subtitle: string;
    trial: string;
    consult: string;
  };
  children?: ReactNode;
}

const blobs = [
  { w: 720, h: 720, left: '5%', top: -60, color: '#FBD0DF', x: [0, 180, 240, 80, -40, 0], y: [0, 40, -30, 60, 15, 0], s: [1, 1.15, 0.9, 1.1, 0.95, 1], dur: 14 },
  { w: 760, h: 760, left: '20%', top: -80, color: '#D4D6FF', x: [0, -160, -220, -60, 40, 0], y: [0, 30, 80, -25, 55, 0], s: [1, 0.9, 1.2, 0.95, 1.1, 1], dur: 16 },
  { w: 660, h: 660, left: '30%', top: -20, color: '#C6DBFF', x: [0, 140, -160, 100, -60, 0], y: [0, -60, -15, 45, -30, 0], s: [1, 1.1, 0.85, 1.2, 0.9, 1], dur: 18, delay: 1.5 },
  { w: 600, h: 600, left: '40%', top: 20, color: '#EFD6FF', x: [0, -100, 160, -40, 100, 0], y: [0, 40, -50, 70, -15, 0], s: [1, 0.95, 1.15, 0.9, 1.1, 1], dur: 20, delay: 3 },
];

const mobileBlobs = [
  { w: 520, h: 520, left: '10%', top: 120, color: '#FBD0DF', x: [0, 60, 120, 20, -20, 0], y: [0, 20, -10, 30, 10, 0], s: [1, 1.15, 0.9, 1.1, 0.95, 1], dur: 14 },
  { w: 540, h: 540, right: '10%', top: 100, color: '#D4D6FF', x: [0, -60, -100, -20, 20, 0], y: [0, 20, 40, -15, 30, 0], s: [1, 0.9, 1.2, 0.95, 1.1, 1], dur: 16 },
  { w: 460, h: 460, left: '50%', top: 200, ml: -230, color: '#C6DBFF', x: [0, 60, -80, 40, -20, 0], y: [0, -20, -5, 15, -10, 0], s: [1, 1.1, 0.85, 1.2, 0.9, 1], dur: 18, delay: 1.5 },
];

export default function Hero({ stars: initialStars, locale, t, children }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    queueMicrotask(() => setIsDesktop(mq.matches));
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 500, damping: 60, mass: 1 });
  const rotateX = useTransform(smoothProgress, [0, 0.20], [25, 0]);
  const scale = useTransform(smoothProgress, [0, 0.20], [0.95, 1]);
  const offsetY = useTransform(smoothProgress, [0, 0.20], isDesktop ? [-160, 0] : [-80, 0]);

  const startUrl = useStartUrl();
  const contactUrl = useContactUrl(locale);
  const formattedStars = formatGitHubStars(initialStars);
  const heroDashboard = getHeroDashboardAsset(locale);

  return (
    <section
      ref={containerRef}
      className="relative pt-[120px] pb-[48px] md:pt-[160px] md:pb-[48px] bg-white overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Desktop gradient blobs */}
      {blobs.map((b, i) => (
        <m.div
          key={i}
          aria-hidden
          className="pointer-events-none absolute hidden md:block rounded-full"
          style={{
            width: b.w,
            height: b.h,
            left: b.left,
            top: b.top,
            filter: 'blur(80px)',
            opacity: 0.6,
            zIndex: 0,
            background: `radial-gradient(circle, ${b.color} 0%, ${b.color}00 70%)`,
            animation: 'aurora-hue 20s ease-in-out infinite'
          }}
          animate={{ x: b.x, y: b.y, scale: b.s }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay || 0 }}
        />
      ))}

      {/* Mobile gradient blobs */}
      {mobileBlobs.map((b, i) => (
        <m.div
          key={`m${i}`}
          aria-hidden
          className="pointer-events-none absolute md:hidden rounded-full"
          style={{
            width: b.w,
            height: b.h,
            ...(b.left ? { left: b.left } : { right: b.right }),
            top: b.top,
            ...(b.ml ? { marginLeft: b.ml } : {}),
            filter: 'blur(80px)',
            opacity: 0.6,
            zIndex: 0,
            background: `radial-gradient(circle, ${b.color} 0%, ${b.color}00 70%)`,
            animation: 'aurora-hue 20s ease-in-out infinite'
          }}
          animate={{ x: b.x, y: b.y, scale: b.s }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay || 0 }}
        />
      ))}

      {/* Main content column */}
      <div className="relative flex flex-col gap-[32px] md:gap-[50px]" style={{ zIndex: 1 }}>


          {/* Text content */}
          <div className="relative max-w-[min(92vw,1300px)] md:max-w-[min(85vw,1300px)] mx-auto flex flex-col items-center text-center gap-[50px] md:gap-[32px] px-[16px] md:px-[32px]">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-[12px] h-[30px] px-[8px] rounded-full border border-[#e5e7eb] bg-white/70"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-ink">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="text-[12px] leading-[18px]" style={{ color: 'rgb(71, 85, 105)' }}>{t.githubStars} {formattedStars}</span>
              <a
                href="https://github.com/labring/FastGPT"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-0.5 text-[12px] text-primary hover:text-primary-dark leading-[18px]"
              >
                {t.followUs}
                <ArrowUpRight size={14} />
              </a>
            </m.div>

            <div className="flex flex-col items-center gap-[24px] md:gap-[24px]">
              <div className="flex flex-col items-center">
                <m.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: 'rgb(78, 88, 130)' }}
                  className="text-[58px] leading-[38px] tracking-[-1.74px] mb-[16px] md:mb-0 md:text-[58px] md:leading-[78px] md:tracking-[-1.74px]"
                >
                  {t.brand}
                </m.p>
                <h1 className="text-ink text-[48px] leading-[62px] tracking-[-1.44px] md:text-[58px] md:leading-[78px] md:tracking-[-1.74px] font-semibold">
                  {t.title}
                </h1>
              </div>

              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                className="w-full text-[18px] md:text-[18px] leading-[26px] md:leading-[32px] tracking-[-0.18px] md:tracking-[-0.18px] max-w-xl"
                style={{ color: '#4b5563' }}
              >
                {t.subtitle}
              </m.p>
            </div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center w-full sm:w-auto gap-[32px] sm:gap-8"
              data-hero-cta
            >
              <m.a
                href={contactUrl}
                data-consultation-trigger="true"
                {...rybbitClickAttrs(RYBBIT_EVENTS.businessConsultClick, 'home_hero_consult')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                aria-label={t.consult}
                className="inline-flex items-center justify-center h-11 w-full sm:w-auto sm:min-w-[128px] px-8 rounded-full text-[16px] sm:text-[1rem] font-medium text-white bg-btn-dark border border-transparent tracking-[0.5px]"
              >
                {t.consult}
              </m.a>
              <m.a
                href={startUrl}
                rel="noopener noreferrer nofollow"
                {...rybbitClickAttrs(RYBBIT_EVENTS.cloudServiceClick, 'home_hero_trial')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                aria-label={t.trial}
                className="inline-flex items-center justify-center h-11 w-full sm:w-auto sm:min-w-[128px] px-8 rounded-full text-[16px] sm:text-[1rem] font-medium text-ink bg-btn-light-bg tracking-[0.5px] backdrop-blur-sm hover:bg-white/80 transition-colors"
                style={{ border: '1px solid rgb(209, 213, 219)' }}
              >
                {t.trial}
              </m.a>
            </m.div>
          </div>

          {/* Dashboard image — outside text container, own padding */}
          <div
            className="relative mx-auto mt-0 md:mt-[48px] px-[16px] md:px-[32px] lg:px-[80px]"
            style={{ perspective: 1900 }}
          >
            <m.div
              // Avoid applying the desktop transform during the mobile
              // hydration frame, where it can push the dashboard over the
              // second CTA before the viewport query has resolved.
              style={isDesktop ? { rotateX, scale, y: offsetY, transformStyle: 'preserve-3d' } : {}}
              className="hero-image-fade origin-bottom"
            >
              <Image
                src={heroDashboard}
                alt={t.title}
                width={3600}
                height={1944}
                loading="lazy"
                fetchPriority="low"
                sizes="100vw"
                className="block w-full h-auto"
                draggable={false}
              />
            </m.div>
          </div>

        {/* TrustedBy + Stats passed as children */}
        {children}

      </div>{/* end main content column */}
    </section>
  );
}
