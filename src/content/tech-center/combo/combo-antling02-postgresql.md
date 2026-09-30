---
title: AntLing 256K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-antling02-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "AntLing 256K 上下文这一档模型，其 `上下文长度` 达 256000 token，这决定了单次请求中可输入的最大文本量，包括用户查询、历史对话以及召回内容。`引用上限` 为 240000 token，这意味着在生成回复时，模型用于引用的内容总计不能超过此限制。引用内容的总 token 量"
language: zh
axis_model_tier: "AntLing / 256000 /  / 240000 / false / true"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "Ling-3.0-flash、Ling-2.6-1T、Ling-2.6-flash、Ling-3.0-tiny、Ring-2.6-1T"
check_day: 2026-09-29
meta_title: AntLing 256K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: AntLing 256K 上下文这一档模型，其 `上下文长度` 达 256000 token，这决定了单次请求中可输入的最大文本量，包括用户查询、历史对话以及召回内容。`引用上限` 为 240000 token，这意味着在生成回复时，模型用于引用的内容总计不能超过此限制。引用内容的总 token 量
date_published: 2026-09-29
date_modified: 2026-09-29
---

# AntLing 256K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
AntLing 256K 上下文这一档模型，其 `上下文长度` 达 256000 token，这决定了单次请求中可输入的最大文本量，包括用户查询、历史对话以及召回内容。`引用上限` 为 240000 token，这意味着在生成回复时，模型用于引用的内容总计不能超过此限制。引用内容的总 token 量决定了引用部分的整体规模，而向量库返回的段落条数则直接影响引用内容的组成。`单次最大输出` 未标注，通常由具体模型版本决定，影响模型生成回复的长度。`图片输入` 为 `false`，表明此档模型不直接处理图像输入。`工具调用` 为 `true`，表示模型具备调用外部工具的能力，可支持更复杂的任务。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 数据库连接字符串，确保可访问性 |
| `ef_construction` | `64` | 影响 HNSW 索引构建质量和速度，此值在召回效果与构建时间间取得平衡 |
| `ef_search` | `32` | 影响 HNSW 搜索时的召回精度，在搜索性能与召回率间取得平衡 |
| `m` | `32` | HNSW 索引中每个节点的最大连接数，影响索引结构和查询性能 |
| `vector_ip_ops` | `true` | 使用内积（inner product）距离计算，适用于需要评估相似度的场景 |
| 召回条数 | `5-10 条` | 结合模型引用上限与单段平均长度，避免引用内容超限 |

## 这两者互相约束的地方
AntLing 256K 上下文模型与 PostgreSQL (pgvector) 向量库的配合，核心在于如何平衡模型输入限制与向量召回效率。模型的 `上下文长度` 决定了总输入 token 预算，而 `引用上限` 则专门为召回内容划定了预算。向量库根据查询返回若干条文档段落，这些段落的合并长度不能超出模型的 `引用上限`。引用上限是按 token 计数的，而向量库返回的是按条数计，具体谁先触顶取决于每段召回内容的平均 token 长度。如果单段内容较长，即使召回条数不多，也可能迅速达到引用上限；反之，如果段落较短，则可以召回更多条目。此外，PostgreSQL (pgvector) 的索引参数如 `ef_construction` 和 `ef_search` 调大，通常会提高召回精度，但可能增加索引构建时间和查询延迟。对于 AntLing 256K 这样的模型，高精度的召回有助于提供更相关的上下文，但如果延迟过高，则会影响整体响应时间。

## 容易做错的三处
- 日志显示 `Input token limit exceeded`：召回的文档内容总长度加上用户查询及历史对话，超过了模型的 `上下文长度` 限制。
- 界面显示引用内容不完整或缺失：向量库返回的文档条数虽然不多，但单条文档内容过长，导致合并后的引用内容超出了模型的 `引用上限`。
- 检索结果相关性差，模型“幻觉”严重：PostgreSQL (pgvector) 的 `ef_search` 或 `m` 参数设置过低，导致向量检索未能找到最相关的文档。

## 怎么确认配好了
- 运行一组测试查询，观察模型引用的内容是否与召回的文档高度相关，并检查引用内容的总 token 数是否在 `引用上限` 内。
- 检查 FastGPT 平台日志，确认没有出现 `Input token limit exceeded` 或其他与 token 限制相关的错误信息。
- 调整 PostgreSQL (pgvector) 的 `ef_search` 参数，通过多次测试评估查询性能与召回质量的平衡点，确保在可接受的延迟内获得高质量召回。
- 监控 PostgreSQL 数据库的资源使用情况，确保 `ef_construction` 等参数设置不会导致过高的索引构建或查询资源消耗。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
