---
title: Qwen 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-qwen09-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Qwen 32K 上下文模型系列，其 `maxContext` 达 32000 token，允许在单次交互中处理大量输入信息。单次最大输出 (`maxTokens`) 字段未标注，通常意味着模型会根据生成内容的需要动态调整输出长度。`quoteMaxToken` 设定为 30000 token，表示"
language: zh
axis_model_tier: "Qwen / 32000 /  / 30000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "qwen3-1.7b、qwen3-0.6b"
check_day: 2026-09-29
meta_title: Qwen 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Qwen 32K 上下文模型系列，其 `maxContext` 达 32000 token，允许在单次交互中处理大量输入信息。单次最大输出 (`maxTokens`) 字段未标注，通常意味着模型会根据生成内容的需要动态调整输出长度。`quoteMaxToken` 设定为 30000 token，表示
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Qwen 32K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么

Qwen 32K 上下文模型系列，其 `maxContext` 达 32000 token，允许在单次交互中处理大量输入信息。单次最大输出 (`maxTokens`) 字段未标注，通常意味着模型会根据生成内容的需要动态调整输出长度。`quoteMaxToken` 设定为 30000 token，表示用于引用的内容总预算。工具调用 (`tool_calling`) 功能支持，可集成外部工具增强模型能力。图片输入 (`image_input`) 功能当前不被支持，此档模型不处理图像信息。引用内容的 token 预算限制了引用内容的总量。检索到的段落数量由检索系统决定，这是两个独立的量。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接标准格式，确保模型可访问向量库 |
| `ef_construction` | `64` | 影响 HNSW 索引构建质量与速度，提升召回准确率 |
| `ef_search` | `32` | 影响 HNSW 搜索时的召回率，匹配 `ef_construction` 保持平衡 |
| `m = 32` | `32` | HNSW 图中每个节点的最大连接数，平衡查询速度与内存占用 |
| 召回条数 | `5–8 条` | 经验值，平衡召回质量与 `quoteMaxToken` 预算 |
| 单段最大字符数 | `800–1200 字符` | 控制每段信息量，避免单段过长挤占 `quoteMaxToken` |

## 这两者互相约束的地方

模型 32000 token 的 `maxContext` 预算，是所有输入（包括引用内容、用户问题、系统指令等）的总和上限。当使用 PostgreSQL（pgvector）进行向量检索时，检索到的段落数量乘以每段的平均长度，必须在这个 `maxContext` 范围内。`quoteMaxToken` 限制了引用内容总计的 token 消耗。向量库返回的是固定数量的段落，每段的长度决定了这些段落总计消耗的 token 量。如果每段内容较短，可能在达到 `quoteMaxToken` 上限之前就已返回了大量段落；如果每段内容较长，则可能在返回少量段落时就已触及 `quoteMaxToken`。pgvector 的索引参数如 `ef_construction` 和 `ef_search` 调大，通常能提升召回的准确性，这意味着模型能够获得更高质量的上下文信息，从而可能提升回答的相关性。但是，过高的参数值也会增加索引构建和查询的资源消耗，可能导致响应时间延长。

## 容易做错的三处

*   日志显示“上下文长度超出限制”：原因可能是检索返回的总内容 token 数超过了模型的 `maxContext` 或 `quoteMaxToken` 预算。
*   部分引用内容缺失：原因在于 `quoteMaxToken` 预算已满，后续检索到的段落被截断或丢弃。
*   检索结果不相关：原因可能是 pgvector 的 `ef_search` 或 `ef_construction` 参数设置过低，导致 HNSW 索引召回质量不佳。

## 怎么确认配好了

*   在 FastGPT 界面中上传测试文档，观察索引构建日志，确认 `ef_construction` 参数生效。
*   通过 FastGPT 的调试模式，查看模型输入中的引用内容，确认总 token 数未超出 `quoteMaxToken` 限制。
*   执行多次查询，观察响应时间是否在可接受范围内，并检查 pgvector 数据库的查询日志，评估 `ef_search` 参数对查询性能的影响。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
