'use client';

import { useRef, useState, type ReactNode } from 'react';
import DesktopToc from '@customers/components/solution/DesktopToc';
import MobileToc from '@customers/components/solution/MobileToc';
import TocToggleButton from '@customers/components/solution/TocToggleButton';
import { useSyncedToc } from '@customers/components/solution/useSyncedToc';
import type { ConsultationContext } from '@customers/lib/consultation';
import type { TocItem } from '@customers/lib/toc';

interface SolutionArticleLayoutProps {
  children: ReactNode;
  tocItems: TocItem[];
  consultationContext: ConsultationContext;
}

export default function SolutionArticleLayout({
  children,
  tocItems: fallbackTocItems,
  consultationContext
}: SolutionArticleLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const articleRef = useRef<HTMLElement | null>(null);
  const { tocItems, activeId, handleTocItemClick } = useSyncedToc({
    containerRef: articleRef,
    fallbackTocItems
  });
  const sidebarConsultationContext = {
    ...consultationContext,
    source: 'customers_sidebar' as const
  };

  return (
    <>
      <TocToggleButton
        onClick={() => setIsMobileMenuOpen(true)}
        isVisible={!isMobileMenuOpen}
        className="lg:hidden"
      />
      <MobileToc
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        tocItems={tocItems}
        activeId={activeId}
        consultationContext={sidebarConsultationContext}
        onItemClick={handleTocItemClick}
      />
      <TocToggleButton
        onClick={() => setIsSidebarCollapsed(false)}
        isVisible={isSidebarCollapsed}
        className="hidden lg:flex"
      />
      <div className="relative flex w-full flex-col items-start lg:flex-row">
        <article id="solution-article" ref={articleRef} className="min-w-0 w-full flex-1">
          {children}
        </article>
        <DesktopToc
          isCollapsed={isSidebarCollapsed}
          onCollapse={() => setIsSidebarCollapsed(true)}
          tocItems={tocItems}
          activeId={activeId}
          consultationContext={sidebarConsultationContext}
          onItemClick={handleTocItemClick}
        />
      </div>
    </>
  );
}
