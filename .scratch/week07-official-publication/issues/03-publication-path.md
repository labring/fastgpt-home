# 中文站与英文站的现有发布路径

Type: research
Labels: wayfinder:research
Status: resolved
Assignee: release_research
Parent: [Week07 官网全量内容发布](../map.md)
Blocked by:

## Question

核实本仓库生产 CN/IO 部署来源、触发方式和可用验证方法，确定使用当前授权可完成的最短正式发布路径。

## Answer

生产触发点为 upstream `labring/fastgpt-home` 的 `main`。CN 由现有镜像工作流构建 `cn` 产物并执行 Kubernetes digest rollout；IO 由 Cloudflare Git 集成发布至 `fastgpt-home` 项目的生产 `main` 分支。当前提交 `6d8583f` 的两项 provider 信号均成功。

已用生产下载的 34 份 Guide HTML 和 2 份 sitemap 证明现有 Guide export / HTML hygiene 校验器可用于 live 检查，所有检查通过。Week07 内容验证后 squash 合并发布 PR，按新 SHA 等待两项 provider 信号，再对新发布 canonical、hub、搜索索引和 sitemap 复验。

详细证据、主分支权限规则、历史 Cloudflare 变量辨析与执行命令见 [publication-path.md](../research/publication-path.md)。

## Comments

- 2026-09-06：完成 repo workflow、GitHub Check/Actions/provider artifact 与 public HTTP 的只读调查；Cloudflare 手动操作需要登录/API 会话，现有 Git 自动发布路径可继续使用。
