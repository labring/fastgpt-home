---
title: Moonshot 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-moonshot06-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`moonshot-v1-8k-vision-preview` 模型档位提供 8000 token 的上下文长度，决定了单次请求中模型能够处理的输入信息总量。引用上限为 6000 token，用于限定引用内容在总上下文中的预算。这意味着在 RAG 场景下，模型用于回答的引用内容合计不能超过 6000"
language: zh
axis_model_tier: "Moonshot / 8000 /  / 6000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "moonshot-v1-8k-vision-preview"
check_day: 2026-09-29
meta_title: Moonshot 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: `moonshot-v1-8k-vision-preview` 模型档位提供 8000 token 的上下文长度，决定了单次请求中模型能够处理的输入信息总量。引用上限为 6000 token，用于限定引用内容在总上下文中的预算。这意味着在 RAG 场景下，模型用于回答的引用内容合计不能超过 6000
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 8K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
`moonshot-v1-8k-vision-preview` 模型档位提供 8000 token 的上下文长度，决定了单次请求中模型能够处理的输入信息总量。引用上限为 6000 token，用于限定引用内容在总上下文中的预算。这意味着在 RAG 场景下，模型用于回答的引用内容合计不能超过 6000 token。工具调用功能支持模型与外部工具交互，扩展其能力边界。图片输入能力允许模型处理视觉信息，实现多模态交互。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，用于 FastGPT 访问 pgvector 实例 |
| `vector_dimensions` | `1536` | 与模型嵌入维度保持一致，确保向量兼容性 |
| `ef_construction` | `80–120` | 构建 HNSW 索引时的参数，影响索引质量与构建速度，兼顾召回率与写入性能 |
| `ef_search` | `60–100` | 查询 HNSW 索引时的参数，影响搜索精度与查询速度，兼顾召回率与查询性能 |
| `m` | `32` | HNSW 索引中每个节点的最大连接数，影响索引结构紧凑度与搜索效率 |
| `vector_ip_ops` | `true` | 使用内积作为相似度计算方式，与 OpenAI 嵌入模型推荐算法匹配 |

## 这两者互相约束的地方
模型的 8000 token 上下文长度是总预算，其中 6000 token 为引用上限。当 FastGPT 从 PostgreSQL（pgvector）检索到相关段落时，这些段落的累计 token 数量必须控制在 6000 token 以内。向量库返回的是固定数量的段落条数，而模型的引用上限是按 token 计数的。如果每段内容较长，即使返回的条数不多，也可能很快触及引用上限。反之，如果每段内容较短，可以返回更多条数。索引参数 `ef_construction` 和 `m` 等值调大，虽然能提升向量检索的精度，但也会增加索引构建时间和存储空间，这间接影响了数据更新的效率，可能导致数据在模型可用的时间窗内无法及时更新。

## 容易做错的三处
*   日志中出现 `Context window exceeded` 错误：检索到的内容加上用户问题超出了模型 8000 token 的总上下文长度。
*   模型回答中引用内容不完整或缺失：检索到的引用内容总 token 超过了 6000 token 的引用上限，导致部分内容被截断。
*   查询响应时间过长，甚至超时：`ef_search` 参数设置过高，导致向量搜索计算量过大。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，上传文档并进行切分，检查切分后的段落 token 数量是否符合预期。
*   通过 FastGPT 的调试模式，观察模型实际接收的 `quote` 内容，核对其 token 数量是否在 6000 token 范围内。
*   在 PostgreSQL 数据库中，通过 `EXPLAIN ANALYZE` 命令分析 `vector_ip_ops` 相关的查询语句，确认索引被正确使用且查询效率在可接受范围。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
