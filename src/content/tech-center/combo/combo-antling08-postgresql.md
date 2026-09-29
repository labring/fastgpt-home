---
title: AntLing 64K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-antling08-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "AntLing 的 64K 上下文模型，其 `maxContext` 达 64000 token，这决定了一次交互中能处理的总信息量。引用上限 `quoteMaxToken` 设定了引用内容所能占据的 token 预算，这限制了模型在生成回复时可以参考的外部信息总量。模型对图片输入的 `true` "
language: zh
axis_model_tier: "AntLing / 64000 /  / 60000 / true / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "Ming-lite-omni"
check_day: 2026-09-29
meta_title: AntLing 64K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: AntLing 的 64K 上下文模型，其 `maxContext` 达 64000 token，这决定了一次交互中能处理的总信息量。引用上限 `quoteMaxToken` 设定了引用内容所能占据的 token 预算，这限制了模型在生成回复时可以参考的外部信息总量。模型对图片输入的 `true`
date_published: 2026-09-29
date_modified: 2026-09-29
---

# AntLing 64K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
AntLing 的 64K 上下文模型，其 `maxContext` 达 64000 token，这决定了一次交互中能处理的总信息量。引用上限 `quoteMaxToken` 设定了引用内容所能占据的 token 预算，这限制了模型在生成回复时可以参考的外部信息总量。模型对图片输入的 `true` 标识意味着其支持多模态输入，能够处理图像信息。工具调用为 `false` 则表明此模型不直接支持通过工具扩展能力。引用内容合计的 token 预算由 `quoteMaxToken` 控制。检索侧返回的段落条数是另一个独立的量。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :----- | :----- |
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接的通用标准，确保服务能正确连接到 pgvector 实例。 |
| `ef_construction` | `80` | 控制 HNSW 索引构建时的图拓扑，较高的值能提升召回质量，但会增加索引构建时间。 |
| `ef_search` | `60` | 控制 HNSW 索引查询时的邻居搜索范围，较高的值能提升召回质量，但会增加查询延迟。 |
| `m` | `32` | HNSW 索引中每个节点的最大连接数，影响索引的稠密程度和查询效率。 |
| `vector_ip_ops` | 启用 | 优化内积运算，提升向量相似度计算效率。 |
| 召回条数 | `10` | 经验值，平衡召回范围与模型处理效率，具体值按实测标定。 |

## 这两者互相约束的地方
模型上下文预算是 64000 token，这意味着所有输入内容（包括指令、历史对话、召回内容）的总和不能超过这个上限。引用上限 `quoteMaxToken` 限制了检索到的信息在总预算中的占比。向量库返回的段落数量和每段的平均长度，共同决定了召回内容的总 token 数。当每段内容较短时，可以在 `quoteMaxToken` 预算内检索更多条目；当每段内容较长时，即使条目数不多，也可能迅速触及 `quoteMaxToken`。索引参数 `ef_construction` 和 `ef_search` 设置得越高，召回质量通常越好，模型能获取到更相关的上下文，但也会增加向量检索的计算开销。模型的引用上限按 token 计。向量库返回的按条数计。谁先触顶取决于检索段落的平均长度。

## 容易做错的三处
*   日志显示 `PG_URL connection failed`：数据库连接字符串配置有误，或网络不通。
*   检索结果为空或不相关：`ef_search` 或 `ef_construction` 参数设置过低，导致 HNSW 索引召回质量差。
*   响应时间过长或超时：向量数据量大，且 `ef_search` 设置过高，导致查询耗时。

## 怎么确认配好了
*   检查 FastGPT 后台日志，确认 `PG_URL` 连接成功且无异常报错。
*   执行一次测试检索，观察召回的段落是否与查询语义高度相关，并记录召回条数。
*   通过 FastGPT 的调试界面，观察每次对话中引用内容的 token 数量，确保其未超出 `quoteMaxToken` 限制。
*   监控 PostgreSQL 数据库的 CPU 和内存使用率，确保在高并发查询下系统资源稳定。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
