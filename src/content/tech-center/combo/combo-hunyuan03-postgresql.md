---
title: Hunyuan 28K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
slug: /zh/combo/combo-hunyuan03-postgresql
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Hunyuan 28K 上下文模型系列，如 `hunyuan-large` 和 `hunyuan-turbo`，具备 28000 token 的上下文长度。这决定了模型在单次交互中能够处理的输入信息总量，包括用户提问、历史对话和召回内容。引用上限为 20000 token，意味着模型在生成回答时，用"
language: zh
axis_model_tier: "Hunyuan / 28000 /  / 20000 / false / false"
axis_vector_db: "PostgreSQL（pgvector）"
covered_models: "hunyuan-large、hunyuan-turbo"
check_day: 2026-09-29
meta_title: Hunyuan 28K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径
meta_description: Hunyuan 28K 上下文模型系列，如 `hunyuan-large` 和 `hunyuan-turbo`，具备 28000 token 的上下文长度。这决定了模型在单次交互中能够处理的输入信息总量，包括用户提问、历史对话和召回内容。引用上限为 20000 token，意味着模型在生成回答时，用
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Hunyuan 28K 上下文 这一档模型配 PostgreSQL（pgvector） 的配置口径

## 这一档模型的参数意味着什么
Hunyuan 28K 上下文模型系列，如 `hunyuan-large` 和 `hunyuan-turbo`，具备 28000 token 的上下文长度。这决定了模型在单次交互中能够处理的输入信息总量，包括用户提问、历史对话和召回内容。引用上限为 20000 token，意味着模型在生成回答时，用于支撑引用的召回内容总和不应超过此阈值。工具调用和图片输入功能未启用，表明在当前的 FastGPT 配置中，此模型主要处理纯文本输入与输出，不直接支持功能调用或多模态数据处理。

## 配 PostgreSQL（pgvector） 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :---------- | :---------- | :---------- |
| `PG_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接数据库的标准形式 |
| `m = 32` | `32` | 向量索引的维度参数，影响索引大小和检索质量 |
| `ef_construction` | `100–200` | HNSW 索引构建参数，影响构建速度和索引质量，越大越好但耗时 |
| `ef_search` | `60–120` | HNSW 检索参数，影响查询速度和召回率，越大越好但耗时 |
| `vector_ip_ops` | `true` | 使用 IP 距离（内积）进行向量相似度计算 |

## 这两者互相约束的地方
Hunyuan 28K 上下文模型与 PostgreSQL（pgvector）的配合，核心在于如何平衡模型的上下文预算与向量库的召回策略。模型具有 28000 token 的上下文长度，而用于引用的内容预算为 20000 token。向量库返回的是固定数量的文本段落，每段文本有其自身的 token 长度。当向量库返回的段落总数乘以每段平均 token 长度超过 20000 token 的引用上限时，会触发截断。如果单段文本较短，则可以召回更多条；如果单段文本较长，则能召回的条数会减少。此外，PostgreSQL（pgvector）的索引参数 `ef_construction` 和 `ef_search` 调大，可以提高向量检索的准确性和召回率，意味着能够向模型提供更相关的高质量信息，从而在模型的引用预算内，有效提升生成答案的质量。

## 容易做错的三处
- 现象：FastGPT 日志显示数据库连接失败，状态码 `500`。原因：`PG_URL` 配置字符串格式错误或数据库凭据不正确。
- 现象：模型回答内容关联性差，但 FastGPT 检索结果条数正常。原因：`ef_search` 参数设置过低，导致向量检索未能找到最相关的结果。
- 现象：FastGPT 在处理长文本查询时响应时间过长。原因：`ef_construction` 和 `ef_search` 参数设置过高，导致索引构建或查询计算量过大。

## 怎么确认配好了
- 检查 FastGPT 运行日志，确保没有 PostgreSQL 连接相关的错误信息。
- 在 FastGPT 平台进行一次 RAG 查询测试，观察召回内容的数量和质量，并与模型回答的关联度进行评估。
- 监控 PostgreSQL 数据库的查询性能指标，确保向量检索的平均响应时间在可接受范围内。
- 逐步调整 `ef_search` 参数，通过多次测试来确定在召回效果和查询速度之间取得平衡的阈值。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
