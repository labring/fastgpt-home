import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import type { CtaModalContext } from "@/customers/lib/cta";

export default function EmptyState({ onOpenModal }: { onOpenModal: (context?: CtaModalContext) => void }) {
  return (
    <div className="py-20 sm:py-32 flex flex-col items-center justify-center text-center bg-[#f7f8fa] dark:bg-[#292d33] rounded-2xl border-2 border-[#dee0e3] dark:border-[#373c43] border-dashed transition-all duration-300 hover:border-brand-200 dark:hover:border-[#5e8cfc]/50 hover:bg-[#e8f3ff]/30 dark:hover:bg-[#203652]/40">
      <div className="w-20 h-20 bg-white dark:bg-[#2b2f36] rounded-full flex items-center justify-center mb-8 shadow-sm border border-brand-100 dark:border-[#4b525c] ring-12px ring-[#e8f3ff]/50 dark:ring-[#203652]/30">
        <MagnifyingGlassIcon className="text-4xl text-brand-600 dark:text-brand-400 animate-pulse-slow" weight="duotone" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-[#1f2329] dark:text-[#f1f3f5] mb-3 font-display">
        没有找到合适的客户案例？
      </h3>
      <p className="text-base text-[#646a73] dark:text-[#dfe1e5] max-w-md mx-auto mb-8 px-4 leading-relaxed">
        没找到合适案例？提交业务需求，专家将在 1 天内联系你，协助匹配可落地的 AI 客户案例。
      </p>
      <button
        onClick={() => onOpenModal({
          source: 'empty_state',
          title: '提交需求，让专家匹配方案',
          subtitle: '填写约 1 分钟。商务顾问将在 1 天内联系你，协助判断是否适合推进免费 POC 验证。'
        })}
        className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-900 rounded-full transition-all shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 overflow-hidden cursor-pointer"
      >
        <span className="relative z-10 flex items-center gap-2">
          提交需求
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
        <div className="absolute inset-0 h-full w-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] -skew-x-12"></div>
      </button>
    </div>
  );
}
