---
title: Groq 131K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-groq04-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Groq 的 131K 上下文模型，如 `qwen/qwen3.6-27b` 和 `meta-llama/llama-4-scout-17b-16e-instruct`，其上下文长度 131072 决定了单次模型调用能处理的总信息量，包括用户提问、系统指令和召回内容。引用上限 120000 意味着知"
language: zh
axis_model_tier: "Groq / 131072 /  / 120000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "qwen/qwen3.6-27b、meta-llama/llama-4-scout-17b-16e-instruct"
check_day: 2026-09-29
meta_title: Groq 131K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Groq 的 131K 上下文模型，如 `qwen/qwen3.6-27b` 和 `meta-llama/llama-4-scout-17b-16e-instruct`，其上下文长度 131072 决定了单次模型调用能处理的总信息量，包括用户提问、系统指令和召回内容。引用上限 120000 意味着知
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Groq 131K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Groq 的 131K 上下文模型，如 `qwen/qwen3.6-27b` 和 `meta-llama/llama-4-scout-17b-16e-instruct`，其上下文长度 131072 决定了单次模型调用能处理的总信息量，包括用户提问、系统指令和召回内容。引用上限 120000 意味着知识库召回的有效文本量不应超过此值，为 RAG 架构下的召回策略设定了硬性天花板。图片输入能力允许在多模态场景下引入图像信息，而工具调用则支持模型与外部系统进行交互，执行特定任务，扩展了模型的应用边界。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :------- | :----------- | :----------- |
| `PG_URL` | `postgresql://user:password@host:port/database` | 连接 PostgreSQL 数据库实例的通用格式。 |
| `ef_construction` | `64` | HNSW 索引构建时的参数，影响索引质量与构建时间，通常取 `ef_search` 的 1.5-2 倍。 |
| `ef_search` | `32` | HNSW 索引查询时的参数，影响召回精度与查询速度，与 `m = 32` 配合。 |
| `m` | `32` | HNSW 索引的 M 参数，控制每个节点的最大连接数，影响索引的内存占用和查询性能。 |
| `vector_ip_ops` | `true` | 启用内积操作，当 embeddings 向量归一化时，内积等价于余弦相似度，优化查询性能。 |
| 召回条数 | `前 5-10 条` | 经验值，结合模型引用上限与单段长度，避免上下文溢出。 |

## 这两者互相约束的地方
模型的 131072 上下文长度是总预算，知识库召回的文本内容，加上用户输入和系统指令，必须控制在此范围内。引用上限 120000 则进一步限制了知识库内容在上下文中的占比。PostgreSQL（pgvector）返回的召回条数与每段召回内容的平均长度的乘积，不能超过这个引用上限。当 `ef_search` 和 `ef_construction` 等索引参数调大时，pgvector 的召回精度通常会提高，但查询延时也会相应增加。这对于模型来说，意味着可能获得更相关的上下文，但也可能导致整个 RAG 链路的响应时间延长，影响用户体验。因此，需要在召回质量与系统响应速度之间找到平衡点。

## 容易做错的三处
*   日志中出现 `ERROR: context window exceeded`，原因是没有根据模型 131072 的上下文长度合理配置召回条数或单段长度。
*   查询结果返回的召回条数少于预期，原因是 `ef_search` 参数设置过低，导致 HNSW 索引无法有效探索足够多的邻居。
*   界面上显示「工具调用失败」，原因是模型在调用工具时，其输入参数未按照工具定义的 schema 进行格式化。

## 怎么确认配好了
*   执行 FastGPT 知识库查询，检查日志输出的召回内容总长度，确保其在 120000 引用上限内。
*   通过 PostgreSQL 客户端，使用 `EXPLAIN ANALYZE` 命令测试 pgvector 索引的查询性能，确认查询耗时在可接受范围内。
*   在 FastGPT 界面上上传图片并进行多模态问答，确认模型能正确处理图片输入并生成相关回答。
*   在 FastGPT 中配置并测试一个工具，验证模型能够成功调用该工具并处理返回结果。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
