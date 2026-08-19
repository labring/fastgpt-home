"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import SearchBar from "./SearchBar";
import { openCtaModal } from "@/customers/lib/cta";
import { withBasePath } from "@/customers/lib/base-path";

interface NavbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSmartSearch?: (query: string) => void;
  isSearching?: boolean;
}

export default function Navbar({ searchQuery = "", onSearchChange, onSmartSearch, isSearching = false }: NavbarProps) {
  const openModal = () => {
    openCtaModal({
      source: 'navbar_poc',
      title: '申请免费 POC 验证',
      subtitle: '商务顾问将在 1 天内联系你，确认需求后最快 3 天交付 POC 验证。'
    });
  };

  return (
    <>
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-[#202124] border-b border-surface-300 dark:border-[#373c43] transition-all duration-300 shadow-sm transform-gpu" id="navbar">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-1.5 sm:gap-2 h-16">
                {/* Logo 区 */}
                <div className="flex items-center md:flex-1 shrink-0">
                  <Link href="/customers" className="flex items-center gap-1.5 sm:gap-3.5 cursor-pointer group">
                      <div className="relative w-[34px] h-[34px] sm:w-12 sm:h-12 rounded-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 shrink-0">
                          <Image src={withBasePath('/fastgpt.svg')} alt="FastGPT" fill className="object-contain" sizes="(max-width: 640px) 34px, 48px" priority />
                      </div>
                      <span className="font-bold text-[20px] sm:text-[28px] text-[#1f2329] dark:text-[#f1f3f5] tracking-tight font-display transition-colors group-hover:text-brand-700 dark:group-hover:text-[#8ab4f8]">FastGPT</span>
                  </Link>
                </div>

                <div className="ml-2 w-[min(56vw,236px)] shrink-0 md:hidden">
                  <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={onSearchChange}
                    onSmartSearch={onSmartSearch}
                    isSearching={isSearching}
                    placeholder="AI 智能匹配案例..."
                    showTooltipHint={false}
                    compact
                    className="max-w-none"
                  />
                </div>

                {/* 搜索区 */}
                <div className="hidden flex-[2_1_0%] justify-center px-4 md:flex">
                  <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={onSearchChange}
                    onSmartSearch={onSmartSearch}
                    isSearching={isSearching}
                    className="max-w-[720px]"
                  />
                </div>

                {/* 操作区 */}
                <div className="hidden md:flex items-center justify-end gap-2 sm:gap-4 flex-nowrap whitespace-nowrap sm:flex-1 shrink-0">
                    <ThemeToggle />
                    <a href="https://doc.fastgpt.cn/zh-CN/docs/introduction" target="_blank" rel="noopener noreferrer" className="hidden md:block text-sm font-medium text-ink-sub hover:text-[#1f2329] dark:text-[#c9cdd4] dark:hover:text-[#8ab4f8] transition-colors whitespace-nowrap">文档</a>
                    <a href="https://doc.fastgpt.cn/zh-CN/docs/openapi/intro" target="_blank" rel="noopener noreferrer" className="hidden md:block text-sm font-medium text-ink-sub hover:text-[#1f2329] dark:text-[#c9cdd4] dark:hover:text-[#8ab4f8] transition-colors whitespace-nowrap">API</a>
                    <div className="h-4 w-px bg-surface-300 dark:bg-[#4b525c] mx-1 hidden md:block"></div>
                    <button
                      onClick={openModal}
                      className="group relative inline-flex items-center justify-center px-4 sm:px-5 py-2 text-sm font-bold text-amber-900 dark:text-amber-50 bg-amber-300 dark:bg-amber-600/20 hover:shadow-[0_0_25px_rgba(251,191,36,0.4)] dark:hover:shadow-[0_0_25px_rgba(217,119,6,0.3)] rounded-full transition-all duration-500 border border-yellow-300 dark:border-amber-500/30 hover:border-yellow-100 dark:hover:border-amber-400 hover:-translate-y-0.5 whitespace-nowrap overflow-hidden shrink-0 cursor-pointer transform-gpu"
	                    >
	                      <span className="relative z-10 flex items-center">
	                        申请 POC
	                      </span>
	                    </button>
                    <a
                      href="https://fastgpt.cn/zh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 sm:px-4 py-2 text-sm font-medium rounded-full text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-900 transition-colors shadow-elevation-1 whitespace-nowrap shrink-0"
	                    >
	                        进入官网
	                    </a>
                </div>
            </div>
        </div>
    </nav>
    </>
  );
}
