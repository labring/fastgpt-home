import DeferredSiteIntegrations from '@/app/DeferredSiteIntegrations';
import MotionProvider from '@/components/home/motion/MotionProvider';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { defaultLocale } from '@/lib/i18n';
import { htmlLangScript } from '@/lib/htmlLang';
import { contactLinkAttributionScript } from '@/lib/contactLinkAttribution';
import { localeDirections, localeHtmlLangs } from '@/lib/locales';
import '@/styles/globals.css';
import { Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { IBM_Plex_Sans as FontDisplay } from 'next/font/google';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true
});

const fontDisplay = FontDisplay({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-display',
  display: 'swap'
});

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  icons: siteConfig.icons,
  metadataBase: new URL(siteConfig.metadataBase as string),
  robots: {
    index: true,
    follow: true
  },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={localeHtmlLangs[defaultLocale] || defaultLocale}
      dir={localeDirections[defaultLocale] || 'ltr'}
      className="dark"
      style={{ colorScheme: 'dark' }}
      suppressHydrationWarning
    >
      <head>
        {/* Synchronously set html[lang] from URL path — must run before hydration */}
        <script dangerouslySetInnerHTML={{ __html: htmlLangScript }} />
        {/* Preserve approved attribution query keys before interactive hydration. */}
        <script dangerouslySetInnerHTML={{ __html: contactLinkAttributionScript }} />
      </head>
      <body
        className={cn(
          'min-h-screen font-sans antialiased',
          fontSans.variable,
          fontDisplay.variable
        )}
      >
        <MotionProvider>{children}</MotionProvider>
        <DeferredSiteIntegrations />
      </body>
    </html>
  );
}
