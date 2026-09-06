# Week07 官网内容评审

Labels: wayfinder:map
Status: open

## Destination

完成 Week07 全部官网候选内容的修订、静态内容入库和双站构建验证，并保留 open PR 供用户审核。范围为 958 个技术页面、7 篇中文 Guide 及对应 7 篇英文 Guide。

## Notes

- 2026-09-06：用户明确要求撤销已合并的发布，并保持 PR 为 open。合并及生产发布必须先取得用户针对新 PR 的明确批准；自动合并保持关闭。
- 用户授权采用 wayfinder 并跳过缺失 GSD 的决定继续有效。当前执行范围为内容准备、验证与 open PR。
- 首次发布提交 `86a8c52e782335ae627eb220729ddaad0307d603` 已通过撤销提交 `b6ced2fc8762eaccd2e3d86757147921b301936e` 恢复为发布前的 main 内容。
- 一张执行任务记录内容准备与审核状态；独立 research 票记录外部事实与发布路径依据。
- 保留已健康 URL；稿件问题通过事实修订和结构清理解决，资料中的关单状态与适用版本明确表达。
- 内容正文遵守 AGENTS.md 的 Published Content Hygiene；复用现有 Markdown、索引和 Guide registry，公开引用采用描述性 HTTPS 链接。
- 当前交付标准：候选与最终页面对应、源检查与回归通过、CN/IO/Preview 构建通过，以及 PR 保持 open 等待用户批准。

## Decisions so far

- [Guide 与迁移内容的公开技术依据](issues/01-guide-facts.md)：7 篇 Guide 完成中英双语改写，3 篇迁移稿完成定稿；17 份成稿通过研究复核。
- [中文站与英文站的现有发布路径](issues/03-publication-path.md)：记录既有发布流程，执行须先获得用户对新 PR 的明确批准。
- [发布顺序与逐页对应表](publication-inventory.csv)：972 个规范地址，中文站 759 个、英文站 213 个。
- [排障素材的真实解决路径与历史边界](issues/02-issue-facts.md)：99 篇逐页核对原始 issue 与全部评论，并恢复 17 篇被关单文案掩盖的主题。

## Not yet specified

新 PR 的审核意见与用户批准后的发布时间。

## Out of scope

第三方媒体与外链渠道的 339 件分发素材，以及此前 75 个历史目标地址的专门迁移修复，维持独立队列。
