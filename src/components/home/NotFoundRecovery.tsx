'use client';

import { usePathname } from 'next/navigation';
import { supportedLocaleCodes } from '@/lib/locales';

type RecoveryLink = { href: string; label: string };
export type RecoveryData = {
  groups: { sections: readonly string[]; links: RecoveryLink[] }[];
  articles: Record<string, RecoveryLink[]>;
};

export default function NotFoundRecovery({ data }: { data: RecoveryData }) {
  // The static 404 is shared by all paths; resolve recovery after hydration.
  const pathname = usePathname();
  if (!pathname) return null;
  const segments = pathname.split('/').filter(Boolean);
  if (supportedLocaleCodes.some((locale) => locale === segments[0])) segments.shift();
  const links =
    data.articles['/' + segments.join('/')] ||
    data.groups.find((group) => group.sections.includes(segments[0]))?.links ||
    [];

  return links.map(({ href, label }) => (
    <a
      key={href}
      href={href}
      data-not-found-recovery
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[#d4d4d4] bg-white px-6 text-[15px] font-medium text-[#020617] transition-colors hover:bg-[#f7f8fa] sm:w-auto"
    >
      {label}
    </a>
  ));
}
