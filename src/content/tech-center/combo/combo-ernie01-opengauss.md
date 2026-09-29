---
title: Ernie 128K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-ernie01-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "此档模型提供 128000 tokens 的上下文长度 (`maxContext`)，这意味着单次交互中模型能处理的输入和输出内容总量上限。引用上限 (`quoteMaxToken`) 为 119000 tokens，这部分预算专用于承载从知识库中召回并注入模型的引用内容。引用上限限制了引用内容的总"
language: zh
axis_model_tier: "Ernie / 128000 /  / 119000 / false / true"
axis_vector_db: "openGauss"
covered_models: "ernie-5.1"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 openGauss 的配置口径
meta_description: 此档模型提供 128000 tokens 的上下文长度 (`maxContext`)，这意味着单次交互中模型能处理的输入和输出内容总量上限。引用上限 (`quoteMaxToken`) 为 119000 tokens，这部分预算专用于承载从知识库中召回并注入模型的引用内容。引用上限限制了引用内容的总
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
此档模型提供 128000 tokens 的上下文长度 (`maxContext`)，这意味着单次交互中模型能处理的输入和输出内容总量上限。引用上限 (`quoteMaxToken`) 为 119000 tokens，这部分预算专用于承载从知识库中召回并注入模型的引用内容。引用上限限制了引用内容的总 Token 消耗，引用内容的段落数量则由检索策略和每段内容的长度共同决定。此档模型支持工具调用 (`tool_calling: true`)，允许在对话过程中通过外部工具扩展其能力，但不具备图片输入 (`image_input: false`) 能力。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 openGauss 数据库的标准连接字符串格式。 |
| `ef_construction` | `80` | 控制 HNSW 索引构建时的邻居搜索范围，影响索引质量和构建时间。 |
| `ef_search` | `60` | 控制 HNSW 索引查询时的邻居搜索范围，影响查询召回率和速度。 |
| `m = 32` | `32` | HNSW 索引中每个节点的最大连接数，影响索引的内存占用和查询性能。 |
| `recall_top_k` | `5` | 向量检索时返回的相似度最高的文档段落数量。 |
| `chunk_overlap` | `100` 字符 | 分割文档时相邻段落间的重叠字符数，用于保持上下文连贯性。 |

## 这两者互相约束的地方
此档模型 128K 的上下文长度，对向量库召回内容的总量形成了硬性约束。召回的段落数量乘以每段内容的平均长度，其总 Token 数必须在模型的上下文预算之内。引用上限 119000 tokens 专用于引用内容，它按 Token 计数。向量库返回的则是按条数（段落数）计。当每段内容较短时，可能会先达到召回条数的限制；当每段内容较长时，则可能先触及引用上限的 Token 预算。openGauss 的索引参数，如 `ef_construction` 和 `ef_search`，调大后可以提升召回质量，但同时可能增加查询延迟。在模型侧有严格上下文限制的情况下，更精准的召回意味着可以在相同 Token 预算下，提供更相关、更有效的引用内容。

## 容易做错的三处
*   向量检索返回条数过少，模型回答不充分：原因可能是 `recall_top_k` 设置过低，或者 `ef_search` 过小导致召回不足。
*   FastGPT 部署时连接 openGauss 失败，报错 `invalid connection string`：原因通常是 `OPENGAUSS_URL` 环境变量格式不正确或数据库凭证有误。
*   模型回答中引用内容出现截断：原因可能是召回内容总 Token 数超过了 `quoteMaxToken`，或者单段内容过长导致超出单个 Chunk 的处理能力。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，上传文档后查看分段预览，确认分段粒度和重叠度符合预期。
*   通过 FastGPT 的调试功能，观察每次对话中模型实际接收到的引用内容 Token 数，确保未超出 119000 的引用上限。
*   在 openGauss 数据库中，查询 `pg_stat_activity` 表，确认 FastGPT 应用与数据库建立了正常的连接会话。
*   执行模拟查询，并通过 openGauss 的 `EXPLAIN ANALYZE` 命令分析向量索引的查询性能，验证 `ef_search` 和 `m` 参数的有效性。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
