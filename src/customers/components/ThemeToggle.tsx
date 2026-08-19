"use client";

import { useTheme } from "@/customers/components/theme-provider";
import { useCallback, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon, DesktopIcon } from "@phosphor-icons/react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );

  const cycleTheme = useCallback(() => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  }, [theme, setTheme]);

  if (!mounted) {
    return (
      <button className="p-2 text-gray-500 transition-colors">
        <div className="w-5 h-5" />
      </button>
    );
  }

  const renderIcon = () => {
    if (theme === "system") {
      return <DesktopIcon className="w-5 h-5" weight="fill" />;
    }
    if (theme === "dark") {
      return <MoonIcon className="w-5 h-5" weight="fill" />;
    }
    return <SunIcon className="w-5 h-5" weight="fill" />;
  };

  const getTitle = () => {
    if (theme === "system") return "当前：跟随系统 (点击切换白天模式)";
    if (theme === "dark") return "当前：黑夜模式 (点击切换跟随系统)";
    return "当前：白天模式 (点击切换黑夜模式)";
  };

  return (
    <div className="relative group inline-block">
      <button
        onClick={cycleTheme}
        className="p-2 text-gray-500 dark:text-[#aeb4bc] hover:text-brand-600 dark:hover:text-[#8ab4f8] transition-colors duration-300 cursor-pointer"
        aria-label="Toggle Theme"
      >
        {renderIcon()}
      </button>
      {/* 悬浮提示框 */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-gray-800 dark:bg-[#2b2f36] text-white dark:text-[#dfe1e5] text-xs font-medium rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 pointer-events-none translate-y-1 group-hover:translate-y-0 border border-transparent dark:border-[#373c43]">
        {getTitle()}
        {/* 小箭头 */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 dark:bg-[#2b2f36] rotate-45 border-l border-t border-transparent dark:border-[#373c43]"></div>
      </div>
    </div>
  );
}
