import BaiDuAnalytics from '@/app/BaiDuAnalytics';
import GoogleAnalytics from '@/app/GoogleAnalytics';
import { TailwindIndicator } from '@/components/TailwindIndicator';
import { ThemeProvider } from '@/components/ThemeProvider';
import { siteConfig } from '@/config/site';
import { defaultLocale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import '@/styles/loading.css';
import '@/styles/plyr.css';
import { Analytics } from '@vercel/analytics/react';
import { Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import Script from 'next/script';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  icons: siteConfig.icons,
  metadataBase: siteConfig.metadataBase,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
  other: {
    'baidu-site-verification': process.env.NEXT_PUBLIC_BAIDU_KEY
      ? process.env.NEXT_PUBLIC_BAIDU_KEY
      : ''
  }
};
export const viewport: Viewport = {
  themeColor: siteConfig.themeColors
};

export default async function RootLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode;
  params: { lang: string[] | undefined };
}) {
  const isChineseDomain = process.env.NEXT_PUBLIC_USER_URL?.includes('.cn')

  return (
    <html lang={(lang && lang[0]) || defaultLocale} suppressHydrationWarning>
      <head>
        {!isChineseDomain && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-W9HPZZ22');`
            }}
          />
        )}
      </head>
      <body className={cn('min-h-screen font-sans antialiased', fontSans.variable)}>
        {!isChineseDomain && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-W9HPZZ22"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
        )}
        <ThemeProvider attribute="class" defaultTheme={siteConfig.nextThemeColor} enableSystem>
          {children}
          {/* <Footer /> */}
          <Analytics />
          <TailwindIndicator />
        </ThemeProvider>
        <GoogleAnalytics />
        <BaiDuAnalytics />
      </body>
    </html>
  );
}
