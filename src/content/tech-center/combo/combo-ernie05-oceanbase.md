---
title: Ernie 128K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-ernie05-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 128K 上下文模型，其 128000 的上下文长度（`maxContext`）决定了单次请求中模型可以处理的最大输入文本量，包括用户查询、历史对话以及召回内容。引用上限（`quoteMaxToken`）为 123000，这表示模型在生成回答时，用于引用的召回内容总计可以消耗 12300"
language: zh
axis_model_tier: "Ernie / 128000 /  / 123000 / true / false"
axis_vector_db: "OceanBase"
covered_models: "ernie-4.5-turbo-vl"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: Ernie 128K 上下文模型，其 128000 的上下文长度（`maxContext`）决定了单次请求中模型可以处理的最大输入文本量，包括用户查询、历史对话以及召回内容。引用上限（`quoteMaxToken`）为 123000，这表示模型在生成回答时，用于引用的召回内容总计可以消耗 12300
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
Ernie 128K 上下文模型，其 128000 的上下文长度（`maxContext`）决定了单次请求中模型可以处理的最大输入文本量，包括用户查询、历史对话以及召回内容。引用上限（`quoteMaxToken`）为 123000，这表示模型在生成回答时，用于引用的召回内容总计可以消耗 123000 个 token。单次最大输出未标注，意味着其输出长度根据具体应用场景和模型内部设定动态调整。此档模型支持图片输入（`true`），可以在多模态场景下进行图像理解与生成。不支持工具调用（`false`），因此无法直接与外部工具或 API 进行交互。

## 配 OceanBase 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OCEANBASE_URL` | `ob://user:password@host:port/database` | 数据库连接字符串，确保可达性和认证信息正确。 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量与构建速度，推荐值 32-128。 |
| `m` | `16` | HNSW 索引层数参数，影响搜索精度与内存占用，推荐值 8-64。 |
| `embedding_dimension` | `1536` | 嵌入向量维度，需与模型输出向量维度保持一致，否则无法匹配。 |
| `max_connections` | `50` | 数据库最大连接数，根据并发请求量和数据库负载能力调整。 |
| `recall_top_k` | `5-10` | 检索时返回的向量条数，影响召回内容丰富度。 |

## 这两者互相约束的地方
模型的上下文预算与向量库的召回策略需要协同考量。Ernie 128K 模型的 128000 token 上下文长度是总预算，其中 123000 token 用于引用内容。向量库按条数（`recall_top_k`）返回检索结果，每条召回内容的长度各不相同。当每条召回内容的平均 token 数量较大时，即使召回条数不多，也可能迅速触及模型的引用上限。反之，如果每条内容较短，可以在引用上限内包含更多召回条数。OceanBase 的 `ef_construction` 和 `m` 等索引参数调大，通常会提高向量检索的精度和召回质量，意味着模型能获得更相关、更准确的引用内容，这有助于模型在引用预算内生成更高质量的回答。

## 容易做错的三处
*   日志显示 `Connection refused` 或 `Authentication failed`：通常是 `OCEANBASE_URL` 中的主机、端口或认证信息配置不正确。
*   模型输出内容与预期召回内容不符，且返回条数正常：OceanBase 索引参数 `ef_construction` 或 `m` 配置过低，导致向量检索精度不足。
*   模型返回 `Context window exceeded` 错误：召回的文本内容总 token 数，加上用户查询和历史对话，超出了模型的 128000 上下文长度。

## 怎么确认配好了
*   执行一次简单的 RAG 查询，检查 OceanBase 查询日志，确认 `SELECT` 语句执行成功且返回了数据。
*   在 FastGPT 界面查看 RAG 效果，观察模型是否能准确引用召回内容中的关键信息。
*   逐步增加单次查询的召回条数或每段召回内容的长度，观察模型是否能正常处理，并通过日志确认没有超出上下文限制。
*   在 OceanBase 数据库监控中观察连接数和查询延迟，确保系统在高负载下仍能稳定运行。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
