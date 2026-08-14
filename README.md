# FastGPT Home

FastGPT 官网首页，基于 Next.js 16 + React 19 构建。

🌐 https://fastgpt.io

## Tech Stack

- Next.js 16 (Turbopack)
- React 19
- TailwindCSS
- HeroUI
- Cloudflare Pages

## Development

```bash
npm install
npm run dev
```

商务咨询表单需要在构建时配置 CRM API 地址（必须包含 `/api/v1`）：

```bash
NEXT_PUBLIC_CRM_API_URL=https://crm.example.com/api/v1 npm run build
```

同时在 CRM 服务中将官网域名加入 `CORS_ORIGINS`。如果未配置
`NEXT_PUBLIC_CRM_API_URL`，表单会明确显示 CRM 未配置错误，不会提交数据。

外部推广链接统一使用标准 UTM 参数，例如
`?utm_source=feishu&utm_medium=referral&utm_campaign=launch`。官网会通过 Cookie
保留并将这些 UTM 字段随表单提交给 CRM，不需要额外维护 `source` 参数。

## Build

```bash
npm run build
```

构建产物输出到 `out/` 目录（静态导出），通过 Nginx 或 Cloudflare Pages 托管。

## Docker

```bash
docker build -t fastgpt-home .
docker run -p 80:80 fastgpt-home
```

## License

[Apache-2.0](LICENSE)
