---
title: Qwen 128K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-qwen05-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Qwen 系列此档模型提供了 128000 的上下文长度，决定了单次请求中模型能够处理的文本总量上限。引用上限为 120000 token，这是 FastGPT 在生成回答时，从知识库检索结果中提取并提供给模型作为参考内容的总预算。工具调用能力的 `true` 标志着模型能够与外部工具进行交互，支持"
language: zh
axis_model_tier: "Qwen / 128000 /  / 120000 / false / true"
axis_vector_db: "openGauss"
covered_models: "qwen-max"
check_day: 2026-09-29
meta_title: Qwen 128K 上下文 这一档模型配 openGauss 的配置口径
meta_description: Qwen 系列此档模型提供了 128000 的上下文长度，决定了单次请求中模型能够处理的文本总量上限。引用上限为 120000 token，这是 FastGPT 在生成回答时，从知识库检索结果中提取并提供给模型作为参考内容的总预算。工具调用能力的 `true` 标志着模型能够与外部工具进行交互，支持
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Qwen 128K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
Qwen 系列此档模型提供了 128000 的上下文长度，决定了单次请求中模型能够处理的文本总量上限。引用上限为 120000 token，这是 FastGPT 在生成回答时，从知识库检索结果中提取并提供给模型作为参考内容的总预算。工具调用能力的 `true` 标志着模型能够与外部工具进行交互，支持更复杂的 Agent 流程，例如通过调用 API 获取实时数据或执行特定操作。图片输入能力为 `false`，意味着此档模型不具备处理图像信息的能力。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 openGauss 数据库的通用连接字符串格式，需替换为实际部署信息。 |
| `ef_construction` | `64` | HNSW 索引构建时每个节点连接的最大邻居数。此值影响索引质量与构建速度，64 在效果与性能间取得平衡。 |
| `ef_search` | `32` | HNSW 索引查询时搜索列表的长度。此值影响查询召回率与查询速度，32 通常能保证较好的召回效果。 |
| `m` | `16` | HNSW 索引中每个节点的最大连接数。此值影响索引的内存占用和查询性能，16 是 openGauss 向量插件的推荐值，减少内存占用。 |
| `recall_top_k` | `5` | 向量检索时返回的相似向量数量。根据模型引用上限及单段长度，取值 5 通常能提供足够多的召回内容。 |

## 这两者互相约束的地方
此档模型的 128000 上下文长度是其处理能力的上限，其中 120000 token 专门用于引用内容。当从 openGauss 检索出多条段落时，这些段落的总长度（token 数）必须在 120000 token 的预算之内。向量库的检索结果以条数计，而模型引用内容以 token 计。因此，具体的召回条数需要根据每条段落的平均 token 长度来决定，以避免超出模型的引用上限。例如，如果平均每条段落包含 500 token，那么最多可以引用 240 条段落（120000 / 500）。openGauss 的 `ef_construction` 和 `ef_search` 参数调大，意味着索引质量和查询召回率可能提升，从而可能返回更多或更相关的段落。这要求 FastGPT 在将检索结果送入模型前，进行更精细的截断或摘要，以确保引用内容的总 token 数在模型许可的范围内。

## 容易做错的三处
*   日志中出现 `Context window exceeded` 报错：模型接收到的总 token 数（包含引用内容和用户输入）超过了 128000。
*   回答内容引用部分缺失或不完整：检索到的段落总 token 数超过了 120000 的引用上限，导致 FastGPT 截断了引用内容。
*   检索结果相关性不足：openGauss 的 `ef_search` 参数设置过小，导致 HNSW 索引在查询时搜索深度不足，未能找到最相关的文档。

## 怎么确认配好了
*   进行多次典型对话测试，观察模型回答中引用内容的完整性与相关性，确保引用内容未被非预期截断。
*   检查 FastGPT 后台日志，确认没有出现 `Context window exceeded` 或其他与 token 限制相关的警告信息。
*   在 FastGPT 知识库管理界面，随机抽取多条知识点进行调试，查看 openGauss 返回的 top-k 召回段落是否符合预期，并评估其相关性。
*   通过 openGauss 数据库的监控工具，观察向量检索查询的延迟和资源消耗，确保在当前 `ef_construction` 和 `ef_search` 参数下，查询性能满足系统要求。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
