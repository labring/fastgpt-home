# 图片优化指南

## 已优化的组件

### 1. Ability.tsx
- ✅ 为每个能力图片添加描述性 alt 文本
- ✅ 使用 `${item.title} - ${item.content}` 格式

### 2. NormalCardGrid.tsx
- ✅ 为企业功能卡片图片添加描述性 alt 文本
- ✅ 使用 `${item.title} - ${item.description}` 格式

### 3. 已有良好 alt 文本的组件
- ✅ Video.tsx - "FastGPT Demo Video"
- ✅ Header.tsx - 使用 `siteConfig.name`
- ✅ ScrollingLogos.tsx - 使用 `image.name`

## 待优化的大文件

### 需要压缩的图片
1. `public/shine.png` (9.9M) → 目标: <1M
2. `public/images/video/zh/video_dark_bak.png` (4.6M) → 目标: <500KB
3. `public/images/video/en/video_dark_bak.png` (4.5M) → 目标: <500KB
4. `public/images/video/zh/video.png` (2.8M) → 目标: <300KB
5. `public/images/video/en/video.png` (2.8M) → 目标: <300KB
6. `public/bg.png` (2.0M) → 目标: <200KB

### 压缩工具推荐
- **在线工具**: TinyPNG (https://tinypng.com/)
- **命令行工具**: 
  - ImageOptim (macOS)
  - pngquant
  - cwebp (WebP 转换)

### WebP 转换命令
```bash
# 安装 webp 工具
brew install webp

# 批量转换 PNG 到 WebP
find public -name "*.png" -exec sh -c 'cwebp -q 80 "$1" -o "${1%.png}.webp"' _ {} \;

# 批量转换 JPG 到 WebP
find public -name "*.jpg" -exec sh -c 'cwebp -q 80 "$1" -o "${1%.jpg}.webp"' _ {} \;
```

## Next.js Image 优化配置

### next.config.js 建议配置
```javascript
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
}
```

## 图片使用最佳实践

### 1. 使用 Next.js Image 组件
```tsx
import Image from 'next/image'

<Image
  src="/path/to/image.png"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy" // 懒加载
  placeholder="blur" // 模糊占位符
/>
```

### 2. 响应式图片
```tsx
<Image
  src="/path/to/image.png"
  alt="Descriptive alt text"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### 3. 优先加载关键图片
```tsx
<Image
  src="/hero-image.png"
  alt="Hero image"
  priority // 优先加载
  width={1200}
  height={600}
/>
```

## 性能目标

### Lighthouse 指标
- Performance: >90
- LCP (Largest Contentful Paint): <2.5s
- CLS (Cumulative Layout Shift): <0.1

### 图片优化目标
- 首屏图片: <100KB
- 非首屏图片: <200KB
- 使用 WebP 格式: 减少 30-50% 文件大小

## 监控和测试

### 工具
1. **Lighthouse** - Chrome DevTools
2. **PageSpeed Insights** - https://pagespeed.web.dev/
3. **WebPageTest** - https://www.webpagetest.org/

### 测试命令
```bash
# 本地 Lighthouse 测试
npm install -g lighthouse
lighthouse https://fastgpt.io --view

# 分析 bundle 大小
npm run build
npm run analyze
```

---

**更新时间**: 2026-03-08
**状态**: 部分完成
