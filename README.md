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
