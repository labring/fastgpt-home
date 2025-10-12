# FAQ 禁用测试检查清单

## 环境准备
- [ ] 确认 `.env.local` 中 `NEXT_PUBLIC_FAQ` 为空或未设置
- [ ] 清理之前的构建 `rm -rf .next out`
- [ ] 重新构建项目 `npm run build`

## 构建时检查
- [ ] 检查构建日志，确认没有生成 FAQ 静态页面
- [ ] 验证 `out/` 目录不包含 FAQ 相关文件
  ```bash
  find out -name "*faq*" -type f
  # 预期：无输出或只有与 FAQ 无关的文件
  ```

## 运行时检查
- [ ] 启动生产服务器 `npm start`
- [ ] 访问 `/en/faq` 返回 404
- [ ] 访问 `/zh/faq` 返回 404
- [ ] 访问 `/ja/faq` 返回 404
- [ ] 访问 `/en/faq/Can-AI-automatically-generate-FAQ` 返回 404

## SEO 检查
### Sitemap
- [ ] 访问 `/sitemap.xml`
- [ ] 确认不包含任何 `/faq` 路径

### Robots.txt
- [ ] 访问 `/robots.txt`
- [ ] 确认没有显式允许或禁止 FAQ 路径

### Meta Tags
- [ ] 使用开发者工具检查页面
- [ ] 如果 FAQ 页面意外加载，确认有 `<meta name="robots" content="noindex, nofollow">`

### 搜索引擎测试
- [ ] 使用 Google Search Console URL 检查工具
- [ ] 验证 FAQ 页面返回 404 状态
- [ ] 确认搜索引擎无法索引这些页面

## 链接检查
- [ ] 主页不显示 FAQ 链接
- [ ] 导航栏不包含 FAQ 入口
- [ ] Sitemap 不包含 FAQ 链接

## 日志检查
- [ ] 检查服务器日志，确认 404 响应
- [ ] 确认没有生成 FAQ 相关的静态资源

## 对比测试（可选）
### 启用 FAQ 后的行为
- [ ] 设置 `NEXT_PUBLIC_FAQ=true`
- [ ] 重新构建
- [ ] 验证 FAQ 页面可访问（200 状态）
- [ ] 验证 SEO 元数据正确生成

---

## 测试结果记录

**测试日期**: _______________
**测试人员**: _______________

### 发现的问题
1.
2.
3.

### 测试结论
- [ ] ✅ 通过：NEXT_PUBLIC_FAQ 未设置时，FAQ 路由不会触发 SEO
- [ ] ❌ 失败：存在以下问题需要修复
