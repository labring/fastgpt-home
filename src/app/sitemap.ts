import { MetadataRoute } from 'next'
import { faq } from '@/faq'
import { supportedLocaleCodes } from '@/lib/locales'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io'
  const localizedPaths = ['', '/price']
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  // 根首页
  entries.push({ url: baseUrl, lastModified: now })

  // 各语言的基础页面
  for (const locale of supportedLocaleCodes) {
    for (const path of localizedPaths) {
      entries.push({ url: `${baseUrl}/${locale}${path}`, lastModified: now })
    }

  }
  // FAQ 页面所有语言都生成；非中英文内容 fallback 到英文
  for (const locale of supportedLocaleCodes) {
    entries.push({ url: `${baseUrl}/${locale}/faq`, lastModified: now })
  }

  // 企业一体机页面目前只提供中文版本
  entries.push({ url: `${baseUrl}/zh/enterprise`, lastModified: now })

  // FAQ 详情页
  for (const locale of supportedLocaleCodes) {
    for (const faqId of Object.keys(faq)) {
      entries.push({
        url: `${baseUrl}/${locale}/faq/${encodeURIComponent(faqId)}`,
        lastModified: now
      })
    }
  }

  return entries
}
