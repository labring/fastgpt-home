---
title: Ernie 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-ernie03-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 128K 上下文模型档位，其 `上下文长度 128000` 表明单次请求中可处理的输入文本总量上限，这直接影响了知识库召回内容的承载能力。`引用上限 119000` 定义了模型在生成回复时，可引用的知识片段总字符数，是 RAG 应用中知识召回条数和单条长度的重要制约。`图片输入 true"
language: zh
axis_model_tier: "Ernie / 128000 /  / 119000 / true / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "ernie-5.0、ernie-5.0-thinking-preview、ernie-5.0-thinking-latest"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Ernie 128K 上下文模型档位，其 `上下文长度 128000` 表明单次请求中可处理的输入文本总量上限，这直接影响了知识库召回内容的承载能力。`引用上限 119000` 定义了模型在生成回复时，可引用的知识片段总字符数，是 RAG 应用中知识召回条数和单条长度的重要制约。`图片输入 true
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Ernie 128K 上下文模型档位，其 `上下文长度 128000` 表明单次请求中可处理的输入文本总量上限，这直接影响了知识库召回内容的承载能力。`引用上限 119000` 定义了模型在生成回复时，可引用的知识片段总字符数，是 RAG 应用中知识召回条数和单条长度的重要制约。`图片输入 true` 意味着该模型具备多模态能力，可处理带有图像信息的请求。`工具调用 true` 则表示模型能够根据指令调用外部工具，扩展其处理复杂任务的能力。单次最大输出未标注，通常需通过实际测试确定其回复长度限制。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 标准 PostgreSQL 连接字符串，确保数据库可访问 |
| `ef_construction` | `64` | 构建 HNSW 索引时，搜索邻居的数量，影响索引构建速度与质量 |
| `ef_search` | `32` | 运行时搜索 HNSW 索引时，搜索邻居的数量，影响查询速度与召回精度 |
| `m = 32` | `32` | HNSW 索引中每个节点的最大邻居数，平衡内存占用和查询性能 |
| `vector_ip_ops` | `true` | 启用向量内积操作，适用于余弦相似度计算 |
| 召回条数 | `前 5–10 条` | 经验值，平衡召回质量与模型上下文长度 |

## 这两者互相约束的地方
Ernie 128K 上下文模型的 `上下文长度 128000` 与 `引用上限 119000` 对 PostgreSQL（pgvector）的召回策略构成直接约束。召回的知识片段数量乘以每个片段的平均长度，总和不能超过模型的引用上限。若召回总字符数超出，模型可能无法完全利用所有召回内容，或导致截断。向量库的返回条数设置，应优先服从模型的 `引用上限`。即使 pgvector 返回了大量相似向量，最终传递给模型的也只能是引用上限内的内容。此外，pgvector 的索引参数如 `ef_search` 调大，虽然有助于提高召回精度，但可能增加查询延迟，进而影响模型生成回复的整体响应时间。

## 容易做错的三处
*   模型返回的回复内容不完整或被截断。原因：知识库召回内容总长度超过了模型的 `引用上限`。
*   知识库检索结果与用户意图偏差较大。原因：`ef_search` 参数设置过低，导致向量检索的召回精度不足。
*   请求模型时出现 `context_length_exceeded` 错误。原因：知识库召回内容加上用户输入，总长度超出了模型的 `上下文长度 128000`。

## 怎么确认配好了
*   核对 FastGPT 后台日志，确保 PostgreSQL（pgvector）连接成功，未出现 `PG_URL` 相关的连接错误。
*   在 FastGPT 知识库测试界面，执行几次不同类型的查询，观察召回的知识片段数量与内容，验证召回质量是否符合预期。
*   通过 FastGPT 的 RAG 调试功能，检查模型实际接收到的上下文内容长度，确保未超出 `引用上限 119000`。
*   在 PostgreSQL 数据库中，通过 `EXPLAIN ANALYZE` 命令分析 pgvector 索引查询的性能，评估 `ef_construction` 和 `ef_search` 参数对查询耗时的影响。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
