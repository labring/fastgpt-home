'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RelatedLink {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

interface RelatedLinksProps {
  title?: string;
  links: RelatedLink[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function RelatedLinks({
  title = 'Related Resources',
  links,
  columns = 3,
  className = '',
}: RelatedLinksProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gradient">
          {title}
        </h2>

        <div className={`grid ${gridCols[columns]} gap-6`}>
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="group relative p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg"
              style={{ background: 'var(--theme-gradient)' }}
            >
              {link.icon && (
                <div className="mb-4 text-blue-500 dark:text-blue-400">
                  {link.icon}
                </div>
              )}

              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                {link.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {link.description}
              </p>

              <div className="flex items-center text-sm font-medium text-blue-500 dark:text-blue-400">
                Learn more
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// 预定义的相关链接配置
export const relatedLinksConfig = {
  home: [
    {
      title: 'Documentation',
      description: 'Learn how to build AI applications with FastGPT',
      href: 'https://doc.fastgpt.io/',
    },
    {
      title: 'Enterprise Solutions',
      description: 'Discover enterprise features and deployment options',
      href: '/enterprise',
    },
    {
      title: 'FAQ',
      description: 'Find answers to frequently asked questions',
      href: '/faq',
    },
  ],
  enterprise: [
    {
      title: 'Pricing',
      description: 'View pricing plans and compare features',
      href: '/price',
    },
    {
      title: 'Documentation',
      description: 'Technical documentation and API reference',
      href: 'https://doc.fastgpt.io/',
    },
    {
      title: 'Get Started',
      description: 'Start building with FastGPT today',
      href: 'https://cloud.fastgpt.io',
    },
  ],
  pricing: [
    {
      title: 'Enterprise Solutions',
      description: 'Learn about enterprise features and support',
      href: '/enterprise',
    },
    {
      title: 'Documentation',
      description: 'Explore technical documentation',
      href: 'https://doc.fastgpt.io/',
    },
    {
      title: 'FAQ',
      description: 'Common questions about pricing and features',
      href: '/faq',
    },
  ],
  faq: [
    {
      title: 'Documentation',
      description: 'Detailed guides and tutorials',
      href: 'https://doc.fastgpt.io/',
    },
    {
      title: 'Get Started',
      description: 'Try FastGPT for free',
      href: 'https://cloud.fastgpt.io',
    },
    {
      title: 'Contact Sales',
      description: 'Talk to our team about your needs',
      href: 'https://fael3z0zfze.feishu.cn/share/base/form/shrcnjJWtKqjOI9NbQTzhNyzljc?prefill_S=C2&hide_S=1',
    },
  ],
};
