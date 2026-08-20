import { absoluteUrl } from '@/customers/lib/site-url';

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'YouBot',
  'CCBot',
  'Bytespider',
  'Meta-ExternalAgent',
  'GoogleOther'
];

function crawlerRules(userAgent: string) {
  return [
    `User-agent: ${userAgent}`,
    'Allow: /customers',
    'Disallow: /customers/admin',
    'Disallow: /customers/login',
    'Disallow: /customers/api/'
  ].join('\n');
}

export function GET() {
  const content = [
    crawlerRules('*'),
    ...AI_CRAWLERS.map(crawlerRules),
    `Sitemap: ${absoluteUrl('/sitemap.xml')}`
  ].join('\n\n');

  return new Response(`${content}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
    }
  });
}
