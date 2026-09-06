# Week07 官网全量内容发布

Labels: wayfinder:map
Status: open

## Destination

完成 Week07 全部官网候选内容的修订、静态内容入库、双站构建和正式发布，并验证生产规范地址可访问。范围为 958 个技术页面候选、7 篇中文 Guide 及对应 7 篇英文 Guide。

## Notes

- 用户已明确授权全部发布；2026-09-06 明确授权采用 wayfinder 并跳过当前缺失的 GSD。
- 本地图采用 wayfinder 的执行覆盖：把实际修订、构建、提交、合并、双站发布与生产验证纳入目标；地图完成以生产证据为准。
- 一张执行任务贯穿修订和发布；独立 research 票用于外部事实与发布路径验证。
- 保留已健康 URL；所有候选均留处理结果。现有稿件的问题通过事实修订和结构清理解决。资料中的关单状态与适用版本明确表达。
- 内容正文遵守 AGENTS.md 的 Published Content Hygiene；复用当前 Markdown、索引和 Guide registry。公开引用采用描述性 HTTPS 链接。
- 需阅读 wayfinder 和 research 技能；实现遵守当前源码与 docs/release/README.md。研究分支独立记录依据。
- 完成标准：候选与最终页面对应、源检查、回归、CN/IO 静态构建、既有发布流程成功、双站规范 URL 与 sitemap 验证。

## Decisions so far

- [Guide 与迁移内容的公开技术依据](issues/01-guide-facts.md)：7 篇 Guide 完成中英双语改写，3 篇迁移稿按资产盘点、MaxKB 操作映射、并行切换分别定稿；17 份成稿通过研究复核。
- [中文站与英文站的现有发布路径](issues/03-publication-path.md)：复用 upstream main 的 CN 镜像/Kubernetes 与 IO Cloudflare Pages Git 集成。
- [发布顺序与逐页对应表](publication-inventory.csv)：972 个规范地址，中文站 759 个、英文站 213 个，所有既定候选保留。

- [排障素材的真实解决路径与历史边界](issues/02-issue-facts.md)：99 篇逐页核对原始 issue 与全部评论；依证据区分维护者建议、已文档化能力、社区方案与历史需求，恢复 17 篇被关单文案掩盖的主题。

## Not yet specified

生产构建或真实页面验证暴露的运行环境问题，随证据细化。

## Out of scope

第三方媒体与外链渠道的 339 件分发素材，以及此前 75 个历史目标地址的专门迁移修复，维持独立队列。
