import BaiDuAnalytics from '@/app/BaiDuAnalytics';
import ClarityAnalytics from '@/app/ClarityAnalytics';
import RybbitAnalytics from '@/app/RybbitAnalytics';
// import { TailwindIndicator } from '@/components/TailwindIndicator';
import { ThemeProvider } from '@/components/ThemeProvider';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { htmlLangScript } from '@/lib/htmlLang';
import '@/styles/globals.css';
import '@/styles/loading.css';
import '@/styles/plyr.css';
import { Analytics } from '@vercel/analytics/react';
import { Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import GoogleAnalytics from './GoogleAnalytics';

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
  metadataBase: new URL(siteConfig.metadataBase as string),
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
  other: {
    'baidu-site-verification': process.env.NEXT_PUBLIC_BAIDU_KEY
      ? process.env.NEXT_PUBLIC_BAIDU_KEY
      : '',
    'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_ID
      ? process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_ID
      : ''
  }
};
export const viewport: Viewport = {
  themeColor: siteConfig.themeColors
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Default lang determined at build time: *.cn → zh, others → en
  const isCnDomain = (process.env.NEXT_PUBLIC_HOME_URL || '').includes('.cn');
  const defaultLang = isCnDomain ? 'zh' : 'en';

  return (
    // SSR default lang; inline script updates it to exact locale before hydration
    <html lang={defaultLang} suppressHydrationWarning>
      <head>
        {/* Synchronously set html[lang] from URL path — must run before hydration */}
        <script dangerouslySetInnerHTML={{ __html: htmlLangScript }} />
      </head>
      <body className={cn('min-h-screen font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme={siteConfig.nextThemeColor} enableSystem={false} forcedTheme="dark">
          {children}
          {/* <Footer /> */}
          <Analytics />
          {/* <TailwindIndicator /> */}
        </ThemeProvider>
        <GoogleAnalytics />
        <BaiDuAnalytics />
        <ClarityAnalytics />
        <RybbitAnalytics />
      </body>
    </html>
  );
}
