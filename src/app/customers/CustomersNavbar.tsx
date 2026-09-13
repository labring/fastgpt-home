'use client';

import Navbar from '@/components/home/Navbar';
import { getConsultationLinkProps } from '@customers/lib/consultation';

interface CustomersNavbarProps {
  links: { label: string; href: string }[];
  t: { trial: string; consult: string };
}

export default function CustomersNavbar({ links, t }: CustomersNavbarProps) {
  const consultationLink = getConsultationLinkProps({ source: 'navbar_poc' });

  return (
    <Navbar
      links={links}
      t={t}
      locale="zh"
      publishedLocales={['zh']}
      consultHref={consultationLink.href}
      consultRybbitSource="navbar_poc"
    />
  );
}
