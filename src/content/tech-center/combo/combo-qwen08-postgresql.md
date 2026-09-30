---
title: Qwen 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-qwen08-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "这一档模型具有 128000 的上下文长度，这意味着单次对话中模型能够处理的输入信息量庞大。引用上限为 100000，这限定了从知识库召回并作为上下文输入给模型的引用内容的总 token 预算。段落条数由检索逻辑决定，引用内容总 token 预算是独立的考量。该档模型支持工具调用，允许其与外部系统进"
language: zh
axis_model_tier: "Qwen / 128000 /  / 100000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "qwen3-235b-a22b、qwen3-32b、qwen3-30b-a3b、qwen3-14b、qwen3-8b、qwen3-4b、qwq-plus、qwq-32b"
check_day: 2026-09-29
meta_title: Qwen 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: 这一档模型具有 128000 的上下文长度，这意味着单次对话中模型能够处理的输入信息量庞大。引用上限为 100000，这限定了从知识库召回并作为上下文输入给模型的引用内容的总 token 预算。段落条数由检索逻辑决定，引用内容总 token 预算是独立的考量。该档模型支持工具调用，允许其与外部系统进
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Qwen 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
这一档模型具有 128000 的上下文长度，这意味着单次对话中模型能够处理的输入信息量庞大。引用上限为 100000，这限定了从知识库召回并作为上下文输入给模型的引用内容的总 token 预算。段落条数由检索逻辑决定，引用内容总 token 预算是独立的考量。该档模型支持工具调用，允许其与外部系统进行交互，执行特定任务。不支持图片输入，因此不应期望模型处理图像数据。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问 pgvector 扩展 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量和构建时间，平衡性能与准确性 |
| `ef_search` | `40` | HNSW 搜索参数，影响搜索召回率和查询速度，根据实际需求调整 |
| `m` | `32` | HNSW 索引的邻居数量，影响索引大小和搜索效率 |
| `vector_ip_ops` | `true` | 使用内积（inner product）进行向量相似度计算，与模型输出向量类型匹配 |
| 召回条数 | `前 5-8 条` | 平衡引用上限与信息密度，避免单次召回过多低相关内容 |

## 这两者互相约束的地方
Qwen 128K 上下文这一档模型，其 128000 的上下文长度是总输入限制。召回条数乘以每段文本的平均长度，其总和必须严格控制在模型的上下文预算之内。引用上限 100000 token 是对引用内容的单独预算，它与向量库返回的段落条数是两个不同的维度，引用上限按 token 计费，而向量库按条数返回，谁先达到限制取决于每段文本的平均 token 长度。当 PostgreSQL（pgvector）的索引参数，例如 `ef_construction` 和 `ef_search` 调大时，会提升召回的准确性，这对于模型理解复杂查询和生成高质量回答至关重要，但同时也会增加索引构建和查询的资源消耗。

## 容易做错的三处
*   在日志中出现 `ERROR: pgvector extension not found`：原因是没有在 PostgreSQL 数据库中创建 `pgvector` 扩展。
*   模型返回的回答内容过短或不完整：原因可能是引用上限 100000 token 提前耗尽，导致模型输入的信息不足以生成完整回答。
*   检索结果相关性差，模型回答质量不高：原因可能是 `ef_search` 参数设置过低，导致 HNSW 索引在搜索时未能充分探索邻近节点，召回了不相关的向量。

## 怎么确认配好了
*   执行 `CREATE EXTENSION IF NOT EXISTS vector;` 命令并检查是否成功，确保 `pgvector` 扩展已启用。
*   通过 FastGPT 的调试界面，观察模型输入上下文的 token 计数，确认引用内容总 token 未超过 100000。
*   使用 FastGPT 的知识库测试功能，输入测试问题，检查召回的段落内容是否与问题高度相关，并记录查询耗时作为性能基准。
*   监控 PostgreSQL 数据库的 CPU 和内存使用情况，确保在实际负载下数据库性能稳定，没有出现资源瓶颈。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
