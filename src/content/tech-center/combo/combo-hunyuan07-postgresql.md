---
title: Hunyuan 6K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-hunyuan07-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Hunyuan 6K 上下文模型提供了 6000 token 的上下文长度，这决定了单次请求中可以包含的指令、历史对话和召回内容的总体规模。引用上限为 6000 token，这意味着在生成回复时，模型可引用的召回内容总计不会超过这个预算。段落条数由检索系统返回，与引用上限是两个独立的概念。模型支持图"
language: zh
axis_model_tier: "Hunyuan / 6000 /  / 6000 / true / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "hunyuan-turbo-vision"
check_day: 2026-09-29
meta_title: Hunyuan 6K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Hunyuan 6K 上下文模型提供了 6000 token 的上下文长度，这决定了单次请求中可以包含的指令、历史对话和召回内容的总体规模。引用上限为 6000 token，这意味着在生成回复时，模型可引用的召回内容总计不会超过这个预算。段落条数由检索系统返回，与引用上限是两个独立的概念。模型支持图
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Hunyuan 6K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Hunyuan 6K 上下文模型提供了 6000 token 的上下文长度，这决定了单次请求中可以包含的指令、历史对话和召回内容的总体规模。引用上限为 6000 token，这意味着在生成回复时，模型可引用的召回内容总计不会超过这个预算。段落条数由检索系统返回，与引用上限是两个独立的概念。模型支持图片输入，允许处理多模态信息，但不支持工具调用能力。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `PG_URL` | `postgresql://user:password@host:port/database` | 连接数据库实例的必要凭证，确保 FastGPT 能访问 pgvector |
| `ef_construction` | `64` | 影响 HNSW 索引构建时的图连接数，越大则索引质量越高，检索精确度提升 |
| `ef_search` | `32` | 影响 HNSW 索引查询时的邻居搜索范围，越大则召回率越高，但查询耗时增加 |
| `m` | `16` | HNSW 索引中每个节点的最大连接数，平衡索引大小与查询性能 |
| 文本分段长度 | `500` 字符 | 经验值，确保召回内容在模型上下文和引用上限内能有效利用 |
| 召回条数 `top_k` | `5` | 结合 `hunyuan-turbo-vision` 的引用上限，避免单次召回内容过多溢出 |

## 这两者互相约束的地方
模型上下文长度决定了单次请求中总文本量的上限，包括提示词、历史对话和召回内容。当使用 PostgreSQL（pgvector）进行向量检索时，召回的段落条数乘以每段的平均长度，其总和必须在模型的上下文预算之内。引用上限是模型在生成回复时可以引用的召回内容总计的 token 预算。向量库返回的是按条计数的段落，而引用上限是按 token 计数的。究竟是召回条数过多导致总字数超限，还是单段过长导致引用 token 触顶，取决于实际的分段策略和模型对文本的 token 化方式。索引参数如 `ef_construction` 和 `ef_search` 调大，会提升向量检索的精确度和召回率，这意味着模型能获得更相关的上下文信息，从而可能提高回答质量，但同时也会增加数据库的资源消耗和查询延迟。

## 容易做错的三处
- 日志中出现 `PG::ConnectionBad` 错误：通常是 `PG_URL` 配置不正确，导致 FastGPT 无法连接到 PostgreSQL 数据库。
- 检索结果返回的段落数量不足或过多：这可能是 `top_k` 参数与实际数据分布不匹配，或者向量索引 `ef_search` 值设置不当，影响了检索召回率。
- 模型回复内容与召回信息关联度低：可能原因是文本分段过长，导致单段信息密度稀释，或者 `ef_construction` 设置过低，向量索引质量不佳。

## 怎么确认配好了
- 运行 FastGPT 内部的连接测试工具，检查 `PG_URL` 是否能成功连接到 PostgreSQL 数据库。
- 在 FastGPT 的管理界面，针对某一知识库执行一次测试检索，观察返回的召回条数和内容是否符合预期。
- 对比不同 `ef_search` 参数下的检索结果，通过人工评估或自动化指标，确定在可接受的查询延迟下，召回质量达到目标阈值。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
