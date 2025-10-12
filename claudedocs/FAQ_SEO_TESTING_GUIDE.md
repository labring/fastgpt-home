# FAQ SEO 测试指南

## 📝 问题描述

需要验证当环境变量 `NEXT_PUBLIC_FAQ` 未设置或为空时，FAQ 路由不会触发 SEO（搜索引擎优化）功能，包括：
- 不生成静态页面
- 不生成 SEO 元数据（title, description, keywords）
- 不出现在 sitemap 中
- 返回 404 状态码并添加 `noindex` 标签

## 🔧 代码实现

### 修改内容

**文件：`src/app/[lang]/faq/page.tsx`**
- `generateStaticParams()`: 当 FAQ 禁用时返回空数组，不生成静态页面
- `generateMetadata()`: 当 FAQ 禁用时返回 noindex 元数据

**文件：`src/app/[lang]/faq/[id]/page.tsx`**
- `generateStaticParams()`: 当 FAQ 禁用时返回空数组
- `generateMetadata()`: 当 FAQ 禁用时返回 noindex 元数据

### 关键代码逻辑

```typescript
// src/constants.ts
export const showFAQ = process.env.NEXT_PUBLIC_FAQ === 'true'

// 在页面组件中
if (!showFAQ) {
  notFound(); // 返回 404
}

// 在 generateStaticParams 中
export async function generateStaticParams() {
  if (!showFAQ) {
    return []; // 不生成静态页面
  }
  // ... 正常生成逻辑
}

// 在 generateMetadata 中
export async function generateMetadata() {
  if (!showFAQ) {
    return {
      title: 'Page Not Found',
      robots: {
        index: false,  // 告诉搜索引擎不要索引
        follow: false  // 不跟踪链接
      }
    };
  }
  // ... 正常 SEO 元数据
}
```

## 🧪 测试方法

### 方法 1：自动化测试脚本（推荐）

运行完整的自动化测试：

```bash
# 运行测试脚本
./scripts/test-faq-disabled.sh
```

脚本会自动执行以下步骤：
1. ✅ 验证环境变量配置
2. 🧹 清理之前的构建
3. 🔨 使用禁用的 FAQ 设置重新构建
4. 📂 检查是否生成了 FAQ 静态文件
5. 🚀 启动生产服务器
6. 🌐 测试 HTTP 响应状态码
7. 🤖 验证 robots meta 标签
8. 🗺️ 检查 sitemap 内容

### 方法 2：手动测试

#### 步骤 1：环境准备

```bash
# 编辑 .env.local，确保 NEXT_PUBLIC_FAQ 为空
NEXT_PUBLIC_FAQ=

# 清理构建
rm -rf .next out
```

#### 步骤 2：构建项目

```bash
# 使用禁用的 FAQ 设置构建
NEXT_PUBLIC_FAQ= npm run build
```

#### 步骤 3：检查构建输出

```bash
# 检查是否生成了 FAQ 静态文件
find out -name "*faq*" -type f

# ✅ 期望：无输出（没有 FAQ 文件）
# ❌ 问题：有输出（生成了 FAQ 文件）
```

#### 步骤 4：启动服务器

```bash
npm start
```

#### 步骤 5：测试 HTTP 响应

```bash
# 测试各语言的 FAQ 页面
curl -I http://localhost:3000/en/faq
curl -I http://localhost:3000/zh/faq
curl -I http://localhost:3000/ja/faq

# 测试 FAQ 详情页
curl -I http://localhost:3000/en/faq/Can-AI-automatically-generate-FAQ

# ✅ 期望：所有请求返回 404 状态码
```

#### 步骤 6：检查 Meta 标签

```bash
# 获取页面内容并检查 robots meta 标签
curl -s http://localhost:3000/en/faq | grep -i "robots"

# ✅ 期望：包含 <meta name="robots" content="noindex, nofollow">
```

#### 步骤 7：检查 Sitemap

```bash
# 如果有 sitemap
cat out/sitemap.xml | grep faq

# ✅ 期望：无输出（sitemap 不包含 FAQ）
```

### 方法 3：浏览器测试

1. **启动服务器**
   ```bash
   npm start
   ```

2. **访问 FAQ 页面**
   - 打开浏览器访问: `http://localhost:3000/en/faq`
   - ✅ 期望：显示 404 页面

3. **检查开发者工具**
   - 打开开发者工具（F12）
   - 查看 Network 标签
   - ✅ 期望：状态码为 404
   - 查看 Elements 标签
   - ✅ 期望：`<head>` 中有 `<meta name="robots" content="noindex, nofollow">`

### 方法 4：Playwright 自动化测试

```bash
# 安装 Playwright（如果还没安装）
npm install -D @playwright/test

# 运行测试
npx playwright test tests/faq-disabled.spec.ts
```

## 📋 测试检查清单

使用 `tests/FAQ_DISABLED_TEST_CHECKLIST.md` 进行完整的手动测试验证。

## ✅ 测试成功标准

### 构建阶段
- [ ] 构建成功完成
- [ ] `out/` 目录不包含 FAQ 文件
- [ ] 构建日志无 FAQ 相关错误

### 运行阶段
- [ ] `/en/faq` 返回 404
- [ ] `/zh/faq` 返回 404
- [ ] `/ja/faq` 返回 404
- [ ] `/en/faq/[id]` 返回 404

### SEO 阶段
- [ ] Meta 标签包含 `noindex, nofollow`
- [ ] Sitemap 不包含 FAQ 链接
- [ ] 主页不显示 FAQ 入口

## 🔄 对比测试（FAQ 启用）

为了验证功能正常，也应该测试启用 FAQ 的情况：

```bash
# 设置环境变量
echo "NEXT_PUBLIC_FAQ=true" > .env.local

# 重新构建
rm -rf .next out
npm run build

# 检查应该生成 FAQ 文件
find out -name "*faq*" -type f

# 启动服务器
npm start

# 测试应该返回 200
curl -I http://localhost:3000/en/faq
# ✅ 期望：HTTP/1.1 200 OK
```

## 🐛 常见问题

### 问题 1：构建时仍生成 FAQ 文件

**原因**：`generateStaticParams()` 没有检查 `showFAQ`

**解决**：确保 `generateStaticParams()` 函数中添加了检查：
```typescript
if (!showFAQ) {
  return [];
}
```

### 问题 2：页面返回 200 而不是 404

**原因**：环境变量在构建时和运行时不一致

**解决**：
- 清理构建：`rm -rf .next out`
- 确保环境变量正确：`NEXT_PUBLIC_FAQ=`
- 重新构建：`npm run build`

### 问题 3：Sitemap 仍包含 FAQ

**原因**：Sitemap 生成逻辑没有考虑 FAQ 开关

**解决**：检查 sitemap 生成逻辑，添加 `showFAQ` 检查

### 问题 4：搜索引擎仍然索引了页面

**原因**：之前已经被索引，需要时间更新

**解决**：
- 使用 Google Search Console 请求重新抓取
- 添加 `robots.txt` 禁止规则（如需要）
- 等待搜索引擎自然更新索引

## 📊 性能影响

### FAQ 禁用时
- ✅ 构建时间更短（无需生成 FAQ 静态页面）
- ✅ 部署包更小（无 FAQ 静态文件）
- ✅ 首次加载更快（无 FAQ 相关资源）

### FAQ 启用时
- 📈 增加约 3-10 个静态页面（取决于 FAQ 数量）
- 📈 增加约 50-200KB 构建输出

## 🔐 安全考虑

- FAQ 禁用时确保没有敏感信息泄露
- 404 页面不应暴露 FAQ 存在的线索
- 确保 robots meta 标签正确设置

## 📚 相关文档

- [Next.js Static Generation](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [SEO Best Practices](https://developers.google.com/search/docs/beginner/seo-starter-guide)

## 🎯 总结

通过以上测试方法，可以全面验证 `NEXT_PUBLIC_FAQ` 未设置时：

1. ✅ **构建层面**：不生成 FAQ 静态文件
2. ✅ **运行层面**：返回 404 状态码
3. ✅ **SEO 层面**：添加 noindex 标签，不出现在 sitemap
4. ✅ **用户层面**：无法访问 FAQ 内容
5. ✅ **搜索引擎层面**：不会索引 FAQ 页面

这确保了 FAQ 功能完全可控，当不需要时完全不影响项目的 SEO 和性能。
