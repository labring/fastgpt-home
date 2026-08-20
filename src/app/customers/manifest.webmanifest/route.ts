import { withBasePath } from '@/customers/lib/base-path';

export function GET() {
  return Response.json({
    name: 'FastGPT 客户案例中心',
    short_name: 'FastGPT 案例',
    description: '探索企业级 AI 客户案例，了解行业场景、落地案例、免费 POC 验证路径与生产级交付方式。',
    start_url: withBasePath('/'),
    scope: withBasePath('/'),
    display: 'standalone',
    background_color: '#f5f6f7',
    theme_color: '#0052d9',
    icons: [
      { src: withBasePath('/icon.svg'), sizes: 'any', type: 'image/svg+xml' },
      { src: withBasePath('/apple-icon.png'), sizes: '180x180', type: 'image/png' }
    ]
  });
}
