---
title: Yi 16K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-yi02-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Yi 16K 上下文模型系列中的 `yi-vision-v2`，其 16000 的上下文长度 (`maxContext`) 决定了模型在单次交互中能处理的总文本量，包括用户输入、历史对话以及召回内容。引用上限 (`quoteMaxToken`) 为 12000，这表示用于填充召回内容的 token "
language: zh
axis_model_tier: "Yi / 16000 /  / 12000 / true / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "yi-vision-v2"
check_day: 2026-09-29
meta_title: Yi 16K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Yi 16K 上下文模型系列中的 `yi-vision-v2`，其 16000 的上下文长度 (`maxContext`) 决定了模型在单次交互中能处理的总文本量，包括用户输入、历史对话以及召回内容。引用上限 (`quoteMaxToken`) 为 12000，这表示用于填充召回内容的 token
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Yi 16K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Yi 16K 上下文模型系列中的 `yi-vision-v2`，其 16000 的上下文长度 (`maxContext`) 决定了模型在单次交互中能处理的总文本量，包括用户输入、历史对话以及召回内容。引用上限 (`quoteMaxToken`) 为 12000，这表示用于填充召回内容的 token 预算。它不直接限制召回的段落数量，而是限制所有召回内容的总 token 数。单次最大输出未标注，意味着模型在生成回答时可能没有明确的单次输出长度限制。图片输入为 `true`，表明模型支持多模态输入，能够处理图像信息。工具调用为 `false`，则此模型不直接支持通过工具增强其能力。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问性和权限正确 |
| `m` | `32` | HNSW 图的层数，影响索引构建的速度和查询精度 |
| `ef_construction` | `100–200` | HNSW 索引构建时的邻居搜索参数，影响索引质量和构建时间 |
| `ef_search` | `80–150` | HNSW 查询时的邻居搜索参数，影响查询速度和召回精度 |
| `vector_ip_ops` | `true` | 使用内积距离计算，适用于需要度量向量间相似度的场景 |
| 召回条数 | `前 5–10 条` | 结合 `quoteMaxToken` 和平均段落长度，确保引用内容在预算内 |

## 这两者互相约束的地方
模型 16000 的上下文长度为整个对话设定了上限。当模型配置的引用上限 `quoteMaxToken` 为 12000 时，向量库召回内容的 token 总量应尽可能控制在此预算内。PostgreSQL（pgvector）返回的是固定数量的段落，而这些段落的实际 token 数量是不确定的。因此，召回条数与每段平均长度的乘积不能超过 12000 的引用上限，否则部分召回内容可能无法被模型处理。例如，如果每段平均 500 token，则最多召回 24 段。如果每段平均 1000 token，则只能召回 12 段。向量库的 `ef_search` 参数调高会增加检索的精确度，可能找到更相关的段落，但会增加查询时间。

## 容易做错的三处
*   日志显示 `context window exceeded`：召回内容加上用户输入和历史对话的总 token 数超过了 16000 的上下文长度。
*   召回结果为空或不相关：`ef_search` 参数设置过低，导致向量检索未能找到足够多的近邻。
*   响应时间过长：`ef_construction` 或 `ef_search` 参数设置过高，导致索引构建或查询开销过大。

## 怎么确认配好了
*   运行一次包含少量文本的查询，核对返回的召回内容是否与预期相符。
*   在 FastGPT 界面观察 RAG 链路的日志，确认引用内容的总 token 数是否接近 `quoteMaxToken` 设定的 12000。
*   使用 `EXPLAIN ANALYZE` 命令分析 PostgreSQL（pgvector）的查询计划，检查查询时间是否在可接受范围内。
*   在生产环境中进行负载测试，验证系统在高并发下的稳定性和性能。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
