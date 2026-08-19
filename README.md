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

如果官网表单链接本身没有携带 `?source=...`，可以通过构建时变量设置 Home 的默认业务来源：

```bash
NEXT_PUBLIC_ATTRIBUTION_SOURCE=home \
NEXT_PUBLIC_CRM_API_URL=https://crm.example.com/api/v1 \
npm run build
```

显式的 `source` query 参数优先于该默认值；变量未配置时回退为 `未知`。该变量是公开构建配置，
不要填写密钥等敏感信息。

商务表单的业务来源使用独立的 `source` query 参数，例如
`/zh/contact?source=feishu`。每次提交时，官网实时读取当前 URL 的 `source`；没有该参数时使用
构建时默认值，未配置则为 `未知`。提交来源不读取 Cookie 或其他本地归因状态。UTM 仍可用于匿名渠道分析，
但不参与表单提交来源，也不再作为飞书客户来源；显式 `source` 只在提交商机时发送给 CRM。
表单接口只接收表单字段、`visitor_id` 和 `source`，UTM/channel 等字段由匿名访客上报接口独立发送。

## Build

```bash
npm run build
```

构建产物输出到 `out/` 目录（静态导出），通过 Nginx 或 Cloudflare Pages 托管。

## Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_VARIANT=cn \
  --build-arg NEXT_PUBLIC_HOME_URL=https://fastgpt.cn \
  -t fastgpt-home .
docker run -p 80:80 fastgpt-home
```

The Docker image publishes the `cn` Site Variant. The `io` and `preview` variants publish through Cloudflare Pages.
The production `/customers` reverse proxy is configured at container startup from a Kubernetes Secret;
see [docs/customers-proxy-runbook.md](docs/customers-proxy-runbook.md).

## License

[Apache-2.0](LICENSE)
