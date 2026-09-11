'use client';

import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { normalizeLocale } from '@/lib/locales';
import { getDefaultLocaleForSiteVariant } from '@/lib/siteRouting';
import { createRybbitConsultCapture, type RybbitConsultCapture } from '@/lib/rybbitConversion';

const CONSULTATION_TRIGGER_SELECTOR = 'a[data-consultation-trigger="true"]';

// 站点级 source：主站读 NEXT_PUBLIC_ATTRIBUTION_SOURCE（home-cn / home-io），
// customers 站读 NEXT_PUBLIC_CUSTOMERS_SOURCE（默认 customers）。
const HOME_SOURCE = process.env.NEXT_PUBLIC_ATTRIBUTION_SOURCE?.trim();
const CUSTOMERS_SOURCE = process.env.NEXT_PUBLIC_CUSTOMERS_SOURCE?.trim() || 'customers';

// 懒加载弹窗内容（Dialog + ContactForm + 文案），避免把表单与 Radix Dialog 拉进所有页面的初始 JS。
const ConsultationDialogContent = lazy(() => import('./ConsultationDialogContent'));

export default function ConsultationDialog() {
  const params = useParams<{ lang?: string }>();
  const pathname = usePathname();
  const locale = normalizeLocale(params?.lang || getDefaultLocaleForSiteVariant());

  const [open, setOpen] = useState(false);
  const [submissionSource, setSubmissionSource] = useState<string>();
  const [rybbitConsultCapture, setRybbitConsultCapture] = useState<RybbitConsultCapture>();
  const triggerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const handleConsultationClick = (event: MouseEvent) => {
      if (
        !(event.target instanceof Element) ||
        event.button !== 0 ||
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;

      const trigger = event.target.closest<HTMLAnchorElement>(CONSULTATION_TRIGGER_SELECTOR);
      if (!trigger) return;
      event.preventDefault();
      triggerRef.current = trigger;
      const sourceId = trigger.dataset.rybbitPropSource?.trim();
      setRybbitConsultCapture(sourceId ? createRybbitConsultCapture(sourceId) : undefined);
      setSubmissionSource(pathname?.startsWith('/customers') ? CUSTOMERS_SOURCE : HOME_SOURCE);
      setOpen(true);
    };

    // 捕获阶段监听：必须在 Next.js <Link> 的 client-side navigation（React 合成事件）之前
    // preventDefault，否则用 <Link> 的咨询按钮会在弹窗拦截前就完成路由跳转。
    document.addEventListener('click', handleConsultationClick, true);
    return () => document.removeEventListener('click', handleConsultationClick, true);
  }, [pathname]);

  if (!open) {
    return null;
  }

  return (
    <Suspense>
      <ConsultationDialogContent
        locale={locale}
        submissionSource={submissionSource}
        rybbitConsultCapture={rybbitConsultCapture}
        triggerRef={triggerRef}
        onClose={() => setOpen(false)}
      />
    </Suspense>
  );
}
