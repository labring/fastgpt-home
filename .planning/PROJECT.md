# FastGPT 官网 W2 内容发布

## What This Is

FastGPT 官网是面向企业决策者、实施团队与开发者的 Next.js 多语言产品网站，承载产品介绍、定价、FAQ 与自然搜索入口。本项目负责把 W2 已交付内容转成可访问、可索引、可核验的官网页面，并为存量 FAQ 元数据修复建立确定性导入与回滚能力。

## Core Value

让用户与搜索引擎稳定获得准确、可核验、可访问的 FastGPT 产品信息。

## Business Context

- **Customer**: 正在评估知识库、RAG、Agent、智能客服与私有化部署方案的企业团队
- **Revenue model**: Cloud、开源自托管与商业版私有化交付共同承接官网自然流量转化
- **Success metric**: 64 条新内容完成线上数量、页面字段与 URL 稳定性验收；存量运行时覆盖 76 条 Meta 与 1,394 条分类映射，延期源行保留可追溯记录
- **Strategy notes**: `/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730/`

## Current Milestone: v1.0 W2 官网内容上线

**Goal:** 将 60 条精选规范 FAQ、4 篇竞品对比页、可唯一映射的存量 Meta 与分类修复直发到官网，并建立可重复执行的验证与回滚流程；未具备运行时对象的源行保留延期记录。

**Target features:**

- 接入 W2 V1.1 的 60 条中文 FAQ，完整保留八个发布字段与两个审计字段
- 让 FAQ 明细页、列表、搜索、分类、静态路由、sitemap 与结构化数据正确覆盖新增内容
- 建立并发布 4 篇竞品对比页，支持独立 Meta、能力表格、来源、核验日期、内链、图片与复核信息
- 将可唯一映射的 76 条 Title/Description 绑定到对应存量 FAQ，24 条缺少运行时对象的源行保留延期记录
- 将 1,394 条可唯一映射的分类建议重挂到 9 类，606 条源行保留置信度、人工复核与批次证据
- 通过源数据审计、构建、自动化测试、桌面端与移动端页面抽验完成整批上线验收

## Requirements

### Validated

- ✓ Next.js 多语言静态官网支持 `/[lang]/faq` 列表与 `/[lang]/faq/[id]` 详情路由 — existing codebase
- ✓ FAQ 列表支持分类筛选、关键词搜索与分批展示 — existing codebase
- ✓ `FaqItem` 已包含 Category、Question、Answers、Title、Description 与 Keywords — existing codebase
- ✓ FAQ 明细页已输出独立 Meta、Open Graph、Twitter、Breadcrumb 与 FAQ JSON-LD — existing codebase
- ✓ 中英文 FAQ 通过 locale overlay 与英文 fallback 组合 — existing codebase

### Active

- [x] 确定性导入 60 条 W2 V1.1 中文 FAQ，并验证 60 条、14 类、字段完整、slug 唯一与源内容一致
- [x] 将静态参数和 sitemap 从英文 key 集合扩展为 locale-aware 路由集合
- [x] 校准 `fastgpt.cn` 与 `fastgpt.io/zh` 的 canonical、hreflang、robots 与 sitemap 规则
- [x] 建立竞品对比内容模型、页面模板、4 篇正文发布流程与 90 天复核字段
- [x] 建立存量 FAQ 身份对齐层，将可唯一映射的 76 条 Meta 与 1,394 条分类建议写入运行时
- [x] 建立批量导入、审计、回滚与线上验收流程，覆盖已发布数量和 URL 稳定性

### Out of Scope

- 20 篇深度场景文章 — 从 W3 起按周生产与发布
- 剩余 1,900 条存量 FAQ Meta — 首批 100 条验证效果后进入后续批次
- 存量 FAQ 正文改写 — W2 保持线上正文原样
- 存量 slug 规范化、301、删除与合并 — W2 保持线上 URL 原样
- HiAgent 竞品对比页 — 首批四篇流程跑通后进入后续批次
- SEM 落地页、关键词包与付费投放 — 当前增长目标聚焦自然流量与 AI 搜索可见度

## Context

- 当前有效输入版本：60 条 FAQ 使用 V1.1；2,000 条分类重挂使用 V1.1；100 条 Meta 使用 V1.0；4 篇竞品初稿使用 2026-07-30 版本。
- 60 条 FAQ 工作簿包含 60 个唯一 slug、14 类、八个发布字段与两个审计字段，必填值完整。
- 当前仓库的英文与中文 FAQ 各有 1,400 条，两个 key 集合完全一致；静态参数与 sitemap 当前只读取英文 key。
- W2 的 60 个新 slug 与当前 1,400 个仓内 key 零冲突。
- 100 条 Meta 的线上 URL 与当前仓内 key 零直接命中；按问题文本可命中 76 条，剩余 24 条需要补齐真实对象来源。
- 2,000 条分类表包含 1,990 个唯一 URL 与 1,990 个唯一问句；当前仓内 1,400 个问句全部可在表中找到，表内另有 590 个仓内缺失对象。
- 分类表存在 10 组重复 URL，每组两行；批量导入前必须形成唯一、可审计的内容身份映射和冲突处理结果。
- 竞品事实核验日为 2026-07-20；对外稿采用成本项与计算模板，保持竞品价格数字为空。
- 竞品页源文件保留产品、销售与法务签发字段；用户于 2026-08-05 授权直发，12 条签发发现记录为 waived。

## Constraints

- **Content fidelity**: 页面事实、日期、范围与措辞以 W2 有效交付文件为准，导入保持签发正文原样
- **Identity integrity**: 存量导入以可追溯的线上 URL、问题文本与仓内 key 映射为前提，重复与缺失对象进入失败报告
- **URL stability**: 存量修复沿用既有正文、slug 与 URL
- **SEO contract**: 独立 Title/Description 进入 HTML、Open Graph 与 Twitter；canonical 与 hreflang 表达真实页面关系
- **Publishing discipline**: 四篇竞品页保留来源、核验日、签发状态、更新记录与 90 天复核日期
- **Runtime compatibility**: 继续使用现有 Next.js、TypeScript、静态导出与 locale fallback
- **Release safety**: 所有批量写入提供 dry-run、数量核对、失败清单、源文件指纹与回滚输入

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 以 `v1.0 W2 官网内容上线` 建立当前工作树的首个 GSD 里程碑 | W2 是本工作树首个完整内容发布周期 | — Confirmed |
| 以交付包标注的有效版本作为唯一内容源 | 同目录保留历史版本，明确版本可防止误导入 | — Confirmed |
| 64 条新内容与 2,100 条存量修复共同进入最终验收 | 用户明确给出整批上线数量 | — Confirmed |
| 20 篇深度场景文章进入 W3 后续排期 | 这 20 篇当前属于选题计划 | — Confirmed |
| 存量 FAQ 导入先完成身份对齐审计 | 仓内 1,400 条与交付包 2,000 行存在真实数据边界差异；直发覆盖唯一运行时对象并记录延期源行 | — Confirmed |
| 竞品页发布保留三方签发证据 | 源稿签发字段保留在 manifest；用户授权直接发布并记录豁免 | — Confirmed with waiver |
| 直接推送生产主分支 | 用户于 2026-08-05 明确要求跳过身份冲突协议与三方签发，工作流 30969755418 完成部署 | — Confirmed |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-08-05 after direct production verification*
