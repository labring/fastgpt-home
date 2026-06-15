'use client';

import type { ComponentProps, ReactNode } from 'react';
import { useStartUrl } from '@/components/home/hooks/useStartUrl';

type CloudEntryLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
  source: string;
  targetUrl?: string;
  children: ReactNode;
};

export default function CloudEntryLink({
  source,
  targetUrl,
  children,
  ...props
}: CloudEntryLinkProps) {
  const href = useStartUrl(source, targetUrl);

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
