'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ContactForm from '@/components/contact/ContactForm';
import { getContactCopy } from '@/components/contact/contactCopy';
import { LangSwitcher } from '@/components/header/LangSwitcher';
import { getDefaultLocalePath } from '@/lib/localizedRoutes';
import { normalizeLocale } from '@/lib/locales';
import { contactPublishedLocaleCodes } from '@/lib/publishedLocales';

export default function ContactPage({ locale }: { locale: string }) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);
  const normalizedLocale = normalizeLocale(locale);
  const copy = getContactCopy(normalizedLocale);
  const homeHref = getDefaultLocalePath(normalizedLocale);

  useEffect(() => {
    const referrer = document.referrer;
    let hasSameOriginReferrer = false;

    if (referrer) {
      try {
        hasSameOriginReferrer = new URL(referrer).origin === window.location.origin;
      } catch {
        hasSameOriginReferrer = false;
      }
    }

    queueMicrotask(() => {
      setCanGoBack(window.history.length > 1 && hasSameOriginReferrer);
    });
  }, []);

  return (
    <div className="home min-h-screen bg-white text-[#101828]">
      <header className="border-b border-[#eaecf0] bg-white">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 sm:px-8">
          <Link href={homeHref} className="flex items-center gap-2" aria-label="FastGPT Home">
            <Image src="/logo-nav.svg" width={24} height={24} alt="" draggable={false} />
            <span className="text-[17px] font-semibold text-[#101828]">FastGPT</span>
          </Link>
          <div className="flex items-center gap-2">
            <LangSwitcher
              iconOnly
              locale={normalizedLocale}
              publishedLocales={contactPublishedLocaleCodes}
            />
            {canGoBack && (
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-[#475467] transition-colors hover:text-[#101828] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155eef]"
              >
                <ArrowLeft size={15} strokeWidth={1.8} aria-hidden />
                {copy.back}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="bg-[#f8fafc] px-5 py-10 sm:px-8 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-[820px]">
          <div className="mb-8 max-w-[680px] sm:mb-10">
            <span className="mb-3 block text-[11px] font-semibold uppercase text-[#155eef]">
              {copy.eyebrow}
            </span>
            <h1 className="m-0 text-[30px] font-semibold leading-[38px] text-[#101828] sm:text-[38px] sm:leading-[48px]">
              {copy.title}
            </h1>
            <p className="mt-3 text-[15px] leading-6 text-[#667085] sm:text-[16px] sm:leading-7">
              {copy.subtitle}
            </p>
          </div>

          <section
            aria-label={copy.title}
            className="overflow-hidden rounded-lg border border-[#dfe3e8] bg-white shadow-[0_8px_30px_rgba(16,24,40,0.06)]"
          >
            <ContactForm locale={normalizedLocale} />
          </section>
        </div>
      </main>
    </div>
  );
}
