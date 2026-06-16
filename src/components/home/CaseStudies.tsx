'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import Image from 'next/image';
import SectionHeader from '@/components/home/SectionHeader';
import FadeIn from '@/components/home/motion/FadeIn';
import { assets } from '@/components/home/assets';
import { CONSULT_URL } from '@/components/home/hooks/useStartUrl';
import { RYBBIT_EVENTS, rybbitClickAttrs } from '@/lib/rybbitEvents';

type MetricIcon = 'arrow' | 'zap' | 'medal';
type CaseMetric = { value: string; label: string; icon: MetricIcon };
type LocaleCase = {
  key: string;
  title: string;
  metrics: { value: string; label: string }[];
};
type CasesT = {
  badge: string;
  title: string;
  subtitle: string;
  learnMore: string;
  items: LocaleCase[];
};

const iconByCaseKey: Record<string, MetricIcon[]> = {
  cetc: ['zap', 'zap', 'medal'],
  cms: ['arrow', 'medal', 'zap'],
  snow: ['arrow', 'arrow', 'zap'],
  zhaozhao: ['zap', 'medal', 'medal']
};
const imageByCaseKey: Record<string, string> = {
  cetc: assets.cases.cetc,
  cms: assets.cases.cms,
  snow: assets.cases.snow,
  zhaozhao: assets.cases.zhaozhao
};

function IconDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <linearGradient id="case-metric-gradient" x1="0.497" x2="0.502" y1="0" y2="1">
          <stop offset="0" stopColor="rgb(203, 213, 225)" />
          <stop offset="1" stopColor="rgb(241, 245, 249)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MetricIconSvg({ kind, size }: { kind: MetricIcon; size?: number }) {
  const s = size ?? 15;
  if (kind === 'arrow') {
    return (
      <svg width={s} height={s} viewBox="0 0 14.431 20.008" style={{ flexShrink: 0 }} aria-hidden>
        <path
          d="M 7.538 0.147 L 14.326 7.925 C 14.435 8.051 14.462 8.228 14.393 8.38 C 14.325 8.532 14.173 8.63 14.007 8.63 L 10.669 8.63 C 10.457 8.628 10.277 8.785 10.249 8.995 C 9.999 10.805 8.49 18.814 1.336 19.999 C 1.143 20.039 0.948 19.94 0.866 19.761 C 0.783 19.582 0.835 19.37 0.99 19.249 C 2.216 18.289 3.817 16.427 4.268 13.116 C 4.439 11.771 4.524 10.416 4.517 9.059 C 4.516 8.823 4.328 8.63 4.092 8.624 L 0.426 8.624 C 0.259 8.625 0.107 8.527 0.038 8.375 C -0.031 8.223 -0.005 8.045 0.105 7.92 L 6.897 0.146 C 6.978 0.053 7.095 0 7.218 0 C 7.341 0 7.457 0.053 7.538 0.146 Z"
          fill="url(#case-metric-gradient)"
        />
      </svg>
    );
  }
  if (kind === 'zap') {
    return (
      <svg width={s} height={s} viewBox="0 0 14.62 20" style={{ flexShrink: 0 }} aria-hidden>
        <path
          d="M 4.655 11.705 L 0.732 11.705 C 0.22 11.705 -0.134 11.192 0.049 10.713 L 3.947 0.471 C 4.055 0.188 4.326 0 4.63 0 L 11.208 0 C 11.727 0 12.08 0.526 11.885 1.008 L 9.615 6.584 L 13.888 6.584 C 14.516 6.584 14.851 7.326 14.437 7.798 L 3.961 19.747 C 3.452 20.328 2.507 19.825 2.705 19.078 L 4.655 11.705 Z"
          fill="url(#case-metric-gradient)"
        />
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 20 19.582" style={{ flexShrink: 0 }} aria-hidden>
      <path
        d="M 15.67 0 C 16.374 0 16.934 0.571 16.934 1.264 L 16.934 2.747 C 18.681 3.154 20 4.725 20 6.593 C 20 8.659 18.396 10.374 16.374 10.538 C 15.415 12.725 13.35 14.322 10.879 14.595 L 10.879 17.824 L 13.297 17.824 C 13.78 17.824 14.176 18.22 14.176 18.703 C 14.176 19.187 13.78 19.582 13.297 19.582 L 6.703 19.582 C 6.22 19.582 5.824 19.187 5.824 18.703 C 5.824 18.22 6.22 17.824 6.703 17.824 L 9.121 17.824 L 9.121 14.564 C 6.766 14.217 4.806 12.663 3.879 10.549 C 1.736 10.506 0 8.747 0 6.593 C 0 4.637 1.439 3 3.308 2.692 L 3.308 1.264 C 3.308 0.56 3.879 0 4.571 0 Z M 10.527 3.67 C 10.231 3.088 9.791 3.088 9.549 3.67 L 8.769 5.286 L 7.011 5.528 C 6.418 5.626 6.275 6.066 6.714 6.505 L 7.989 7.824 L 7.692 9.681 C 7.593 10.308 7.934 10.56 8.473 10.264 L 10.044 9.385 L 11.615 10.319 C 12.154 10.615 12.494 10.374 12.396 9.736 L 12.099 7.879 L 13.374 6.56 C 13.813 6.121 13.67 5.681 13.066 5.571 L 11.308 5.33 Z M 3.308 4.494 C 2.418 4.769 1.758 5.604 1.758 6.593 C 1.758 7.604 2.44 8.462 3.363 8.703 C 3.33 8.45 3.308 8.198 3.308 7.934 Z M 16.934 7.945 C 16.934 8.176 16.912 8.396 16.89 8.626 C 17.681 8.297 18.242 7.506 18.242 6.604 C 18.243 5.734 17.73 4.945 16.934 4.593 Z"
        fill="url(#case-metric-gradient)"
      />
    </svg>
  );
}

type CaseStudy = { key: string; title: string; image: string; metrics: CaseMetric[] };

export default function CaseStudies({ t }: { t: CasesT }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const dragX = useMotionValue(0);
  const isDragging = useRef(false);
  const dragStartClientX = useRef(0);
  const dragStartVal = useRef(0);

  const cases: CaseStudy[] = t.items.map((it) => ({
    key: it.key,
    title: it.title,
    image: imageByCaseKey[it.key],
    metrics: it.metrics.map((m, i) => ({ ...m, icon: iconByCaseKey[it.key]?.[i] ?? 'arrow' }))
  }));
  const total = cases.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [isPaused, next]);

  const MAX_DRAG = 700;

  const onPointerDown = (clientX: number) => {
    isDragging.current = true;
    dragStartClientX.current = clientX;
    dragStartVal.current = dragX.get();
  };

  const onPointerMove = (clientX: number) => {
    if (!isDragging.current) return;
    const delta = clientX - dragStartClientX.current;
    const next = dragStartVal.current + delta;
    dragX.set(Math.max(-MAX_DRAG, Math.min(MAX_DRAG, next)));
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const d = dragX.get();
    if (d < -100) {
      next();
    } else if (d > 100) {
      prev();
    }
    animate(dragX, 0, { type: 'spring', stiffness: 300, damping: 30 });
  };

  return (
    <section className="py-[48px] px-[16px] md:py-[80px] md:px-[32px] bg-white overflow-hidden">
      <IconDefs />
      <div className="max-w-[min(92vw,1300px)] md:max-w-[min(85vw,1300px)] mx-auto flex flex-col gap-8 md:gap-12">
        <SectionHeader badge={t.badge} title={t.title} subtitle={t.subtitle} />

        <FadeIn delay={0.5}>
          <div
            className="relative select-none"
            style={{ cursor: 'grab' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onMouseDown={(e) => {
              e.preventDefault();
              onPointerDown(e.clientX);
            }}
            onMouseMove={(e) => onPointerMove(e.clientX)}
            onMouseUp={() => onPointerUp()}
            onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
            onTouchMove={(e) => onPointerMove(e.touches[0].clientX)}
            onTouchEnd={() => onPointerUp()}
          >
            <motion.div
              className="h-[380px] md:h-[540px] flex items-start md:items-center justify-center case-perspective"
              style={{ x: dragX }}
            >
              {cases.map((c, i) => {
                let offset = i - index;
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;
                const isCenter = offset === 0;
                const isAdjacent = Math.abs(offset) === 1;
                const isVisible = isCenter || isAdjacent;
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                const baseX = isMobile ? offset * 340 : offset * 660;
                return (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{
                      x: baseX,
                      scale: isCenter ? 1 : 0.78,
                      opacity: isVisible ? (isCenter ? 1 : 0.3) : 0,
                      zIndex: isCenter ? 10 : isAdjacent ? 5 : 0,
                      rotateY: isCenter ? 0 : offset > 0 ? 12 : -12
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.8 }}
                    className="absolute w-[82vw] max-w-[320px] md:w-[650px] md:max-w-none"
                    style={{ pointerEvents: isCenter ? 'auto' : 'none' }}
                  >
                    <CaseCard data={c} learnMore={t.learnMore} />
                  </motion.div>
                );
              })}
            </motion.div>

            <button
              onClick={prev}
              aria-label="上一个案例"
              className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-all z-20 left-1 md:left-[calc(50%-325px-56px)]"
              style={{ width: 40, height: 40, border: 'none', padding: 0, background: 'none' }}
            >
              <Image
                src="/images/home/cases/arrow-back.svg"
                alt=""
                width={40}
                height={40}
                loading="lazy"
                draggable={false}
              />
            </button>
            <button
              onClick={next}
              aria-label="下一个案例"
              className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-all z-20 right-1 md:right-[calc(50%-325px-56px)]"
              style={{ width: 40, height: 40, border: 'none', padding: 0, background: 'none' }}
            >
              <Image
                src="/images/home/cases/arrow-next.svg"
                alt=""
                width={40}
                height={40}
                loading="lazy"
                draggable={false}
              />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function CaseCard({ data, learnMore }: { data: CaseStudy; learnMore: string }) {
  return (
    <div
      className="flex flex-col rounded-2xl md:rounded-3xl p-4 md:p-6 gap-4 md:gap-6 overflow-hidden"
      style={{
        border: '1px solid #e2e8f0',
        backgroundColor: 'rgb(248, 250, 252)'
      }}
    >
      <div className="relative overflow-hidden rounded-none md:rounded-2xl aspect-[3/1] md:h-[200px]">
        <Image
          src={data.image}
          alt=""
          fill
          sizes="(min-width: 768px) 650px, 82vw"
          className="block select-none object-contain md:object-cover"
          loading="lazy"
          draggable={false}
        />
      </div>

      <div className="bg-white flex flex-col rounded-xl md:rounded-2xl p-3 md:p-4 gap-4 md:gap-6 md:justify-between">
        <h3
          className="text-[20px] md:text-[28px] leading-7 md:leading-9 tracking-[-0.4px] md:tracking-[-0.56px]"
          style={{
            fontWeight: 400,
            color: 'rgb(2, 6, 17)'
          }}
        >
          {data.title}
        </h3>

        <div className="grid grid-cols-3 gap-x-3 md:gap-x-6 py-3 md:py-4">
          {data.metrics.map((m, idx) => (
            <div
              key={m.label}
              className="flex flex-col gap-1.5 md:gap-2.5"
              style={{
                borderRight: idx < 2 ? '1px solid rgba(226, 232, 240, 0.5)' : 'none',
                paddingRight: idx < 2 ? 12 : 0,
                paddingLeft: idx > 0 ? 12 : 0
              }}
            >
              <div className="flex items-center gap-1 md:gap-2">
                <span
                  className={`${
                    m.value.length > 8 ? 'text-[9px] leading-3' : 'text-[12px] leading-4'
                  } md:text-lg md:leading-[26px]`}
                  style={{
                    fontWeight: 500,
                    color: 'rgb(2, 6, 23)'
                  }}
                >
                  {m.value}
                </span>
                <span className="hidden md:inline-block">
                  <MetricIconSvg kind={m.icon} size={20} />
                </span>
              </div>
              <div className="flex items-center md:items-start gap-1 md:gap-2.5">
                <span
                  className="text-[11px] md:text-[13px] leading-4 md:leading-5"
                  style={{
                    fontWeight: 400,
                    color: 'rgb(71, 85, 105)'
                  }}
                >
                  {m.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <a
          href={CONSULT_URL}
          target="_blank"
          rel="noopener noreferrer nofollow"
          {...rybbitClickAttrs(RYBBIT_EVENTS.businessConsultClick, 'home_case_study_consult', {
            case: data.key
          })}
          className="inline-flex items-center justify-center self-start transition-colors h-9 md:h-[46px] px-3 md:px-4 rounded-full text-[13px] md:text-base"
          style={{
            border: '1px solid #d3d4d4',
            fontWeight: 500,
            color: 'rgb(2, 6, 23)',
            background: 'linear-gradient(#fff 0%, #f5f6f7 100%)'
          }}
        >
          {learnMore}
        </a>
      </div>
    </div>
  );
}
