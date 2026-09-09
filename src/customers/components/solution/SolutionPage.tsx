import Link from 'next/link';
import { ArrowRight as ArrowRightIcon } from 'lucide-react';
import BottomCta from '@customers/components/BottomCta';
import SolutionArticle from '@customers/components/solution/SolutionArticle';
import SolutionArticleLayout from '@customers/components/solution/SolutionArticleLayout';
import SolutionHero from '@customers/components/solution/SolutionHero';
import RelatedSolutions from '@customers/components/solution/RelatedSolutions';
import { withBasePath } from '@customers/lib/base-path';
import { getSolutionPublicHref } from '@customers/lib/solution-url';
import { buildMarkdownTocItems } from '@customers/lib/toc';
import type { SolutionCardData } from '@customers/types/solution';

interface SolutionDetail extends SolutionCardData {
  content: string;
}

interface SolutionPageProps {
  solution: SolutionDetail;
  allSolutions: SolutionCardData[];
}

function getSolutionHref(solution: SolutionCardData) {
  return withBasePath(getSolutionPublicHref(solution));
}

export default function SolutionPage({ solution, allSolutions }: SolutionPageProps) {
  const currentIndex = allSolutions.findIndex((item) => String(item.id) === String(solution.id));
  const previous =
    allSolutions.length > 1
      ? allSolutions[(currentIndex - 1 + allSolutions.length) % allSolutions.length]
      : null;
  const next =
    allSolutions.length > 1 ? allSolutions[(currentIndex + 1) % allSolutions.length] : null;
  const relatedSolutions = allSolutions
    .filter((item) => String(item.id) !== String(solution.id))
    .sort((left, right) => {
      const leftMatches = left.categoryId === solution.categoryId ? 1 : 0;
      const rightMatches = right.categoryId === solution.categoryId ? 1 : 0;
      return rightMatches - leftMatches;
    })
    .slice(0, 3);
  const categoryHref = withBasePath(`/categories/${solution.categorySlug}#customers`);
  const homeHref = withBasePath('/#customers');
  const consultationContext = {
    source: 'customers_bottom' as const,
    solutionId: solution.id,
    solutionTitle: solution.title,
    solutionSlug: solution.slug
  };

  return (
    <div
      id="page-top"
      className="flex min-h-screen flex-col bg-surface-100 font-sans text-[#2b2f36] selection:bg-[#e8f3ff] selection:text-[#1f2329]"
    >
      <div className="flex-1 pt-16">
        <div className="pointer-events-none sticky top-16 z-30 -mb-10 hidden sm:block">
          <div className="pointer-events-auto w-full border-b border-transparent bg-white/0 backdrop-blur-2xl">
            <div className="mx-auto max-w-7xl px-4 pb-3 pt-3 sm:px-6 lg:pl-4 lg:pr-8">
              <nav className="flex w-fit items-center text-sm font-medium text-ink-sub">
                <Link href={homeHref} className="transition-colors hover:text-brand-600">
                  案例中心
                </Link>
                <span className="mx-2">/</span>
                <Link href={categoryHref} className="transition-colors hover:text-brand-600">
                  {solution.categoryName}
                </Link>
                <span className="mx-2">/</span>
                <a
                  href="#page-top"
                  className="max-w-[200px] truncate text-left font-medium text-[#1f2329] transition-colors hover:text-brand-600 sm:max-w-xs"
                >
                  {solution.title}
                </a>
              </nav>
            </div>
          </div>
        </div>

        <SolutionHero
          solution={solution}
          prevSolution={
            previous ? { title: previous.title, href: getSolutionHref(previous) } : null
          }
          nextSolution={next ? { title: next.title, href: getSolutionHref(next) } : null}
          categoryHref={categoryHref}
          backHref={homeHref}
        />

        <div className="relative w-full bg-white pb-0 pt-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SolutionArticleLayout
              tocItems={buildMarkdownTocItems(solution.content)}
              consultationContext={consultationContext}
            >
              <SolutionArticle content={solution.content} />
            </SolutionArticleLayout>
          </div>
        </div>

        <div className="w-full bg-white py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative mb-6 flex flex-col items-center">
              <div className="text-center">
                <h2 className="font-display text-2xl font-bold tracking-tight text-[#1f2329]">
                  更多行业案例
                </h2>
                <p className="mt-1.5 max-w-2xl text-sm text-ink-sub">
                  探索 FastGPT 在不同领域的更多智能化应用方案
                </p>
              </div>
              <div className="mt-2.5 md:absolute md:bottom-1 md:right-0 md:mt-0">
                <Link
                  href={homeHref}
                  className="group inline-flex items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
                >
                  查看全部案例
                  <ArrowRightIcon
                    strokeWidth={2.5}
                    className="text-xs transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
            <RelatedSolutions solutions={relatedSolutions} />
          </div>
        </div>

        <BottomCta
          title="免费验证这个方案是否适合你的业务"
          description="提交业务流程、数据现状和目标效果。商务顾问将在 1 天内联系你，确认需求后由 FastGPT 团队最快 3 天完成免费 POC 验证，帮助判断是否具备生产落地价值。"
          buttonLabel="申请免费 POC"
          showTopBorder={false}
          consultationContext={consultationContext}
        />
      </div>
    </div>
  );
}
