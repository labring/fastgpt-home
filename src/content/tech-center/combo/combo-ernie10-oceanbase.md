---
title: Ernie 128K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-ernie10-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`ERNIE-Speed-128K` 模型提供 128000 的上下文长度，这意味着在单次对话中模型可以处理的输入文本量上限。引用上限为 120000，表示知识库召回内容在输入模型时，其总长度不应超过此值。单次最大输出未标注，通常需要通过实验确定其有效范围。图片输入为 `false`，表明模型不具备"
language: zh
axis_model_tier: "Ernie / 128000 /  / 120000 / false / false"
axis_vector_db: "OceanBase"
covered_models: "ERNIE-Speed-128K"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: `ERNIE-Speed-128K` 模型提供 128000 的上下文长度，这意味着在单次对话中模型可以处理的输入文本量上限。引用上限为 120000，表示知识库召回内容在输入模型时，其总长度不应超过此值。单次最大输出未标注，通常需要通过实验确定其有效范围。图片输入为 `false`，表明模型不具备
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
`ERNIE-Speed-128K` 模型提供 128000 的上下文长度，这意味着在单次对话中模型可以处理的输入文本量上限。引用上限为 120000，表示知识库召回内容在输入模型时，其总长度不应超过此值。单次最大输出未标注，通常需要通过实验确定其有效范围。图片输入为 `false`，表明模型不具备处理图像信息的能力。工具调用为 `false`，意味着此模型无法直接执行外部工具函数，需要外部逻辑层进行编排。

## 配 OceanBase 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `OCEANBASE_URL` | `ob_user:ob_password@tcp(ob_host:ob_port)/ob_database` | 采用标准的 MySQL 协议连接字符串格式，确保控制器能正确连接 OceanBase 实例。SEEKDB 兼容此格式。 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量和构建速度。对于 128K 上下文模型，适当增加此值可以提升召回精度。 |
| `m` | `16` | HNSW 索引图的邻居数量，影响查询效率和内存占用。保持默认或略微调整，以平衡查询速度与召回质量。 |
| `recall_top_k` | `5` | 向量库单次查询返回的向量数量。结合模型引用上限，避免过多的冗余召回。 |
| `chunk_size` | `800-1200 字符` | 知识库分段的建议长度。根据模型上下文长度，确保单段内容具有足够的语义完整性，且多段召回后不会超限。 |

## 这两者互相约束的地方
`ERNIE-Speed-128K` 的 128000 上下文长度与 120000 的引用上限，对 OceanBase 的召回策略构成直接约束。知识库召回条数与每段召回内容的长度之积，必须严格控制在 120000 字符以内，以避免超出模型的引用上限。如果 OceanBase 返回的向量条数乘以每段文本的平均长度超出此限制，模型将无法完全处理所有召回内容。当 OceanBase 的索引参数 `ef_construction` 或 `m` 调大时，通常会提高召回的准确性，但同时可能增加索引构建时间与存储开销。对于 128K 上下文的模型，提高召回精度有助于充分利用其处理长文本的能力，但需注意在查询时避免因召回内容过长而裁剪输入。

## 容易做错的三处
* 连接 OceanBase 时，日志显示 `ERROR 1045 (28000): Access denied for user`。这通常是 `OCEANBASE_URL` 中的用户名或密码不正确。
* 向量查询返回结果为空列表，即使知识库中有相关内容。这可能是 OceanBase 实例未正确启动或 `ob_database` 指定的数据库不存在。
* 模型输出的回答缺乏相关性，即使召回条数足够。这可能是 `ef_construction` 或 `m` 参数设置过低，导致向量索引质量不佳，未能召回最相关的段落。

## 怎么确认配好了
* 观察控制器日志，确认 OceanBase 连接成功且无异常报错信息。
* 执行一次带有明确语义的知识库查询，检查 OceanBase 返回的向量条数和内容是否符合预期，以及 `recall_top_k` 是否生效。
* 部署一个简单的 RAG 应用，输入一个与知识库内容高度相关的问题，观察模型返回的回答是否充分利用了召回内容，并与知识库原文进行比对，评估其相关性。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
