import BaiDuAnalytics from '@/app/BaiDuAnalytics';
import ClarityAnalytics from '@/app/ClarityAnalytics';
import RybbitAnalytics from '@/app/RybbitAnalytics';
// import { TailwindIndicator } from '@/components/TailwindIndicator';
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
  const isChineseDomain = process.env.NEXT_PUBLIC_USER_URL?.includes('.cn')

  return (
    <html suppressHydrationWarning>
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
