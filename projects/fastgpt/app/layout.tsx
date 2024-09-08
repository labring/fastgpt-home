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
  return (
    <html lang={(lang && lang[0]) || defaultLocale} suppressHydrationWarning>
      <head />
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
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
