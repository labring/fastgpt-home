import { MetadataRoute } from 'next'
import { showFAQ } from '@/constants'

export const dynamic = 'force-static'

// 语言配置
const locales = ['en', 'zh', 'ja']

export function GET(): Response {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io'
  const basePaths = ['', '/enterprise', '/price']

  // 为每种语言生成基础页面
  const sitemap: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const path of basePaths) {
      sitemap.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1.0 : 0.8,
        alternates: {
          languages: locales.reduce((acc, lang) => {
            acc[lang] = `${baseUrl}/${lang}${path}`
            return acc
          }, {} as Record<string, string>)
        }
      })
    }

    // FAQ列表页（如果FAQ功能启用）
    if (showFAQ) {
      sitemap.push({
        url: `${baseUrl}/${locale}/faq`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
        alternates: {
          languages: locales.reduce((acc, lang) => {
            acc[lang] = `${baseUrl}/${lang}/faq`
            return acc
          }, {} as Record<string, string>)
        }
      })
    }
  }

  // 根首页
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
    alternates: {
      languages: {
        en: `${baseUrl}/en`,
        zh: `${baseUrl}/zh`,
        ja: `${baseUrl}/ja`
      }
    }
  })

  console.log(`Generated base sitemap with ${sitemap.length} URLs`)

  // 生成XML内容
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemap.map(url => `  <url>
    <loc>${url.url}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${url.alternates?.languages?.en}" />
    <xhtml:link rel="alternate" hreflang="zh" href="${url.alternates?.languages?.zh}" />
    <xhtml:link rel="alternate" hreflang="ja" href="${url.alternates?.languages?.ja}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${url.alternates?.languages?.en}" />
    <lastmod>${(url.lastModified ? new Date(url.lastModified) : new Date()).toISOString()}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  })
}