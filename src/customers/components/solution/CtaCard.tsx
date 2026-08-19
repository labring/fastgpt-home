import { memo } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { CtaModalContext } from "@/customers/lib/cta";
import { withBasePath } from "@/customers/lib/base-path";

// 使用站内静态资源，避免外部图片请求影响稳定性与首屏性能。
const EXPERTS = [
  {
    id: 1,
    src: "/images/solution/experts/photo-1560250097-0b93528c311a.avif",
    alt: "资深架构师",
    zIndex: "z-40",
  },
  {
    id: 2,
    src: "/images/solution/experts/photo-1573496359142-b8d87734a5a2.avif",
    alt: "AI 解决方案专家",
    zIndex: "z-30",
  },
  {
    id: 3,
    src: "/images/solution/experts/photo-1519085360753-af0119f7cbe7.avif",
    alt: "实施顾问",
    zIndex: "z-20",
  },
  {
    id: 4,
    src: "/images/solution/experts/photo-1580489944761-15a19d654956.avif",
    alt: "技术支持专家",
    zIndex: "z-10",
  },
] as const;

interface CtaCardProps {
  onOpenModal: (context?: CtaModalContext) => void;
  variant?: "mobile" | "desktop";
  solutionId?: string | number;
  solutionTitle?: string;
  categoryName?: string;
  solutionSlug?: string;
}

const CtaCard = memo(function CtaCard({
  onOpenModal,
  variant = "desktop",
  solutionId,
  solutionTitle,
  categoryName,
  solutionSlug
}: CtaCardProps) {
  const isMobile = variant === "mobile";

  // 提取公共头像基础样式
  const avatarSize = isMobile ? "w-10 h-10" : "w-12 h-12";
  const avatarImageSizes = isMobile ? "40px" : "48px";
  const avatarBaseClass = `${avatarSize} rounded-full border-2 border-white dark:border-[#373c43] shadow-sm overflow-hidden relative transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:z-50 hover:shadow-md cursor-pointer ring-2 ring-transparent hover:ring-brand-500/30 dark:hover:ring-[#8ab4f8]/30`;

  return (
    <div className="group relative isolate overflow-hidden rounded-2xl bg-[#f8fbff] p-6 transition-colors duration-300 hover:bg-[#f3f8ff] dark:bg-[#292d33] dark:hover:bg-[#2b3037]">
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-brand-200/80 to-transparent dark:via-[#5e8cfc]/35" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-[inherit] bg-gradient-to-b from-white/[0.55] to-transparent dark:from-white/[0.04]" />

      <div className="relative z-10">
        {/* 头像组 */}
        <div className="flex -space-x-3 mb-5 group/avatars">
          {EXPERTS.map((expert) => (
            <div key={expert.id} className={`${avatarBaseClass} ${expert.zIndex}`} title={expert.alt}>
              <Image
                src={withBasePath(expert.src)}
                alt={expert.alt}
                fill
                sizes={avatarImageSizes}
                className="object-cover"
              />
            </div>
          ))}
          {!isMobile && (
            <div className={`${avatarSize} rounded-full border-2 border-white dark:border-[#373c43] shadow-sm bg-gray-50 dark:bg-[#2b2f36] flex items-center justify-center relative z-0 transition-transform duration-300 group-hover/avatars:translate-x-1`}>
              <span className="text-[11px] font-bold text-gray-500 dark:text-[#dfe1e5]">+5</span>
            </div>
          )}
        </div>

        {/* 文本内容 */}
        <h3 className={`${isMobile ? "text-[17px]" : "text-[18px]"} font-bold text-gray-900 dark:text-[#f1f3f5] mb-2.5 font-display tracking-tight`}>
          {isMobile ? "咨询该方案 POC" : "想验证这个方案是否适合你的业务？"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-[#aeb4bc] mb-6 leading-relaxed">
          专家将结合你的业务流程与数据现状，
          {!isMobile && "判断方案适配度，"}
          确认需求后最快 3 天交付免费 POC 验证。
        </p>

        {/* 操作按钮 */}
        <button
          type="button"
          onClick={() => onOpenModal({
            source: 'solution_sidebar',
            title: '咨询 POC 验证路径',
            subtitle: '填写约 1 分钟。商务顾问将在 1 天内联系你，协助判断该方案如何接入你的业务并推进免费 POC 验证。',
            solutionId,
            solutionTitle,
            categoryName,
            solutionSlug
          })}
          className={`flex items-center justify-center gap-2 w-full bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold px-4 rounded-xl transition-all shadow-[0_4px_14px_rgba(37,99,235,0.25)] ${
            isMobile ? "py-3" : "py-3.5 hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] cursor-pointer"
          }`}
        >
          {isMobile ? "申请 POC" : "咨询 POC 路径"}
          <ArrowRightIcon weight="bold" className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
});

export default CtaCard;
