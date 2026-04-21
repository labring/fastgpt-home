'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import FadeIn from '@/components/home/motion/FadeIn';
import { useStartUrl, CONSULT_URL } from '@/components/home/hooks/useStartUrl';

// Globe is heavy (WebGL + 16k samples + rAF loop). Load on the client only,
// and defer even that to when the CTA card nears the viewport so the earlier
// sections don't pay for globe init during their own scroll animations.
const GlobeCanvas = dynamic(() => import('@/components/home/GlobeCanvas'), {
  ssr: false
});

type CTAT = {
  brand: string;
  title: string;
  subtitle: string;
  trial: string;
  consult: string;
};

export default function CTA({ t }: { t: CTAT }) {
  const startUrl = useStartUrl();
  const globeWrapRef = useRef<HTMLDivElement | null>(null);
  const [globeReady, setGlobeReady] = useState(false);

  // Only mount the WebGL canvas once the CTA card is about to scroll into view.
  // Before that, the globe slot stays empty — no canvas, no rAF loop, no layout
  // jank as the reader scrolls down through the preceding sections.
  useEffect(() => {
    const el = globeWrapRef.current;
    if (!el || globeReady) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGlobeReady(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [globeReady]);

  return (
    <section className="py-14 md:py-20 bg-light-bg">
      <div className="max-w-[min(92vw,1300px)] md:max-w-[min(85vw,1300px)] mx-auto px-4 md:px-6">
        <FadeIn>
          <div
            className="relative overflow-hidden bg-white min-h-[560px] md:h-[610px] md:min-h-0"
            style={{
              borderRadius: 24,
              boxShadow:
                'rgba(3, 7, 18, 0.04) 0px 2px 4px 0px, rgba(3, 7, 18, 0.08) 0px 1px 2px -1px, rgba(3, 7, 18, 0.08) 0px 0px 0px 1px'
            }}
          >
            {/* Details block: absolute on desktop (anchored bottom-left); on
                mobile flows in normal document order. Lifted to z-10 so the
                buttons always render above the globe corner peek on mobile. */}
            <div className="relative z-10 md:absolute md:left-8 md:top-[165px] flex flex-col gap-8 md:gap-[32px] p-6 md:p-0 w-full md:w-[min(46%,520px)]">
              <div className="flex flex-col" style={{ rowGap: 24 }}>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="m-0 text-ink text-[28px] md:text-[36px] font-semibold leading-[36px] md:leading-[48px] tracking-[-0.56px] md:tracking-[-0.72px]"
                >
                  {t.brand}
                  <br />
                  {t.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="m-0 text-ink-sub text-[20px] font-normal leading-[32px] tracking-[-0.2px]"
                >
                  {t.subtitle}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-8"
              >
                <motion.a
                  href={startUrl}
                  rel="noopener noreferrer nofollow"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={t.trial}
                  className="inline-flex items-center justify-center h-11 px-8 rounded-[99px] text-[16px] font-semibold leading-[1.5em] bg-btn-light-bg border border-btn-light-border text-[#3d3d3d] transition-colors hover:bg-white/80"
                >
                  {t.trial}
                </motion.a>
                <motion.a
                  href={CONSULT_URL}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={t.consult}
                  className="inline-flex items-center justify-center h-11 px-8 rounded-[99px] text-[16px] font-medium leading-[20px] tracking-[-0.12px] bg-btn-dark border border-btn-border text-white transition-opacity hover:opacity-90"
                >
                  {t.consult}
                </motion.a>
              </motion.div>
            </div>

            {/* Globe slot. Canvas is only created once `globeReady` flips.
                No scale transition on the wrapper — scaling a canvas forces
                the compositor to resample every pixel which visibly hitches
                while cobe initializes. Fade opacity only. */}
            <div
              ref={globeWrapRef}
              className="
                absolute z-0 left-1/5 -translate-x-1/2 -bottom-[200px] w-[440px] h-[440px]
                md:translate-x-0 md:left-[49%] md:right-[-160px] md:top-[48px] md:bottom-auto md:w-auto md:h-[880px] md:z-auto
                pointer-events-none md:pointer-events-auto
                transition-opacity duration-700 ease-out
              "
              style={{
                opacity: globeReady ? 1 : 0,
                WebkitMaskImage:
                  'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%)',
                maskImage:
                  'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%)'
              }}
            >
              {globeReady && <GlobeCanvas />}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
