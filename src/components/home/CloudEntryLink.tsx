'use client';

import type { ComponentProps, ReactNode } from 'react';
import { useStartUrl } from '@/components/home/hooks/useStartUrl';
import { RYBBIT_EVENTS, rybbitClickAttrs } from '@/lib/rybbitEvents';

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
    <a
      href={href}
      {...rybbitClickAttrs(RYBBIT_EVENTS.cloudServiceClick, source)}
      {...props}
    >
      {children}
    </a>
  );
}
