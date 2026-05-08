import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'zh', 'ja'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const headers = { 'accept-language': acceptLanguage };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== '/') return;

  // Priority: cookie (user's explicit choice) > Accept-Language > default
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return NextResponse.redirect(new URL(`/${cookieLocale}`, request.url));
  }

  const locale = getLocale(request);
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = {
  matcher: ['/'],
};
