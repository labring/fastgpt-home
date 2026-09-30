---
title: Qwen 25K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-qwen04-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "这一档模型，如 `qwen3-vl-flash` 和 `qwen3-vl-plus`，具备 25000 的上下文长度（`maxContext`），这意味着单次请求中模型可以处理的总文本量上限。引用上限（`quoteMaxToken`）为 20000，它限定了注入模型进行引用的内容总token预算。段"
language: zh
axis_model_tier: "Qwen / 25000 /  / 20000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "qwen3-vl-flash、qwen3-vl-plus"
check_day: 2026-09-29
meta_title: Qwen 25K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: 这一档模型，如 `qwen3-vl-flash` 和 `qwen3-vl-plus`，具备 25000 的上下文长度（`maxContext`），这意味着单次请求中模型可以处理的总文本量上限。引用上限（`quoteMaxToken`）为 20000，它限定了注入模型进行引用的内容总token预算。段
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Qwen 25K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么

这一档模型，如 `qwen3-vl-flash` 和 `qwen3-vl-plus`，具备 25000 的上下文长度（`maxContext`），这意味着单次请求中模型可以处理的总文本量上限。引用上限（`quoteMaxToken`）为 20000，它限定了注入模型进行引用的内容总token预算。段落条数由检索侧的返回数量决定，引用上限与段落条数是两个独立限制。模型支持图片输入（`true`），允许处理包含图像信息的请求。工具调用（`true`）能力则表示模型可以执行预定义的外部函数或操作。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :--- | :--- | :--- |
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 PostgreSQL 数据库的标准格式，确保网络可达。 |
| `ef_construction` | `80` | 控制 HNSW 索引构建时的邻居搜索深度，影响索引质量和构建速度。过低可能导致召回效果差，过高增加构建时间。 |
| `ef_search` | `60` | 控制 HNSW 索引查询时的邻居搜索深度，影响查询速度和召回精度。通常 `ef_search >= ef_construction`。 |
| `m` | `32` | HNSW 索引的每个节点连接的最大邻居数量，影响索引大小和查询性能。`m = 32` 是一个常用且平衡的选择。 |
| `vector_ip_ops` | `l2_distance` | 向量相似度计算方法，`l2_distance` 适用于大多数通用嵌入模型，确保与模型嵌入方式匹配。 |
| `work_mem` | `128MB` | PostgreSQL 排序和哈希操作的内存限制，适当提高可加速索引构建和查询。 |

## 这两者互相约束的地方

这一档模型 25000 的上下文预算，对向量召回策略形成直接约束。召回的段落总token量与每段文本的平均token数共同决定了可以召回的段落数量。引用上限按token计，向量库返回的按条数计，具体哪一项先达到上限取决于每段文本的平均长度。例如，如果每段文本较短，可能会先达到引用上限的token总数。如果每段文本较长，则可能在达到引用上限前，先达到模型上下文长度的限制。PostgreSQL（pgvector）的索引参数，如 `ef_construction` 和 `ef_search`，调大后会提升召回的精度，这对于模型在复杂或模糊查询场景下获取更相关的信息至关重要，有助于模型更好地利用其上下文能力。

## 容易做错的三处

*   召回结果为空，但数据库中有相关数据，原因是 `vector_ip_ops` 与向量嵌入模型不匹配，导致相似度计算错误。
*   查询响应时间过长，甚至超时，日志显示 `HNSW index scan took too long`，原因是 `ef_search` 值设置过大，导致查询时遍历了过多的邻居节点。
*   模型回答与引用内容不符，或引用内容不完整，原因是引用上限 `quoteMaxToken` 已达到，但向量检索返回了更多条目，导致部分条目被截断或忽略。

## 怎么确认配好了

*   执行一次向量搜索，检查 `EXPLAIN ANALYZE` 输出，确认 HNSW 索引被正确使用，并且 `Planning Time` 和 `Execution Time` 在预期范围内。
*   通过 FastGPT 界面发起一个包含图片和文本的对话，观察模型是否正确识别图片内容并进行工具调用，同时检查 FastGPT 后台日志中 `quoteMaxToken` 的实际消耗量。
*   使用不同长度和复杂度的查询语句，观察返回的召回条数和模型的回答质量，对比不同 `ef_search` 值下的召回效果，确定合适的阈值。
*   监控 PostgreSQL 数据库的 CPU 和内存使用率，确保在高并发查询下，资源消耗在可控范围之内，且没有出现 `out of memory` 错误。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
