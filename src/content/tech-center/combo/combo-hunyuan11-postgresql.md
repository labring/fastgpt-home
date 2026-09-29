---
title: Hunyuan 6K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-hunyuan11-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Hunyuan 6K 上下文模型档位提供 6000 token 的上下文长度，这意味着单次请求中可以输入给模型的文本总量（包括用户问题、系统指令和召回内容）受到此上限约束。引用上限为 4000 token，这部分预算专用于承载从知识库检索到的内容。模型单次最大输出未标注，通常由实际应用场景决定。支持"
language: zh
axis_model_tier: "Hunyuan / 6000 /  / 4000 / true / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "hunyuan-vision"
check_day: 2026-09-29
meta_title: Hunyuan 6K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Hunyuan 6K 上下文模型档位提供 6000 token 的上下文长度，这意味着单次请求中可以输入给模型的文本总量（包括用户问题、系统指令和召回内容）受到此上限约束。引用上限为 4000 token，这部分预算专用于承载从知识库检索到的内容。模型单次最大输出未标注，通常由实际应用场景决定。支持
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Hunyuan 6K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Hunyuan 6K 上下文模型档位提供 6000 token 的上下文长度，这意味着单次请求中可以输入给模型的文本总量（包括用户问题、系统指令和召回内容）受到此上限约束。引用上限为 4000 token，这部分预算专用于承载从知识库检索到的内容。模型单次最大输出未标注，通常由实际应用场景决定。支持图片输入 `true` 允许模型处理图像信息，可用于多模态应用。工具调用 `false` 则表示此模型不直接支持函数调用或外部工具集成，需要通过外部逻辑进行编排。这些参数共同定义了模型在 RAG 场景下的能力边界和资源消耗。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项             | 建议取法       | 这样取的依据                                                 |
| ------------------ | -------------- | ------------------------------------------------------------ |
| `PG_URL`           | `postgresql://user:password@host:port/database` | 标准 PostgreSQL 连接字符串，确保 FastGPT 能正确连接到 pgvector 数据库实例。 |
| `ef_construction`  | `100`          | HNSW 索引构建参数，影响索引质量和构建速度。此值越大，索引质量越高，但构建时间越长。 |
| `ef_search`        | `40`           | HNSW 搜索参数，影响搜索召回率和查询速度。此值越大，召回率越高，但查询延迟可能增加。 |
| `m`                | `32`           | HNSW 索引参数，表示每个节点的最大连接数。影响索引大小和搜索性能。 |
| `vector_ip_ops`    | `true`         | 启用内积操作符，优化向量相似度计算，适用于余弦相似度等场景。 |
| `max_connections`  | `100-200`      | PostgreSQL 数据库的最大连接数，根据并发请求量和数据库资源进行调整。 |

## 这两者互相约束的地方
Hunyuan 6K 上下文模型的 6000 token 上下文长度和 4000 token 的引用上限，与 PostgreSQL（pgvector） 的检索结果直接相关。向量库返回的是匹配的文本段落条数，而模型的引用上限是 token 预算。这意味着，如果检索到的每段文本较长，即使返回的条数不多，也可能迅速触及 4000 token 的引用上限。反之，如果每段文本较短，即使返回条数较多，也可能在引用上限内。因此，需要根据实际文本分段策略和模型引用上限，合理配置检索返回的条数，确保总 token 数不超过 4000。PostgreSQL（pgvector）的索引参数 `ef_construction` 和 `ef_search` 调大，会提升召回的准确性和全面性，从而可能导致更多相关段落被召回，进而更早触及模型的引用上限。

## 容易做错的三处
*   日志显示 `context window exceeded`：原因在于召回内容与用户输入总和超过了 6000 token。
*   模型回答中引用内容缺失或不完整：原因在于检索到的内容总 token 数超过了 4000 的引用上限，导致部分内容被截断。
*   检索结果相关性差，模型“幻觉”严重：原因在于 `ef_search` 或 `m` 参数设置过低，导致向量检索未能找到最相关的文本段。

## 怎么确认配好了
*   在 FastGPT 知识库中上传测试文档，进行检索测试，检查返回的文本段落是否与预期相关。
*   通过 FastGPT 的调试界面，观察模型输入中的 `quote` 字段，确认召回内容是否完整且未超出 4000 token。
*   在 PostgreSQL 数据库中，通过 `EXPLAIN ANALYZE` 命令分析 `pgvector` 索引的查询性能，确认查询时间是否在可接受范围内。
*   在高并发场景下，监控 PostgreSQL 的 `pg_stat_activity` 表，观察连接数和查询延迟，确保数据库在高负载下稳定运行。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
