# Week07 官网生产发布路径研究

调查日期：2026-09-06。基线：`labring/fastgpt-home` 的 `main`，提交 `6d8583fc7b913f809afb08aa5b791b2a36d4fc54`。

## 结论与执行路径

完成内容验证后，将发布 PR squash 合并到 upstream `main`，同一新提交会进入现有 CN 镜像工作流和 IO Cloudflare Pages Git 集成。两条路径的当前基线均已成功；正式发布完成标准为新提交的两个 provider 信号成功，并且两站 Week07 最终 canonical URL 的 live 内容验证通过。[CN 基线运行](https://github.com/labring/fastgpt-home/actions/runs/34012808976)、[IO 基线 Check](https://api.github.com/repos/labring/fastgpt-home/check-runs/101431991313)、[IO main Check Suite](https://api.github.com/repos/labring/fastgpt-home/check-suites/92160318842)

1. 在已验证的发布 PR 上固定 head SHA，采用 squash 合并。`main` 规则要求 PR、一个 approval、code owner、线性历史和签名；现有 ruleset 同时包含 `RepositoryRole` 角色 `5` 的 `always` bypass。当前 `gh` 身份在仓库 API 中拥有 `admin: true`。发布执行者可以使用现有权限完成合并，保留 ruleset 配置。[主分支规则](https://api.github.com/repos/labring/fastgpt-home/rules/branches/main)、[ruleset 5972594](https://api.github.com/repos/labring/fastgpt-home/rulesets/5972594)、[仓库权限](https://api.github.com/repos/labring/fastgpt-home)
2. 取得合并后的 upstream `main` SHA，按该 SHA 观察下列两条生产任务。
3. 等待两站 canonical 页面、hub、搜索索引、sitemap 的新内容可见，保存 HTTP 与 HTML 证据，再运行现有校验器。

## CN：现有 GitHub Actions → GHCR → Kubernetes

当前 `.github/workflows/fastgpt-home-image.yml` 同时支持 `push` 到 `main` 和 `workflow_dispatch`，job 条件限定 `labring/fastgpt-home` 与 `refs/heads/main`。构建参数固定 `NEXT_PUBLIC_SITE_VARIANT=cn`；镜像标签为 `ghcr.io/labring/fastgpt-home:<github.sha>`，实际 rollout 使用构建输出的 immutable digest。工作流更新 `deployment/fastgpt-home` 的同名容器，等待最多 300 秒；rollout 失败时恢复先前 image 并再次等待。[当前工作流](https://github.com/labring/fastgpt-home/blob/6d8583fc7b913f809afb08aa5b791b2a36d4fc54/.github/workflows/fastgpt-home-image.yml)

基线运行 `34012808976` 的事件为 `push`、分支为 `main`，所有构建和 rollout 步骤均为 `success`。2026-09-06 的只读检查确认 `KUBE_CONFIG`、`NEXT_PUBLIC_CRM_API_URL` 等工作流所需 secret 名称已存在；读取内容仅限名称。[基线步骤](https://api.github.com/repos/labring/fastgpt-home/actions/runs/34012808976/jobs)、[GitHub Actions secret 名称 API](https://api.github.com/repos/labring/fastgpt-home/actions/secrets)

```bash
gh run list --repo labring/fastgpt-home \
  --workflow fastgpt-home-image.yml --branch main --commit "$releaseSha" \
  --json databaseId,headSha,status,conclusion,url
gh run view "$cnRunId" --repo labring/fastgpt-home \
  --json status,conclusion,headSha,jobs
```

同一提交需要重新发布 CN 时，现有入口为 `gh workflow run fastgpt-home-image.yml --repo labring/fastgpt-home --ref main`。

## IO：现有 Cloudflare Pages Git 集成

项目为 **`fastgpt-home`**，account 为 **`63337e3953bad2a6faf80279c78aba98`**，生产分支为 **`main`**。2026-08-17 的 retained provider artifact 明确记录 `project=fastgpt-home`、`deploymentEnvironment=production`，同一 artifact 的 Pages deployment list 记录 `Environment=Production`、`Branch=main`。该证据来自 `Guide Production Release` 运行 `32053216857`，artifact ID 为 `9295608965`。[历史 provider artifact](https://github.com/labring/fastgpt-home/actions/runs/32053216857/artifacts/9295608965)、[当时的 IO 发布步骤](https://github.com/labring/fastgpt-home/blob/7e700bd97dc857bf50a8d4f9dab180d53f3df4a9/.github/workflows/guide-production-release.yml)

当前 `main` 提交 `6d8583f` 的 Check Suite 为 `92160318842`，`head_branch=main`，app 为 `cloudflare-workers-and-pages`，结论为 `success`。Check `101431991313` 指向部署 **`3d36591b-4b5b-41ab-b7ae-538a9cc2e050`**，于 `2026-09-06T05:03:33Z` 完成；可访问部署地址为 [3d36591b.fastgpt-home.pages.dev](https://3d36591b.fastgpt-home.pages.dev)。这条 Git 集成直接在 GitHub Check 中回报状态。[当前 Check](https://api.github.com/repos/labring/fastgpt-home/check-runs/101431991313)、[当前 Check Suite](https://api.github.com/repos/labring/fastgpt-home/check-suites/92160318842)

调查时 [fastgpt-home.pages.dev](https://fastgpt-home.pages.dev) 与上述部署 URL 的首页响应完全相同（SHA-256 `4d3c8562892caade864d46ee4655548c6f60df038e420db25e455ba55fd98318`）；[fastgpt.io](https://fastgpt.io) 首页的 Next.js 脚本集合完全相同，正文差异集中在 Cloudflare 的 email-protection 改写及其解码脚本。结合当前 Git Check、生产别名与历史 provider 环境记录，现有生产发布触发路径可确认为 upstream `main` → Pages 项目 `fastgpt-home`。Cloudflare 官方说明 Git 项目的 production branch 支持自动部署。[Cloudflare 分支部署控制](https://developers.cloudflare.com/pages/configuration/branch-build-controls/)

```bash
gh api "repos/labring/fastgpt-home/commits/$releaseSha/check-runs" \
  --jq '.check_runs[] | select(.app.slug == "cloudflare-workers-and-pages") | {name,head_sha,status,conclusion,details_url,output}'
```

当前仓库变量 `CLOUDFLARE_PROJECT_NAME=fastgpt-home-run` 属于历史遗留；该项目名的 `pages.dev` 地址在本次检查中 DNS 解析失败。当前 preview workflow 和上述生产证据均使用 `fastgpt-home`。发布目标选择以上 provider 证据中的项目。[变量 API](https://api.github.com/repos/labring/fastgpt-home/actions/variables/CLOUDFLARE_PROJECT_NAME)、[当前 preview deploy](https://github.com/labring/fastgpt-home/blob/6d8583fc7b913f809afb08aa5b791b2a36d4fc54/.github/workflows/preview-deploy.yml)

PR preview 链路使用 `NEXT_PUBLIC_SITE_VARIANT=preview`，将构建产物上传至项目 `fastgpt-home` 的 `pr-<number>` 分支，提供审阅表示。当前工作流目录只有镜像发布、Guide verification、preview build、preview deploy 四个文件。Actions workflow 列表中的历史 `guide-production-release.yml` 已经离开 `main`；本次直接复用当前 Git 集成。[当前工作流目录](https://api.github.com/repos/labring/fastgpt-home/contents/.github/workflows?ref=main)、[preview build](https://github.com/labring/fastgpt-home/blob/6d8583fc7b913f809afb08aa5b791b2a36d4fc54/.github/workflows/preview.yml)

## 可复用的端到端验证

构建前与完整静态导出沿用 `npm run verify:release -- --keep-artifacts`。该命令在大小写敏感文件系统上执行 CN、IO、preview 三套构建，保留 `.release-artifacts/release-verification.json`；GitHub 的 `Guide Release Verification` 在 Linux 上执行同一入口。[发布验证说明](https://github.com/labring/fastgpt-home/blob/6d8583fc7b913f809afb08aa5b791b2a36d4fc54/docs/release/README.md)、[验证工作流](https://github.com/labring/fastgpt-home/blob/6d8583fc7b913f809afb08aa5b791b2a36d4fc54/.github/workflows/guide-release-verification.yml)

上线后采用 Week07 发布清单界定 HTTP 样本：所有本次新增或修改的 canonical 页面、相应 Guide/Technical Center hub、两个 technical search index、两站 sitemap，以及涉及的 locale owner 重定向。记录每次响应的 URL、HTTP 状态、Location、ETag/Last-Modified/Cache-Control 与时间；正文保存为对应路由的 `.html` 文件。页面核验覆盖 self-canonical、H1、title/description、reciprocal hreflang、Article/BreadcrumbList JSON-LD、Guide 本地化更新时间、主要正文与公开 HTTPS Sources。新内容应出现在 hub、search index 与 owner sitemap 中。[Guide HTML 校验实现](https://github.com/labring/fastgpt-home/blob/6d8583fc7b913f809afb08aa5b791b2a36d4fc54/scripts/verify-guide-export.js)、[Technical export 校验实现](https://github.com/labring/fastgpt-home/blob/6d8583fc7b913f809afb08aa5b791b2a36d4fc54/scripts/verify-technical-export.js)

现有 Guide 校验器可直接验证从生产下载的 HTML：为每个站点下载 registry 中全部 Guide canonical、`/guide` 和 `/sitemap.xml`，保持 `guide.html`、`guide/<slug>.html`、`sitemap.xml` 文件结构，然后执行：

```bash
node scripts/verify-guide-export.js --out-dir "$liveRoot/cn" --variant cn
node scripts/verify-guide-export.js --out-dir "$liveRoot/io" --variant io
node scripts/verify-content-hygiene.js --mode html --root "$liveRoot/cn" --variant cn
node scripts/verify-content-hygiene.js --mode html --root "$liveRoot/io" --variant io
```

本次对现有生产基线实际执行：36 次 GET 全部 HTTP 200；CN、IO 各 17 个 Guide HTML 与 17 个 sitemap URL 验证通过；两站各 17 份 HTML 的内容卫生检查通过。研究 worktree 的首次卫生检查因 TypeScript 依赖解析失败而退出，随后通过 `NODE_PATH=/Users/longnv/.codex/worktrees/d072/fastgpt-home/node_modules` 复用现有依赖，两次重跑均成功。该基线只证明现有 live 样本及验证方法；Week07 上线后应对新提交重跑。[Guide registry](https://github.com/labring/fastgpt-home/blob/6d8583fc7b913f809afb08aa5b791b2a36d4fc54/src/content/guides/registry.json)、[HTML 卫生校验器](https://github.com/labring/fastgpt-home/blob/6d8583fc7b913f809afb08aa5b791b2a36d4fc54/scripts/verify-content-hygiene.js)

## 权限与观测边界

GitHub Actions 中存在 `CLOUDFLARE_API_TOKEN` 与 `KUBE_CONFIG` secret 名称，当前 CN 成功运行进一步证明其执行环境可用。本机环境没有 Cloudflare/Wrangler token，Wrangler 偏好目录没有认证配置，Codex 内置浏览器访问 Cloudflare 后显示登录页。直接读取 Cloudflare 项目实时配置或手动恢复 Pages deployment 需要可用的 Cloudflare 登录/API 会话；现有 Git 自动部署与 GitHub Check 观测路径已具备可用证据。[secret 名称 API](https://api.github.com/repos/labring/fastgpt-home/actions/secrets)、[Cloudflare 项目控制台](https://dash.cloudflare.com/?to=/63337e3953bad2a6faf80279c78aba98/pages/view/fastgpt-home)

本次研究保持外部只读。保留 CN 自动 rollback；将上述当前 Pages 部署 ID 记录为 IO 发布前参考值。发布执行前再核对一次 upstream main 与生产 Check，随后合并并验证新 SHA。
