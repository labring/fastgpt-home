import { ArrowRight, ArrowUpRight, Workflow } from 'lucide-react';
import CloudEntryLink from '@/components/home/CloudEntryLink';
import { getFaqPath } from '@/lib/localizedRoutes';

interface RelatedFAQ {
  id: string;
  question: string;
}

interface FAQSidebarProps {
  category: string;
  langName: string;
  relatedFAQs: RelatedFAQ[];
  copy: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    relatedQuestions: string;
    viewAll: string;
  };
}

export default function FAQSidebar({ category, langName, relatedFAQs, copy }: FAQSidebarProps) {
  return (
    <aside aria-label={copy.title}>
      <section
        className="relative overflow-hidden rounded-[8px] bg-[#070d1d] px-6 pb-6 pt-7 text-white shadow-[0_20px_45px_rgba(15,23,42,0.16)]"
        aria-labelledby="faq-sidebar-title"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'linear-gradient(to bottom left, black, transparent 68%)',
            WebkitMaskImage: 'linear-gradient(to bottom left, black, transparent 68%)'
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/10">
            <Workflow className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
          </div>
          <p className="mb-3 text-[11px] font-semibold leading-4 text-white/60">{copy.eyebrow}</p>
          <p
            id="faq-sidebar-title"
            className="mb-3 text-[24px] font-semibold leading-[32px] text-white [text-wrap:balance]"
          >
            {copy.title}
          </p>
          <p className="mb-6 text-[14px] leading-[22px] text-white/65 [text-wrap:pretty]">
            {copy.description}
          </p>
          <CloudEntryLink
            source="faq_detail_sidebar_trial"
            data-rybbit-prop-category={category}
            rel="noopener noreferrer nofollow"
            aria-label={`${copy.cta}: ${copy.title}`}
            className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-[6px] bg-white px-5 text-[14px] font-semibold text-[#070d1d] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#f1f5f9] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#070d1d]"
          >
            <span>{copy.cta}</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </CloudEntryLink>
        </div>
      </section>

      {relatedFAQs.length > 0 && (
        <nav
          className="mt-4 hidden rounded-[8px] bg-white px-5 py-5 shadow-[0_12px_34px_rgba(65,78,100,0.07)] ring-1 ring-slate-200/70 lg:block"
          aria-labelledby="faq-sidebar-related"
        >
          <p
            id="faq-sidebar-related"
            className="mb-2 text-[13px] font-semibold leading-5 text-[#020617]"
          >
            {copy.relatedQuestions}
          </p>
          <div>
            {relatedFAQs.slice(0, 3).map((item) => (
              <a
                key={item.id}
                href={getFaqPath(langName, item.id)}
                className="block border-b border-slate-100 py-3 text-[13px] leading-5 text-slate-500 transition-colors duration-200 hover:text-[#020617] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {item.question}
              </a>
            ))}
          </div>
          <a
            href={getFaqPath(langName)}
            className="group mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#020617] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span>{copy.viewAll}</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </a>
        </nav>
      )}
    </aside>
  );
}
