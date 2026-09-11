'use client';

import type { ReactNode } from 'react';
import CloudEntryLink from '@/components/home/CloudEntryLink';
import { useContactUrl } from '@/components/home/hooks/useContactUrl';
import { RYBBIT_EVENTS, rybbitClickAttrs } from '@/lib/rybbitEvents';

export default function ContentArticleLink({
  locale,
  destination,
  children
}: {
  locale: string;
  destination: 'contact' | 'start';
  children: ReactNode;
}) {
  const contactUrl = useContactUrl(locale);
  return destination === 'start' ? (
    <CloudEntryLink source="content_article_body_trial">{children}</CloudEntryLink>
  ) : (
    <a
      href={contactUrl}
      data-consultation-trigger="true"
      {...rybbitClickAttrs(RYBBIT_EVENTS.businessConsultClick, 'content_article_body_consult')}
    >
      {children}
    </a>
  );
}
