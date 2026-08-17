import { IconType } from 'react-icons';

type AuthorsConfig = {
  name: string;
  url: string;
  twitter?: string;
};
type ProductLink = {
  url: string;
  name: string;
};
type Link = {
  name: string;
  href: string;
  icon: IconType;
};
type ThemeColor = {
  media: string;
  color: string;
};
export type SiteConfig = {
  title: string;
  name: string;
  description: string;
  url: string;
  userUrl: string;
  customPlanUrl: string;
  keywords: string[];
  commercial: string;
  authors: AuthorsConfig[];
  creator: string;
  openSourceURL?: string;
  footerLinks: Link[];
  footerService: ProductLink[];
  metadataBase: URL | string;
  themeColors?: string | ThemeColor[];
  nextThemeColor?: string;
  icons: {
    icon: string;
    shortcut?: string;
    apple?: string;
  };
  openGraph: {
    type: string;
    locale: string;
    url: string;
    title: string;
    description: string;
    siteName: string;
    images?: string[];
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images?: string[];
    creator: string;
  };
};
