---
title: Ernie 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-ernie09-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie-Lite-8K 模型提供了 8000 Token 的上下文长度，这意味着在单次交互中，模型可以处理的输入和输出总和不能超过此限制。引用上限 6000 Token 专门用于知识库检索内容，它设定了从知识库中召回并送入模型进行理解和生成回答的最大信息量。模型不具备图片输入能力，因此在 RAG"
language: zh
axis_model_tier: "Ernie / 8000 /  / 6000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "ERNIE-Lite-8K"
check_day: 2026-09-29
meta_title: Ernie 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Ernie-Lite-8K 模型提供了 8000 Token 的上下文长度，这意味着在单次交互中，模型可以处理的输入和输出总和不能超过此限制。引用上限 6000 Token 专门用于知识库检索内容，它设定了从知识库中召回并送入模型进行理解和生成回答的最大信息量。模型不具备图片输入能力，因此在 RAG
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Ernie-Lite-8K 模型提供了 8000 Token 的上下文长度，这意味着在单次交互中，模型可以处理的输入和输出总和不能超过此限制。引用上限 6000 Token 专门用于知识库检索内容，它设定了从知识库中召回并送入模型进行理解和生成回答的最大信息量。模型不具备图片输入能力，因此在 RAG 链路中不需要考虑多模态信息的整合。同时，该模型不支持工具调用，这意味着复杂的外部功能扩展，如数据库查询或 API 调用，需要通过其他方式实现，不能直接集成到模型的生成流程中。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :----- | :----- |
| `PG_URL` | `postgresql://user:password@host:port/database` | 连接 FastGPT 到 pgvector 实例的统一资源定位符。 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量与构建时间。数值越大，索引质量越高，但构建时间越长。 |
| `ef_search` | `32` | HNSW 索引搜索参数，影响搜索召回率与查询速度。数值越大，召回率越高，但查询时间越长。 |
| `m` | `16` | HNSW 索引图层中的最大连接数。过大的值会增加内存消耗和索引构建时间，过小会降低搜索效率。 |
| `vector_ip_ops` | `true` | 使用内积（Inner Product）进行向量相似度计算，适用于ERNIE系列模型。 |

## 这两者互相约束的地方
Ernie-Lite-8K 的上下文长度和引用上限，与 pgvector 检索出的内容直接关联。知识库召回的每一段文本长度，以及召回段落的总数量，必须确保其总 Token 数不超过模型的 6000 Token 引用上限。同时，这个总和再加上用户问题和模型生成的回答，不能超出 8000 Token 的整体上下文长度。pgvector 的 `ef_search` 参数决定了向量搜索阶段返回的候选数量，这个数量会进一步被 FastGPT 框架限制为实际送入模型的召回条数。如果 `ef_search` 值设置过低，可能导致无法充分利用知识库。索引参数 `ef_construction` 和 `m` 的调整，会影响向量搜索的效率和准确性，从而间接影响模型获得高质量上下文的速度和内容。

## 容易做错的三处
*   错误信息显示 `context window exceeded`：这意味着送入模型的总 Token 数超出了 8000 Token 上下文限制，通常是由于召回段落过多或单段文本过长。
*   检索结果为空或不相关：可能是 `ef_search` 参数设置过低，导致 pgvector 无法返回足够多的相关向量，或者向量索引 `m` 值不合理。
*   响应时间过长：`ef_construction` 或 `ef_search` 设置过高，导致 pgvector 索引构建或查询耗时过长，影响了整体响应速度。

## 怎么确认配好了
*   在 FastGPT 知识库管理页面，尝试上传并检索大量文档，观察每次检索的返回条数是否符合预期，以及返回内容的相关性。
*   通过 FastGPT 的调试功能，查看实际发送给 Ernie-Lite-8K 模型的 Prompt 内容和 Token 计数，确认引用内容的总 Token 数在 6000 Token 限制内。
*   监控 PostgreSQL 实例的 CPU、内存和 I/O 使用率，确保在进行向量搜索时，资源消耗在可接受范围内，以验证 `ef_construction` 和 `ef_search` 参数的合理性。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
