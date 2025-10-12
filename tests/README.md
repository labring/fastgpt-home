# FAQ 功能测试工具包

本目录包含用于测试 FAQ 功能开关的工具和文档。

## 📁 文件说明

### 测试脚本

| 文件 | 用途 | 使用场景 |
|------|------|----------|
| `../scripts/quick-test-faq.sh` | 快速状态检查 | 验证当前 FAQ 配置状态 |
| `../scripts/test-faq-disabled.sh` | 完整自动化测试 | CI/CD 或全面验证 |
| `faq-disabled.spec.ts` | Playwright E2E 测试 | 浏览器自动化测试 |

### 文档

| 文件 | 内容 |
|------|------|
| `FAQ_DISABLED_TEST_CHECKLIST.md` | 手动测试清单 |
| `../claudedocs/FAQ_SEO_TESTING_GUIDE.md` | 完整测试指南 |

## 🚀 快速开始

### 1. 快速检查当前状态

```bash
./scripts/quick-test-faq.sh
```

**输出示例**：
```
🔍 Quick FAQ Test
=================

📋 Environment Check:
❌ FAQ is DISABLED (NEXT_PUBLIC_FAQ not set or empty)

🌐 Server Check:
✅ Server is running on port 3000
📄 /en/faq returns: 404
✅ Correct: FAQ disabled, returns 404

📂 Static Files Check:
✅ Correct: No FAQ files (FAQ disabled)
```

### 2. 完整自动化测试

```bash
# 测试 FAQ 禁用场景
./scripts/test-faq-disabled.sh
```

**这个脚本会**：
- ✅ 检查环境配置
- 🧹 清理旧构建
- 🔨 重新构建项目
- 📂 验证静态文件
- 🚀 启动服务器
- 🌐 测试 HTTP 响应
- 🤖 检查 SEO 标签
- 🗺️ 验证 sitemap

### 3. Playwright 浏览器测试

```bash
# 安装依赖（首次运行）
npm install -D @playwright/test

# 运行测试
npx playwright test tests/faq-disabled.spec.ts
```

### 4. 手动测试

按照 `FAQ_DISABLED_TEST_CHECKLIST.md` 中的清单逐项验证。

## 🎯 测试场景

### 场景 1：FAQ 禁用 (NEXT_PUBLIC_FAQ 未设置)

**期望行为**：
- ❌ 不生成 FAQ 静态页面
- ❌ FAQ 路由返回 404
- ❌ SEO 元数据包含 noindex
- ❌ Sitemap 不包含 FAQ

**测试命令**：
```bash
# 设置环境
echo "NEXT_PUBLIC_FAQ=" > .env.local

# 清理和重建
rm -rf .next out
npm run build

# 测试
./scripts/test-faq-disabled.sh
```

### 场景 2：FAQ 启用 (NEXT_PUBLIC_FAQ=true)

**期望行为**：
- ✅ 生成 FAQ 静态页面
- ✅ FAQ 路由返回 200
- ✅ SEO 元数据完整
- ✅ Sitemap 包含 FAQ

**测试命令**：
```bash
# 设置环境
echo "NEXT_PUBLIC_FAQ=true" > .env.local

# 清理和重建
rm -rf .next out
npm run build

# 启动服务器
npm start

# 手动测试
curl -I http://localhost:3000/en/faq
# 期望: HTTP/1.1 200 OK
```

## 🔧 测试前准备

### 环境要求
- Node.js >= 18
- npm 或 yarn
- 端口 3000 可用

### 清理构建

测试前务必清理之前的构建：

```bash
rm -rf .next out
```

### 检查端口占用

```bash
# 检查端口 3000
lsof -i :3000

# 如果被占用，终止进程
lsof -ti:3000 | xargs kill -9
```

## 📊 测试报告模板

### 测试环境
- 日期: [日期]
- Node.js 版本: [版本]
- Next.js 版本: [版本]
- 测试人员: [姓名]

### 测试结果

| 测试项 | 期望 | 实际 | 结果 |
|--------|------|------|------|
| FAQ 禁用时返回 404 | 404 | 404 | ✅ |
| 静态文件不生成 | 0 个文件 | 0 个文件 | ✅ |
| Meta 标签包含 noindex | 包含 | 包含 | ✅ |
| Sitemap 不包含 FAQ | 不包含 | 不包含 | ✅ |

### 问题记录
[记录发现的任何问题]

## 🐛 故障排除

### 问题：测试脚本无法执行

**解决**：
```bash
chmod +x scripts/*.sh
```

### 问题：端口 3000 已被占用

**解决**：
```bash
# 查找占用进程
lsof -i :3000

# 终止进程
kill -9 [PID]
```

### 问题：构建失败

**解决**：
```bash
# 清理所有依赖和构建
rm -rf node_modules .next out
npm install
npm run build
```

### 问题：环境变量不生效

**解决**：
```bash
# 确保 .env.local 格式正确
cat .env.local

# 重启开发服务器或重新构建
npm run build
```

## 📚 相关资源

- [FAQ SEO Testing Guide](../claudedocs/FAQ_SEO_TESTING_GUIDE.md) - 完整测试指南
- [FAQ Implementation Summary](../claudedocs/faq-implementation-summary.md) - FAQ 功能实现文档
- [Next.js Static Generation](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) - Next.js 官方文档

## 🤝 贡献

如果发现测试脚本的问题或有改进建议，请：
1. 记录问题和重现步骤
2. 提出改进方案
3. 更新相关文档

## 📝 维护日志

| 日期 | 变更 | 作者 |
|------|------|------|
| 2025-10-12 | 创建初始测试工具包 | Claude |

---

**提示**：始终在生产部署前运行完整的测试套件！
