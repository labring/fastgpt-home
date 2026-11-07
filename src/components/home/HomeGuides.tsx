import Link from 'next/link';
import { guideBuildEntries } from '@/content/guides/registry';
import { getGuideReviewPath, resolveGuideLocale } from '@/lib/guideSeo';

const copy = {
  zh: {
    eyebrow: '精选指南',
    title: '从知识库到 RAG 落地',
    description: '围绕选型、实施与运营，阅读可执行的 FastGPT 企业 AI 实践。',
    allGuides: '浏览全部指南'
  },
  en: {
    eyebrow: 'Featured Guides',
    title: 'From Knowledge Base to RAG',
    description: 'Practical FastGPT guidance for evaluation, implementation, and operations.',
    allGuides: 'Browse all guides'
  }
} as const;

export default function HomeGuides({ locale }: { locale: string }) {
  const guideLocale = resolveGuideLocale(locale) || 'en';
  const t = copy[guideLocale];
  const entries = guideBuildEntries.slice(0, 16);

  return (
    <section
      id="home-guides"
      className="scroll-mt-24 bg-white px-[16px] py-[48px] md:px-[32px] md:py-[80px]"
    >
      <div className="mx-auto flex max-w-[min(92vw,1300px)] flex-col gap-8 md:max-w-[min(85vw,1300px)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-sub">
              {t.eyebrow}
            </span>
            <h2 className="mt-3 text-[28px] font-semibold leading-[36px] text-ink md:text-[40px] md:leading-[48px]">
              {t.title}
            </h2>
            <p className="mt-3 text-[16px] leading-[26px] text-ink-sub">{t.description}</p>
          </div>
          <Link
            href={getGuideReviewPath(guideLocale)}
            className="text-[14px] font-medium text-primary hover:text-primary-dark"
          >
            {t.allGuides} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => {
            const source = entry[guideLocale];
            return (
              <li key={entry.slug}>
                <Link
                  href={getGuideReviewPath(guideLocale, entry.slug)}
                  className="flex h-full flex-col gap-4 rounded-lg border border-hairline-soft bg-white p-5 transition-colors hover:border-primary/40"
                >
                  <h3 className="text-[18px] font-medium leading-[26px] text-ink">{source.h1}</h3>
                  <p className="text-[14px] leading-[22px] text-ink-sub">{source.metaDescription}</p>
                  <span className="mt-auto text-[13px] font-medium text-primary">
                    {guideLocale === 'zh' ? '阅读指南' : 'Read guide'}{' '}
                    <span aria-hidden="true">↗</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
