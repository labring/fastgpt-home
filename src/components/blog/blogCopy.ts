import { normalizeLocale, type LocaleCode } from '@/lib/locales';

import type { BlogFilter } from './components/FilterBar';

export type BlogCopy = {
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  allPosts: {
    title: string;
    filters: Record<BlogFilter, string>;
    categoryLabels: Record<string, string>;
    search: string;
    searching: string;
    readMore: string;
    loadMore: string;
    end: string;
    empty: string;
  };
  article: {
    back: string;
    related: string;
    dateLocale: string;
  };
};

const blogCopyMap: Record<LocaleCode, BlogCopy> = {
  en: {
    eyebrow: 'Blog',
    heroTitle: 'FastGPT Blog',
    heroDescription: 'Product updates, technical practices, and practical AI Agent experience',
    allPosts: {
      title: 'All posts',
      filters: {
        all: 'All',
        product: 'Product updates',
        engineering: 'Technical insights'
      },
      categoryLabels: {
        product: 'Product updates',
        engineering: 'Technical insights',
        industry: 'Industry insights'
      },
      search: 'Search',
      searching: 'Searching...',
      readMore: 'Read article',
      loadMore: 'Load more',
      end: 'No more posts',
      empty: 'No posts match your filters.'
    },
    article: { back: 'Back to blog', related: 'Related posts', dateLocale: 'en-US' }
  },
  zh: {
    eyebrow: '博客',
    heroTitle: 'FastGPT 博客',
    heroDescription: '产品动态、技术实践与 AI Agent 落地经验',
    allPosts: {
      title: '全部文章',
      filters: { all: '全部', product: '产品上新', engineering: '技术干货' },
      categoryLabels: { product: '产品上新', engineering: '技术干货', industry: '行业洞察' },
      search: '搜索文章',
      searching: '搜索中...',
      readMore: '阅读详情',
      loadMore: '加载更多',
      end: '已经到底啦',
      empty: '暂无匹配文章。'
    },
    article: { back: '返回', related: '相关文章', dateLocale: 'zh-CN' }
  },
  'zh-hant': {
    eyebrow: '部落格',
    heroTitle: 'FastGPT 部落格',
    heroDescription: '產品動態、技術實踐與 AI Agent 落地經驗',
    allPosts: {
      title: '全部文章',
      filters: { all: '全部', product: '產品上新', engineering: '技術乾貨' },
      categoryLabels: { product: '產品上新', engineering: '技術乾貨', industry: '產業洞察' },
      search: '搜尋文章',
      searching: '搜尋中...',
      readMore: '閱讀詳情',
      loadMore: '載入更多',
      end: '已經到底了',
      empty: '暫無符合篩選條件的文章。'
    },
    article: { back: '返回部落格', related: '相關文章', dateLocale: 'zh-TW' }
  },
  ja: {
    eyebrow: 'ブログ',
    heroTitle: 'FastGPT ブログ',
    heroDescription: '製品アップデート、技術プラクティス、実践的な AI Agent の知見',
    allPosts: {
      title: 'すべての記事',
      filters: {
        all: 'すべて',
        product: '製品アップデート',
        engineering: '技術インサイト'
      },
      categoryLabels: {
        product: '製品アップデート',
        engineering: '技術インサイト',
        industry: '業界インサイト'
      },
      search: '検索',
      searching: '検索中...',
      readMore: '記事を読む',
      loadMore: 'もっと読む',
      end: 'これ以上の記事はありません',
      empty: '条件に一致する記事はありません。'
    },
    article: { back: 'ブログに戻る', related: '関連記事', dateLocale: 'ja-JP' }
  },
  ar: {
    eyebrow: 'المدونة',
    heroTitle: 'مدونة FastGPT',
    heroDescription: 'تحديثات المنتجات والممارسات التقنية وخبرات عملية في AI Agent',
    allPosts: {
      title: 'جميع المقالات',
      filters: {
        all: 'الكل',
        product: 'تحديثات المنتج',
        engineering: 'رؤى تقنية'
      },
      categoryLabels: {
        product: 'تحديثات المنتج',
        engineering: 'رؤى تقنية',
        industry: 'رؤى قطاعية'
      },
      search: 'بحث',
      searching: 'جارٍ البحث...',
      readMore: 'قراءة المقال',
      loadMore: 'تحميل المزيد',
      end: 'لا توجد مقالات أخرى',
      empty: 'لا توجد مقالات تطابق عوامل التصفية.'
    },
    article: { back: 'العودة إلى المدونة', related: 'مقالات ذات صلة', dateLocale: 'ar-SA' }
  },
  vi: {
    eyebrow: 'Blog',
    heroTitle: 'Blog FastGPT',
    heroDescription: 'Cập nhật sản phẩm, thực tiễn kỹ thuật và kinh nghiệm triển khai AI Agent',
    allPosts: {
      title: 'Tất cả bài viết',
      filters: {
        all: 'Tất cả',
        product: 'Cập nhật sản phẩm',
        engineering: 'Góc nhìn kỹ thuật'
      },
      categoryLabels: {
        product: 'Cập nhật sản phẩm',
        engineering: 'Góc nhìn kỹ thuật',
        industry: 'Góc nhìn ngành'
      },
      search: 'Tìm kiếm',
      searching: 'Đang tìm...',
      readMore: 'Đọc bài viết',
      loadMore: 'Tải thêm',
      end: 'Không còn bài viết',
      empty: 'Không có bài viết phù hợp.'
    },
    article: { back: 'Quay lại blog', related: 'Bài viết liên quan', dateLocale: 'vi-VN' }
  },
  th: {
    eyebrow: 'บล็อก',
    heroTitle: 'บล็อก FastGPT',
    heroDescription: 'อัปเดตผลิตภัณฑ์ แนวปฏิบัติด้านเทคนิค และประสบการณ์ใช้งาน AI Agent',
    allPosts: {
      title: 'บทความทั้งหมด',
      filters: {
        all: 'ทั้งหมด',
        product: 'อัปเดตผลิตภัณฑ์',
        engineering: 'ข้อมูลเชิงลึกด้านเทคนิค'
      },
      categoryLabels: {
        product: 'อัปเดตผลิตภัณฑ์',
        engineering: 'ข้อมูลเชิงลึกด้านเทคนิค',
        industry: 'มุมมองอุตสาหกรรม'
      },
      search: 'ค้นหา',
      searching: 'กำลังค้นหา...',
      readMore: 'อ่านบทความ',
      loadMore: 'โหลดเพิ่มเติม',
      end: 'ไม่มีบทความเพิ่มเติม',
      empty: 'ไม่มีบทความที่ตรงกับตัวกรอง'
    },
    article: { back: 'กลับไปที่บล็อก', related: 'บทความที่เกี่ยวข้อง', dateLocale: 'th-TH' }
  },
  id: {
    eyebrow: 'Blog',
    heroTitle: 'Blog FastGPT',
    heroDescription: 'Pembaruan produk, praktik teknis, dan pengalaman praktis AI Agent',
    allPosts: {
      title: 'Semua artikel',
      filters: {
        all: 'Semua',
        product: 'Pembaruan produk',
        engineering: 'Wawasan teknis'
      },
      categoryLabels: {
        product: 'Pembaruan produk',
        engineering: 'Wawasan teknis',
        industry: 'Wawasan industri'
      },
      search: 'Cari',
      searching: 'Mencari...',
      readMore: 'Baca artikel',
      loadMore: 'Muat lebih banyak',
      end: 'Tidak ada artikel lagi',
      empty: 'Tidak ada artikel yang sesuai dengan filter.'
    },
    article: { back: 'Kembali ke blog', related: 'Artikel terkait', dateLocale: 'id-ID' }
  },
  ms: {
    eyebrow: 'Blog',
    heroTitle: 'Blog FastGPT',
    heroDescription: 'Kemas kini produk, amalan teknikal dan pengalaman praktikal AI Agent',
    allPosts: {
      title: 'Semua artikel',
      filters: {
        all: 'Semua',
        product: 'Kemas kini produk',
        engineering: 'Cerapan teknikal'
      },
      categoryLabels: {
        product: 'Kemas kini produk',
        engineering: 'Cerapan teknikal',
        industry: 'Cerapan industri'
      },
      search: 'Cari',
      searching: 'Mencari...',
      readMore: 'Baca artikel',
      loadMore: 'Muatkan lagi',
      end: 'Tiada artikel lagi',
      empty: 'Tiada artikel sepadan dengan penapis.'
    },
    article: { back: 'Kembali ke blog', related: 'Artikel berkaitan', dateLocale: 'ms-MY' }
  }
};

export function getBlogCopy(locale: string): BlogCopy {
  return blogCopyMap[normalizeLocale(locale)];
}
