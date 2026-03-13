import { MetadataRoute } from 'next'
import { faq } from '@/faq'
import { showFAQ } from '@/constants'

export const dynamic = 'force-static'

const locales = ['en', 'zh', 'ja']

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io'
  const basePaths = ['', '/enterprise', '/price']
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  // 根首页
  entries.push({ url: baseUrl, lastModified: now })

  // 各语言的基础页面
  for (const locale of locales) {
    for (const path of basePaths) {
      entries.push({ url: `${baseUrl}/${locale}${path}`, lastModified: now })
    }

    // FAQ 列表页
    if (showFAQ) {
      entries.push({ url: `${baseUrl}/${locale}/faq`, lastModified: now })
    }
  }

  // FAQ 详情页
  if (showFAQ) {
    for (const locale of locales) {
      for (const faqId of Object.keys(faq)) {
        entries.push({
          url: `${baseUrl}/${locale}/faq/${encodeURIComponent(faqId)}`,
          lastModified: now
        })
      }
    }
  }

  return entries
}
