# FAQ CMS 页面设计方案

## 📋 项目概述

为 FastGPT 官网创建完整的 FAQ 内容管理系统(CMS),包括列表页和详情页,数据来源于 `src/faq.ts` 文件。

### 目标
- ✅ 创建 FAQ 集中展示页面 (路径: `/{lang}/faq`)
- ✅ 创建单个 FAQ 详情页面 (路径: `/{lang}/faq/{id}`)
- ✅ 两个页面都复用统一的 Header 组件
- ✅ 支持多语言(zh/en/ja)
- ✅ SEO 优化和静态生成

---

## 🗂️ 文件结构

```
src/app/[lang]/faq/
├── page.tsx              # FAQ列表页 - 展示所有FAQ,支持分类筛选
├── [id]/
│   └── page.tsx          # FAQ详情页 - 显示单个FAQ的完整内容
└── layout.tsx            # FAQ布局 - 复用Header组件(可选,也可直接继承[lang]/layout.tsx)

src/components/faq/
├── FAQList.tsx           # FAQ列表组件
├── FAQCard.tsx           # FAQ卡片组件
├── FAQFilter.tsx         # 分类筛选组件
└── FAQDetail.tsx         # FAQ详情组件(可选)

src/faq.ts                # FAQ数据源(已存在)
```

---

## 📊 数据结构分析

### faq.ts 数据结构
```typescript
export const faq = {
  "Can-AI-intelligent-customer-service": {
    "Category": "Use Cases & Best Practices",
    "Question": "Can AI intelligent customer service platforms really reduce labor costs?",
    "Answers": "多段落回答内容...",
    "Title": "SEO标题",
    "Description": "SEO描述",
    "Keywords": "关键词,列表",
    "URL": "完整URL",
    "Url": "相对路径"
  },
  // ... 更多FAQ条目
}
```

### 数据字段说明
- **Key**: FAQ的唯一标识符(用于路由)
- **Category**: 分类标签(用于筛选)
- **Question**: 问题标题
- **Answers**: 详细回答(多段落文本,用 `\n\n` 分隔)
- **Title/Description/Keywords**: SEO元数据
- **URL/Url**: 路径信息(已有,可能需要更新)

### 分类统计
通过分析数据,主要分类包括:
- Use Cases & Best Practices
- Content & Creativity
- Development Challenges
- 更多分类待确认...

---

## 🎨 页面设计详情

### 1. FAQ列表页 (`/[lang]/faq`)

#### 功能需求
1. **分类筛选**
   - 顶部显示所有分类标签
   - 点击分类筛选对应FAQ
   - "All" 选项显示全部
   - 活跃状态高亮

2. **FAQ展示**
   - 响应式网格布局(桌面3列,平板2列,手机1列)
   - 每个FAQ卡片显示:
     - 分类标签
     - 问题标题
     - 回答摘要(前150字)
     - "阅读更多"链接
   - 卡片悬浮效果

3. **搜索功能(可选第二期)**
   - 顶部搜索框
   - 实时搜索问题标题和内容
   - 搜索结果高亮

4. **布局**
   - 复用Header组件
   - 页面标题和描述
   - 响应式容器

#### 技术实现
```typescript
// src/app/[lang]/faq/page.tsx
import { faq } from '@/faq';
import FAQList from '@/components/faq/FAQList';

export default async function FAQPage({
  params: { lang }
}: {
  params: { lang?: string }
}) {
  const dict = await getDictionary(lang || defaultLocale);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1>FAQ</h1>
      <FAQList faqData={faq} locale={dict.FAQ} />
    </div>
  );
}

// 静态生成所有语言版本
export async function generateStaticParams() {
  return Object.keys(localeNames).map((lang) => ({ lang }));
}

// 动态SEO
export async function generateMetadata({ params: { lang } }) {
  return {
    title: 'FAQ - FastGPT',
    description: '...'
  };
}
```

#### UI设计规范
```css
- 卡片间距: gap-6
- 卡片圆角: rounded-lg
- 卡片背景: bg-card/50 backdrop-blur
- 卡片悬浮: hover:scale-105 transition-transform
- 分类标签: 圆形徽章,颜色按分类区分
- 响应式断点: sm:grid-cols-2 lg:grid-cols-3
```

---

### 2. FAQ详情页 (`/[lang]/faq/[id]`)

#### 功能需求
1. **内容展示**
   - 面包屑导航(Home > FAQ > 当前问题)
   - 分类标签显示
   - 问题标题(大号字体)
   - 完整回答内容(支持多段落格式)
   - 发布/更新时间(可选)

2. **相关FAQ推荐**
   - 底部显示同分类的3-4个相关FAQ
   - 横向滚动卡片布局
   - 点击跳转到对应详情页

3. **导航功能**
   - "返回列表"按钮
   - 上一个/下一个FAQ导航
   - 分享按钮(可选)

4. **布局**
   - 复用Header组件
   - 居中阅读宽度(max-w-4xl)
   - 良好的行高和段落间距

#### 技术实现
```typescript
// src/app/[lang]/faq/[id]/page.tsx
import { faq } from '@/faq';
import { notFound } from 'next/navigation';

export default async function FAQDetailPage({
  params: { lang, id }
}: {
  params: { lang?: string; id: string }
}) {
  const faqItem = faq[id as keyof typeof faq];

  if (!faqItem) {
    notFound();
  }

  // 获取相关FAQ(同分类)
  const relatedFAQs = Object.entries(faq)
    .filter(([key, item]) =>
      item.Category === faqItem.Category && key !== id
    )
    .slice(0, 4);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* 面包屑 */}
      <Breadcrumb />

      {/* 主内容 */}
      <header>
        <span className="category-badge">{faqItem.Category}</span>
        <h1>{faqItem.Question}</h1>
      </header>

      {/* 回答内容 */}
      <div className="prose prose-lg">
        {faqItem.Answers.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* 相关FAQ */}
      <section className="related-faqs">
        <h2>相关问题</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedFAQs.map(([key, item]) => (
            <FAQCard key={key} id={key} data={item} />
          ))}
        </div>
      </section>
    </article>
  );
}

// 静态生成所有FAQ页面
export async function generateStaticParams() {
  const faqKeys = Object.keys(faq);
  const languages = Object.keys(localeNames);

  return languages.flatMap(lang =>
    faqKeys.map(id => ({ lang, id }))
  );
}

// 动态SEO(使用FAQ的Title和Description)
export async function generateMetadata({ params: { id } }) {
  const faqItem = faq[id as keyof typeof faq];

  if (!faqItem) return {};

  return {
    title: faqItem.Title,
    description: faqItem.Description,
    keywords: faqItem.Keywords
  };
}
```

#### UI设计规范
```css
- 内容宽度: max-w-4xl
- 标题字号: text-3xl md:text-4xl font-bold
- 段落间距: space-y-4
- 行高: leading-relaxed
- 面包屑: text-sm text-muted-foreground
- 相关FAQ卡片: 小尺寸卡片,紧凑布局
```

---

## 🎯 技术实现要点

### 1. 路由和静态生成
```typescript
// generateStaticParams 确保所有页面预生成
// 支持的路由格式:
// - /faq (默认中文)
// - /en/faq
// - /ja/faq
// - /faq/Can-AI-intelligent-customer-service
// - /en/faq/Can-AI-intelligent-customer-service
```

### 2. 多语言支持
```typescript
// 语言检测和回退
const langName = lang || defaultLocale; // 'zh'

// 字典获取
const dict = await getDictionary(langName);

// FAQ数据目前是英文,未来可扩展多语言
// 可以在faq.ts中添加语言字段或创建多份文件
```

### 3. SEO优化
```typescript
// 1. 使用FAQ的元数据
export async function generateMetadata({ params }) {
  return {
    title: faqItem.Title,
    description: faqItem.Description,
    keywords: faqItem.Keywords.split(', '),
    openGraph: {
      title: faqItem.Title,
      description: faqItem.Description,
      type: 'article'
    }
  };
}

// 2. 结构化数据(Schema.org)
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "问题标题",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "回答内容"
    }
  }]
}
</script>
```

### 4. 性能优化
- 使用 `generateStaticParams` 预生成所有页面
- 图片优化(如果有)使用 Next.js Image组件
- 懒加载相关FAQ组件
- 客户端组件仅用于交互部分(筛选、搜索)

---

## 🧩 组件设计

### FAQList.tsx (客户端组件)
```typescript
'use client';

interface FAQListProps {
  faqData: typeof faq;
  locale: any;
}

export default function FAQList({ faqData, locale }: FAQListProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 提取所有分类
  const categories = ['All', ...new Set(
    Object.values(faqData).map(item => item.Category)
  )];

  // 筛选逻辑
  const filteredFAQs = Object.entries(faqData).filter(([key, item]) => {
    const categoryMatch = selectedCategory === 'All' ||
                          item.Category === selectedCategory;
    const searchMatch = searchQuery === '' ||
                        item.Question.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div>
      {/* 分类筛选器 */}
      <FAQFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* FAQ网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFAQs.map(([id, item]) => (
          <FAQCard key={id} id={id} data={item} />
        ))}
      </div>
    </div>
  );
}
```

### FAQCard.tsx
```typescript
import Link from 'next/link';

interface FAQCardProps {
  id: string;
  data: {
    Category: string;
    Question: string;
    Answers: string;
  };
}

export default function FAQCard({ id, data }: FAQCardProps) {
  const summary = data.Answers.substring(0, 150) + '...';

  return (
    <Link href={`/faq/${id}`}>
      <div className="card group">
        <span className="category-badge">{data.Category}</span>
        <h3 className="text-xl font-semibold">{data.Question}</h3>
        <p className="text-muted-foreground">{summary}</p>
        <span className="read-more">Read more →</span>
      </div>
    </Link>
  );
}
```

### FAQFilter.tsx (客户端组件)
```typescript
'use client';

interface FAQFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function FAQFilter({ categories, selected, onSelect }: FAQFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "px-4 py-2 rounded-full transition-colors",
            selected === category
              ? "bg-primary text-primary-foreground"
              : "bg-secondary hover:bg-secondary/80"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
```

---

## 🌍 国际化配置

### locale文件更新
在 `src/locales/zh.json`, `en.json`, `ja.json` 中添加:

```json
{
  "FAQ": {
    "title": "常见问题",
    "subtitle": "查找关于FastGPT的常见问题解答",
    "allCategories": "全部分类",
    "readMore": "阅读更多",
    "backToList": "返回列表",
    "relatedQuestions": "相关问题",
    "searchPlaceholder": "搜索问题...",
    "noResults": "未找到匹配的问题"
  }
}
```

---

## 🎨 设计系统集成

### 颜色和样式
遵循现有的设计系统:
```typescript
// 继承自全局样式
- 主色调: primary/secondary/accent
- 背景色: background/card
- 文本色: foreground/muted-foreground
- 边框: border
- 圆角: rounded-lg/rounded-xl
- 阴影: shadow-lg/shadow-xl
- 动画: transition-all duration-300
```

### 响应式断点
```css
- sm: 640px  (手机横屏)
- md: 768px  (平板)
- lg: 1024px (桌面)
- xl: 1280px (大屏)
- 2xl: 1536px (超大屏)
```

---

## 🚀 部署和测试

### 本地开发
```bash
npm run dev
# 访问:
# http://localhost:3000/faq
# http://localhost:3000/en/faq
# http://localhost:3000/faq/Can-AI-intelligent-customer-service
```

### 构建和静态导出
```bash
npm run build
# 验证所有FAQ页面已生成
```

### 测试清单
- [ ] FAQ列表页加载正常
- [ ] 分类筛选功能正常
- [ ] FAQ详情页显示完整内容
- [ ] 相关FAQ推荐正确
- [ ] 多语言路由切换正常
- [ ] SEO元数据正确生成
- [ ] 响应式布局在各设备正常
- [ ] Header组件正确复用
- [ ] 404处理(不存在的FAQ ID)

---

## 📈 后续优化

### 第二期功能
1. **搜索优化**
   - 全文搜索
   - 搜索历史
   - 热门问题统计

2. **用户交互**
   - "这个回答有帮助吗?"反馈
   - 分享到社交媒体
   - 打印友好版本

3. **内容增强**
   - 视频/图片嵌入
   - 代码示例高亮
   - 目录导航(TOC)

4. **分析追踪**
   - 页面浏览统计
   - 搜索关键词分析
   - 用户行为热图

---

## 📚 参考资料

- Next.js App Router: https://nextjs.org/docs/app
- 多语言路由: https://nextjs.org/docs/app/building-your-application/routing/internationalization
- SEO优化: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Tailwind CSS: https://tailwindcss.com/docs

---

**文档版本**: v1.0
**创建日期**: 2025-10-12
**作者**: Claude Code
**项目**: FastGPT FAQ CMS
