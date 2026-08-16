'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { getDialogCopy } from '@/components/contact/dialogCopy';
import { getLocaleFromPathname, isContactHref } from '@/lib/consultation';

type ConsultationProviderProps = {
  children: ReactNode;
  defaultLocale: string;
};

function LoadingContactForm() {
  const copy = getDialogCopy(
    typeof document === 'undefined' ? 'en' : document.documentElement.lang
  );

  return (
    <div className="flex min-h-[420px] items-center justify-center px-5 py-10">
      <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-[#667085]">
        {copy.formLoading}
      </p>
    </div>
  );
}

const ModalContactForm = dynamic(() => import('@/components/contact/ContactForm'), {
  ssr: false,
  loading: LoadingContactForm
});

export default function ConsultationProvider({
  children,
  defaultLocale
}: ConsultationProviderProps) {
  const pathname = usePathname() || '/';
  const locale = getLocaleFromPathname(pathname, defaultLocale);
  const copy = getDialogCopy(locale);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  useEffect(() => {
    const handleConsultationClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>(
              'a[data-consultation-link], a[href*="/contact"]'
            )
          : null;
      if (
        !target ||
        !isContactHref(target.getAttribute('href') || target.href) ||
        target.target === '_blank' ||
        target.hasAttribute('download')
      ) {
        return;
      }

      event.preventDefault();
      returnFocusRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setOpen(true);
    };

    document.addEventListener('click', handleConsultationClick, true);
    return () => document.removeEventListener('click', handleConsultationClick, true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  return (
    <>
      {children}
      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-[#101828]/55 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="consultation-dialog-title"
              className="flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-lg bg-white shadow-[0_24px_80px_rgba(16,24,40,0.28)] sm:max-h-[min(90dvh,860px)] sm:max-w-[760px] sm:rounded-lg"
            >
              <header className="relative shrink-0 border-b border-[#eaecf0] bg-white px-5 py-5 pr-16 sm:px-8 sm:py-6 sm:pr-20">
                <span className="mb-2 block text-[11px] font-semibold uppercase text-[#155eef]">
                  {copy.eyebrow}
                </span>
                <h2
                  id="consultation-dialog-title"
                  className="m-0 text-[22px] font-semibold leading-8 text-[#101828] sm:text-[24px]"
                >
                  {copy.title}
                </h2>
                <p className="mt-1 max-w-[570px] text-[13px] leading-5 text-[#667085] sm:text-[14px] sm:leading-6">
                  {copy.subtitle}
                </p>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  aria-label={copy.close}
                  title={copy.close}
                  className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-md text-[#667085] transition-colors hover:bg-[#f2f4f7] hover:text-[#101828] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155eef] sm:right-6 sm:top-6"
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </header>
              <div className="min-h-0 overflow-y-auto overscroll-contain">
                <ModalContactForm locale={locale} variant="modal" onDone={close} />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
