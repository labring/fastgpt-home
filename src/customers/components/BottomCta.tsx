import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { CtaModalContext } from "@/customers/lib/cta";

type BottomCtaProps = {
  openModal: (context?: CtaModalContext) => void;
  title?: string;
  description?: string;
  buttonLabel?: string;
  showTopBorder?: boolean;
  modalContext?: CtaModalContext;
};

export default function BottomCta({
  openModal,
  title = "免费评估你的第一个 AI 落地场景",
  description = "提交业务流程、数据现状和目标效果。商务顾问将在 1 天内联系你，确认需求后最快 3 天交付免费 POC 验证，助力后续生产级交付。",
  buttonLabel = "申请免费 POC",
  showTopBorder = true,
  modalContext,
}: BottomCtaProps) {
  return (
    <div className={`w-full bg-transparent py-14 mt-4 mb-0 ${showTopBorder ? "border-t border-surface-300/80 dark:border-[#373c43]" : ""}`}>
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
        <div>
          <h2 className="text-2xl font-bold text-[#1f2329] dark:text-[#f1f3f5] mb-4 font-display tracking-tight">
            {title}
          </h2>
          <p className="text-base text-ink-sub dark:text-[#aeb4bc] max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
        <button
          onClick={() => openModal(modalContext)}
          className="inline-flex shrink-0 items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-[0_4px_14px_rgba(37,99,235,0.18)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.28)] text-base group cursor-pointer"
        >
          {buttonLabel}
          <ArrowRightIcon weight="bold" className="text-base transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
