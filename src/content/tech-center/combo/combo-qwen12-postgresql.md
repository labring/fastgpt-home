---
title: Qwen 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-qwen12-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Qwen 128K 上下文这一档模型，其上下文长度为 128000 tokens，意味着单次请求可以处理相当长的输入内容，为复杂的知识召回与推理提供了充足空间。引用上限 50000 tokens 则限定了知识库召回内容在最终提示词中的最大占比。模型具备工具调用能力，支持通过 Function Cal"
language: zh
axis_model_tier: "Qwen / 128000 /  / 50000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "qwen2.5-7b-instruct、qwen2.5-14b-instruct、qwen2.5-32b-instruct、qwen2.5-72b-instruct"
check_day: 2026-09-29
meta_title: Qwen 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Qwen 128K 上下文这一档模型，其上下文长度为 128000 tokens，意味着单次请求可以处理相当长的输入内容，为复杂的知识召回与推理提供了充足空间。引用上限 50000 tokens 则限定了知识库召回内容在最终提示词中的最大占比。模型具备工具调用能力，支持通过 Function Cal
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Qwen 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Qwen 128K 上下文这一档模型，其上下文长度为 128000 tokens，意味着单次请求可以处理相当长的输入内容，为复杂的知识召回与推理提供了充足空间。引用上限 50000 tokens 则限定了知识库召回内容在最终提示词中的最大占比。模型具备工具调用能力，支持通过 Function Calling 等机制与外部系统交互，扩展了 Agent 的执行边界。当前该档模型不支持图片输入，因此无法直接处理图像相关的多模态任务。单次最大输出未标注，通常需要通过实际测试来确定其生成回复的长度上限，避免回复截断。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 连接数据库实例的必要信息，确保可达性与权限。 |
| `ef_construction` | `32` 到 `64` | HNSW 索引构建参数，影响索引质量与构建时间，数值越大召回精度越高。 |
| `ef_search` | `16` 到 `32` | HNSW 索引查询参数，影响查询召回率与查询速度，数值越大召回率越高。 |
| `m` | `16` 或 `32` | HNSW 索引的图层最大连接数，影响索引大小与查询效率，通常取 `16` 或 `32`。 |
| `vector_ip_ops` | `true` | 启用向量内积操作，用于计算相似度，提高查询效率。 |
| 召回条数上限 | `20` 到 `40` 条 | 兼顾召回效率与模型上下文限制，过多条目可能导致上下文溢出。 |

## 这两者互相约束的地方
Qwen 128K 上下文模型与 PostgreSQL（pgvector）的配合，主要体现在知识召回内容的预算管理上。模型的上下文长度 128000 tokens 是硬性上限，这意味着向量库召回的文本内容（召回条数 × 每段文本长度）加上用户输入、系统指令等，总和不能超过此值。引用上限 50000 tokens 则进一步限制了知识库内容在整个提示词中的占比。当 pgvector 配置的召回条数乘以平均文本段长度超出此引用上限时，即使总上下文长度未满，知识库内容也会被截断。此外，pgvector 的 `ef_construction` 和 `ef_search` 参数直接影响召回精度，调大这些参数有助于提升召回内容的相关性，从而为模型提供更优质的输入，但同时也会增加索引构建和查询的资源消耗。

## 容易做错的三处
*   日志中出现 `Context window exceeded` 错误：原因通常是向量库召回的文本量过大，或用户输入过长，导致总输入 token 数超出模型 128000 tokens 的上下文限制。
*   返回结果中知识库引用字段为空：原因可能是向量库未返回任何匹配结果，或返回结果与模型引用上限不符，导致系统判定为无有效引用。
*   查询耗时过长，响应延迟高：原因可能是 pgvector 的 `ef_search` 参数设置过小导致查询效率低下，或索引未正确建立，导致全表扫描。

## 怎么确认配好了
*   执行一次包含知识库召回的 Agent 任务，检查模型返回的引用内容是否准确且与预期相关。
*   在 FastGPT 界面或日志中，观察每次模型调用的 token 消耗情况，确保召回内容和总上下文长度在模型限制范围内。
*   通过 PostgreSQL 数据库的 `EXPLAIN ANALYZE` 命令，分析向量查询的执行计划，确认 HNSW 索引是否被有效利用，并根据实际负载调整 `ef_search` 和 `m` 等参数的阈值。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
