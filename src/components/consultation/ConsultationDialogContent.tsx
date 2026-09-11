'use client';

import { useEffect, useState } from 'react';
import { Clock3, Network, ShieldCheck, Sparkles } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import { getContactCopy } from '@/components/contact/contactCopy';
import { localeDirections, normalizeLocale } from '@/lib/locales';
import type { RybbitConsultCapture } from '@/lib/rybbitConversion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

const BENEFIT_ICONS = [Sparkles, Clock3, ShieldCheck, Network] as const;

export type ConsultationDialogCopy = {
  badge: string;
  title: string;
  description: string;
  benefits: { title: string; description: string }[];
  footer: string;
};

type ConsultationDialogContentProps = {
  locale: string;
  submissionSource?: string;
  rybbitConsultCapture?: RybbitConsultCapture;
  triggerRef: React.RefObject<HTMLAnchorElement | null>;
  onClose: () => void;
};

export default function ConsultationDialogContent({
  locale,
  submissionSource,
  rybbitConsultCapture,
  triggerRef,
  onClose
}: ConsultationDialogContentProps) {
  const dir = localeDirections[normalizeLocale(locale)] || 'ltr';
  const [submitted, setSubmitted] = useState(false);
  const [copy, setCopy] = useState<ConsultationDialogCopy | null>(null);

  useEffect(() => {
    let cancelled = false;
    const apply = (next: ConsultationDialogCopy | null) => {
      if (!cancelled) setCopy(next);
    };
    import(`@/locales/${locale}.json`)
      .then((m) => apply(m.default.Home.consultationDialog))
      .catch(() =>
        import('@/locales/en.json')
          .then((m) => apply(m.default.Home.consultationDialog))
          .catch(() => apply(null))
      );
    return () => {
      cancelled = true;
    };
  }, [locale]);

  if (!copy) {
    return null;
  }

  return (
    <Dialog open onOpenChange={(nextOpen) => {
      if (!nextOpen) onClose();
    }} modal>
      <DialogContent
        dir={dir}
        className="home fixed left-1/2 top-1/2 block max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[1040px] -translate-x-1/2 -translate-y-1/2 gap-0 overflow-y-auto rounded-xl border-[#dfe5ef] bg-white p-0 font-sans text-[#101828] shadow-[0_28px_90px_rgba(15,23,42,0.24)] sm:w-[calc(100%-4rem)] sm:max-w-[1040px]"
        aria-label={copy.title}
        closeLabel={getContactCopy(locale).close}
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          triggerRef.current?.focus();
        }}
      >
        <div
          className={`grid h-auto min-h-0 grid-cols-1 ${
            submitted ? '' : 'lg:grid-cols-[0.95fr_1.05fr]'
          }`}
        >
          <aside
            className={`relative overflow-hidden border-b border-[#e4e7ec] bg-[#f7f9fc] px-6 py-7 sm:px-9 sm:py-9 lg:border-b-0 lg:border-e lg:px-10 lg:py-10 ${
              submitted ? 'hidden' : ''
            }`}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(21,94,239,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(21,94,239,0.055)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:linear-gradient(to_bottom_right,black,transparent_78%)]"
            />
            <div className="relative flex h-full flex-col items-center lg:items-start">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#c7d7fe] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#155eef] shadow-sm">
                {copy.badge}
              </div>

              <DialogHeader className="mt-6 max-w-[430px] text-center lg:mt-7 lg:text-start">
                <DialogTitle className="m-0 text-[24px] font-semibold leading-[1.3] tracking-tight text-[#101828] sm:text-[28px] lg:text-[30px]">
                  {copy.title}
                </DialogTitle>
                <DialogDescription className="mt-2.5 max-w-[400px] text-[14px] leading-6 text-[#667085]">
                  {copy.description}
                </DialogDescription>
              </DialogHeader>

              <div className="my-6 hidden space-y-1.5 lg:block">
                {copy.benefits.map((benefit, index) => {
                  const Icon = BENEFIT_ICONS[index] ?? Sparkles;
                  return (
                    <div
                      key={benefit.title}
                      className="group flex items-start gap-3.5 rounded-xl p-2.5 transition-colors hover:bg-white/70"
                    >
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#c7d7fe] bg-white text-[#155eef] shadow-sm transition-colors group-hover:border-[#9db8f7]">
                        <Icon size={18} strokeWidth={1.9} aria-hidden />
                      </span>
                      <div className="pt-0.5">
                        <p className="text-[14px] font-semibold leading-5 text-[#1d2939]">
                          {benefit.title}
                        </p>
                        <p className="mt-0.5 max-w-[330px] text-[13px] leading-5 text-[#667085]">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-auto hidden border-t border-[#dfe5ef] pt-4 text-[12px] leading-5 text-[#667085] lg:block">
                {copy.footer}
              </p>
            </div>
          </aside>

          <section className="h-fit min-h-0 overflow-visible bg-white lg:self-start">
            <ContactForm
              locale={locale}
              variant="modal"
              submissionSource={submissionSource}
              rybbitConsultCapture={rybbitConsultCapture}
              onSuccess={() => setSubmitted(true)}
              onClose={onClose}
            />
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
