'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Blocks,
  Mail,
  MessagesSquare,
  Network,
  Rocket
} from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import { getContactCopy, getContactExperienceCopy } from '@/components/contact/contactCopy';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import { getCasesAssets } from '@/components/home/assets';
import { getDefaultLocalePath } from '@/lib/clientNavigation';
import { getContactLocale } from '@/lib/contact';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BRAND_LOGOS = [
  'image-143.png',
  'image-151.png',
  'image-153.png',
  'image-157.png',
  'image-169.png',
  'image-171.png',
  'image-173.png',
  'image-175.png',
  'image-186.png',
  'image-190.png',
  'image-204.png',
  'image-223.png'
];

const SERVICE_IMAGES: Record<string, string> = {
  community: 'https://picsum.photos/seed/fastgpt-open-source/1600/1200',
  consult: 'https://picsum.photos/seed/fastgpt-consulting/1600/1200',
  deploy: 'https://picsum.photos/seed/fastgpt-deployment/1600/1200',
  custom: 'https://picsum.photos/seed/fastgpt-enterprise/1600/1200'
};

const SERVICE_ICONS = {
  community: Blocks,
  consult: MessagesSquare,
  deploy: Rocket,
  custom: Network
};

export default function ContactPage({
  locale,
  dict,
  embedded = false
}: {
  locale: string;
  dict: any;
  embedded?: boolean;
}) {
  const contactLocale = getContactLocale(locale);
  const formCopy = getContactCopy(contactLocale);
  const copy = getContactExperienceCopy(contactLocale);
  const homeHref = getDefaultLocalePath(contactLocale, '/');
  const caseAssets = getCasesAssets(contactLocale);
  const caseImages: Record<string, string> = {
    cetc: caseAssets.cetc,
    cms: caseAssets.cms,
    snow: caseAssets.snow
  };
  const [activeService, setActiveService] = useState(0);
  const [activeCase, setActiveCase] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const casesRef = useRef<HTMLElement>(null);
  const casesTitleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-hero-reveal]', {
          opacity: 0,
          y: 30,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out'
        });
      });

      media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const section = casesRef.current;
        const title = casesTitleRef.current;
        if (!section || !title) return;

        ScrollTrigger.create({
          trigger: section,
          start: 'top top+=96',
          end: 'bottom bottom-=120',
          pin: title,
          pinSpacing: false
        });

        const cards = gsap.utils.toArray<HTMLElement>('[data-case-card]', section);
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0.35, scale: 0.86, y: 90 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                end: 'top 28%',
                scrub: true,
                onEnter: () => setActiveCase(index),
                onEnterBack: () => setActiveCase(index)
              }
            }
          );

          if (index < cards.length - 1) {
            gsap.to(card, {
              opacity: 0.28,
              scale: 0.92,
              filter: 'brightness(0.55)',
              ease: 'none',
              scrollTrigger: {
                trigger: cards[index + 1],
                start: 'top 82%',
                end: 'top 32%',
                scrub: true
              }
            });
          }
        });
      });

      return () => media.revert();
    },
    { scope: rootRef }
  );

  if (embedded) {
    return (
      <div className="home min-h-screen bg-white text-ink">
        <ContactForm locale={contactLocale} variant="modal" />
      </div>
    );
  }

  const moveToCase = (offset: number) => {
    const nextIndex = (activeCase + offset + copy.cases.items.length) % copy.cases.items.length;
    const cards = casesRef.current?.querySelectorAll<HTMLElement>('[data-case-card]');
    setActiveCase(nextIndex);
    cards?.[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div
      ref={rootRef}
      className="home min-h-screen bg-white text-ink"
      style={{ fontFamily: "'Satoshi', 'PingFang SC', 'Microsoft YaHei', sans-serif" }}
    >
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap"
      />
      <HomeThemeFix />

      <Navbar links={dict.links} t={dict.Home.navCta} locale={contactLocale} />

      <main className="overflow-x-hidden w-full max-w-full">
        <section className="relative overflow-hidden bg-white px-5 pb-32 pt-36 text-ink sm:px-8 md:pb-48 md:pt-44">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_68%_18%,rgba(59,130,246,0.12),transparent_34%),radial-gradient(circle_at_18%_58%,rgba(148,163,184,0.12),transparent_32%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-white"
          />

          <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
            <h1
              data-hero-reveal
              className="m-0 w-full max-w-6xl text-balance font-semibold leading-[0.98] tracking-[-0.055em] text-ink"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.75rem)' }}
            >
              {copy.hero.title}
            </h1>
            <p
              data-hero-reveal
              className="mt-7 max-w-3xl text-[17px] leading-7 text-ink-sub sm:text-[19px] sm:leading-8"
            >
              {copy.hero.body}
            </p>
            <div
              data-hero-reveal
              className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row"
            >
              <a
                href="#consultation"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-btn-dark px-7 text-[14px] font-semibold text-white transition-[transform,opacity] duration-300 hover:scale-[1.03] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {copy.hero.primaryAction}
                <ArrowDown size={16} aria-hidden />
              </a>
              <Link
                href={homeHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-btn-light-border bg-btn-light-bg px-7 text-[14px] font-semibold text-ink backdrop-blur-md transition-[transform,background-color] duration-300 hover:scale-[1.03] hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {copy.hero.secondaryAction}
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>

            <section
              id="consultation"
              data-hero-reveal
              aria-label={formCopy.title}
              className="mt-16 w-full max-w-5xl scroll-mt-24 overflow-hidden rounded-[28px] border border-hairline-soft bg-white text-left shadow-[0_32px_90px_rgba(15,23,42,0.12)] sm:mt-20"
            >
              <div className="border-b border-hairline-soft px-5 py-6 sm:px-8 sm:py-7">
                <h2 className="m-0 text-[24px] font-semibold leading-8 tracking-[-0.03em] text-ink sm:text-[30px] sm:leading-10">
                  {formCopy.title}
                </h2>
                <p className="mt-2 max-w-2xl text-[14px] leading-6 text-ink-sub sm:text-[15px]">
                  {formCopy.subtitle}
                </p>
              </div>
              <ContactForm locale={contactLocale} variant="page" />
            </section>
          </div>
        </section>

        <section className="bg-light-bg px-5 py-32 sm:px-8 md:py-48">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-14 max-w-4xl md:mb-20">
              <h2 className="m-0 text-balance text-[40px] font-semibold leading-[1.05] tracking-[-0.045em] text-ink sm:text-[56px] lg:text-[68px]">
                {copy.services.title}
              </h2>
              <p className="mt-6 max-w-2xl text-[16px] leading-7 text-ink-sub sm:text-[18px]">
                {copy.services.body}
              </p>
            </div>

            <div className="grid grid-flow-dense grid-cols-1 gap-px overflow-hidden rounded-[28px] bg-hairline-soft md:grid-cols-4 md:grid-rows-2 lg:flex lg:h-[560px]">
              {copy.services.items.map((item, index) => {
                const Icon = SERVICE_ICONS[item.key as keyof typeof SERVICE_ICONS];
                const active = activeService === index;
                return (
                  <button
                    key={item.key}
                    type="button"
                    aria-expanded={active}
                    onMouseEnter={() => setActiveService(index)}
                    onFocus={() => setActiveService(index)}
                    onClick={() => setActiveService(index)}
                    className={`group relative min-h-[340px] overflow-hidden text-left transition-[flex] duration-700 ease-out focus-visible:z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/35 md:col-span-2 md:row-span-1 lg:col-auto lg:row-auto lg:min-h-0 ${
                      active ? 'lg:flex-[2.2]' : 'lg:flex-1'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 bg-cover bg-center grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 ${
                        active ? 'scale-105' : 'scale-100'
                      }`}
                      style={{ backgroundImage: `url('${SERVICE_IMAGES[item.key]}')` }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/62 to-[#020617]/10"
                    />
                    <span className="absolute inset-x-0 bottom-0 flex min-h-[210px] flex-col justify-end p-6 text-white sm:p-8">
                      <span className="mb-6 inline-flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
                        <Icon size={18} strokeWidth={1.8} aria-hidden />
                      </span>
                      <span className="text-[24px] font-semibold leading-8 tracking-[-0.025em]">
                        {item.title}
                      </span>
                      <span
                        className={`mt-3 block overflow-hidden text-[14px] leading-6 text-white/72 transition-[max-height,opacity] duration-500 lg:min-w-[260px] ${
                          active
                            ? 'max-h-24 opacity-100'
                            : 'max-h-0 opacity-0 lg:max-h-24 lg:opacity-55'
                        }`}
                      >
                        {item.body}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section
          ref={casesRef}
          className="relative bg-white px-5 py-32 text-ink sm:px-8 md:py-48"
        >
          <div className="mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div ref={casesTitleRef} className="self-start">
              <h2 className="m-0 max-w-xl text-balance text-[40px] font-semibold leading-[1.05] tracking-[-0.045em] text-ink sm:text-[56px] lg:text-[68px]">
                {copy.cases.title}
              </h2>
              <p className="mt-6 max-w-lg text-[16px] leading-7 text-ink-sub sm:text-[18px]">
                {copy.cases.body}
              </p>
              <div className="mt-9 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => moveToCase(-1)}
                  aria-label={copy.cases.previous}
                  className="inline-flex size-12 items-center justify-center rounded-full border border-btn-light-border bg-white text-ink transition-[transform,background-color] hover:scale-105 hover:bg-light-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ArrowLeft size={18} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => moveToCase(1)}
                  aria-label={copy.cases.next}
                  className="inline-flex size-12 items-center justify-center rounded-full border border-btn-light-border bg-white text-ink transition-[transform,background-color] hover:scale-105 hover:bg-light-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ArrowRight size={18} aria-hidden />
                </button>
                <span className="ml-3 text-[13px] font-medium tabular-nums text-ink-muted">
                  {String(activeCase + 1).padStart(2, '0')} /{' '}
                  {String(copy.cases.items.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="space-y-[22vh] pb-[8vh] lg:pb-[20vh]">
              {copy.cases.items.map((item) => (
                <article
                  key={item.key}
                  data-case-card
                  className="group sticky top-24 min-h-[560px] overflow-hidden rounded-[30px] border border-hairline-soft bg-[#111827] shadow-[0_36px_90px_rgba(15,23,42,0.20)]"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={caseImages[item.key]}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover opacity-60 grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/72 to-transparent" />
                  </div>
                  <div className="relative flex min-h-[560px] flex-col justify-end p-6 sm:p-9 lg:p-11">
                    <h3 className="m-0 max-w-2xl text-[28px] font-semibold leading-[1.15] tracking-[-0.035em] text-white sm:text-[38px]">
                      {item.title}
                    </h3>
                    <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-3">
                      {item.metrics.map((metric) => (
                        <div key={metric.label} className="bg-[#020617]/78 p-5 backdrop-blur-md">
                          <div className="text-[28px] font-semibold tracking-[-0.03em] text-white">
                            {metric.value}
                          </div>
                          <div className="mt-1 text-[12px] leading-5 text-white/55">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-light-bg py-32 md:py-48">
          <div className="mx-auto max-w-[1240px] px-5 text-center sm:px-8">
            <h2 className="m-0 mx-auto max-w-5xl text-balance text-[38px] font-semibold leading-[1.08] tracking-[-0.045em] text-ink sm:text-[54px] lg:text-[64px]">
              {copy.customers.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 text-ink-sub sm:text-[18px]">
              {copy.customers.body}
            </p>
          </div>

          <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="contact-marquee-track flex w-max items-center gap-4 pr-4">
              {[...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  aria-hidden={index >= BRAND_LOGOS.length}
                  className="flex h-24 w-52 shrink-0 items-center justify-center rounded-2xl border border-hairline-soft bg-white px-8 transition-transform duration-700 ease-out hover:scale-105"
                >
                  <Image
                    src={`/images/home/brands/brands solo/${logo}`}
                    alt={index < BRAND_LOGOS.length ? `FastGPT customer logo ${index + 1}` : ''}
                    width={150}
                    height={60}
                    loading="lazy"
                    className="max-h-11 w-auto object-contain grayscale"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-light-bg px-5 py-32 text-ink sm:px-8 md:py-48">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_76%_24%,rgba(59,130,246,0.12),transparent_34%),radial-gradient(circle_at_24%_74%,rgba(148,163,184,0.10),transparent_32%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
          />
          <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
            <h2 className="m-0 text-balance text-[42px] font-semibold leading-[1.02] tracking-[-0.05em] text-ink sm:text-[60px] lg:text-[76px]">
              {copy.action.title}
            </h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-ink-sub">{copy.action.body}</p>
            <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <a
                href="#consultation"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-btn-dark px-7 text-[14px] font-semibold text-white transition-[transform,opacity] hover:scale-[1.03] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {copy.action.form}
                <ArrowDown size={16} aria-hidden />
              </a>
              <a
                href="mailto:Dennis@sealos.io"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-btn-light-border bg-btn-light-bg px-7 text-[14px] font-semibold text-ink backdrop-blur-md transition-[transform,background-color] hover:scale-[1.03] hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {copy.action.email}
                <Mail size={16} aria-hidden />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer t={dict.Home.footer} locale={contactLocale} />

      <style jsx global>{`
        @keyframes contact-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .contact-marquee-track {
          animation: contact-marquee 34s linear infinite;
          will-change: transform;
        }

        .contact-marquee-track:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
