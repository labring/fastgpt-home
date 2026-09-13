'use client';

import { Search as MagnifyingGlassIcon } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="relative block w-full">
      <span className="sr-only">搜索案例</span>
      <MagnifyingGlassIcon
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="block w-full rounded-xl border border-[#dee0e3] bg-[#f7f8fa] py-2 pl-9 pr-3 text-[13px] text-[#2b2f36] shadow-md outline-none transition-all duration-300 placeholder:text-[#8f959e] hover:shadow-lg focus:border-brand-500 focus:bg-white focus:ring-0"
        placeholder="搜索案例"
      />
    </label>
  );
}
