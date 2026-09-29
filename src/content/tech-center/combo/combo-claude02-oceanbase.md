---
title: Claude 200K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-claude02-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Claude 这一档模型，其 200000 token 的上下文长度（`maxContext`）提供了巨大的输入窗口，允许用户提交大量背景信息或多轮对话历史。单次最大输出虽未明确标注，但可预期能支持生成长篇内容。引用上限（`quoteMaxToken`）为 100000 token，这笔预算专用于 "
language: zh
axis_model_tier: "Claude / 200000 /  / 100000 / true / true"
axis_vector_db: "OceanBase"
covered_models: "claude-haiku-4-5、claude-haiku-4-5-20251001、claude-opus-4-5-20251101、claude-opus-4-1-20250805"
check_day: 2026-09-29
meta_title: Claude 200K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: Claude 这一档模型，其 200000 token 的上下文长度（`maxContext`）提供了巨大的输入窗口，允许用户提交大量背景信息或多轮对话历史。单次最大输出虽未明确标注，但可预期能支持生成长篇内容。引用上限（`quoteMaxToken`）为 100000 token，这笔预算专用于
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Claude 200K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
Claude 这一档模型，其 200000 token 的上下文长度（`maxContext`）提供了巨大的输入窗口，允许用户提交大量背景信息或多轮对话历史。单次最大输出虽未明确标注，但可预期能支持生成长篇内容。引用上限（`quoteMaxToken`）为 100000 token，这笔预算专用于 RAG 召回的外部知识。引用内容的 token 预算限制了可被模型参考的外部信息总量。向量库返回的段落条数由检索逻辑决定，与引用上限是不同的度量。此外，支持图片输入和工具调用能力，意味着可以构建多模态和更复杂的自动化工作流。

## 配 OceanBase 要定哪些

| 配置项             | 建议取法       | 这样取的依据                               |
| :----------------- | :------------- | :----------------------------------------- |
| `OCEANBASE_URL`    | `jdbc:mysql://<host>:<port>/<db>?user=<user>&password=<pass>` | FastGPT 通过 JDBC 连接 OceanBase。 |
| `ef_construction`  | `100`          | 影响 HNSW 索引构建质量与速度，此值兼顾性能。 |
| `m`                | `16`           | HNSW 索引的邻居数量，平衡召回精度与存储开销。 |
| `embedding_dim`    | `1536`         | 需与模型输出的 embedding 维度保持一致。    |
| `max_return_docs`  | `5`            | 检索时返回的文档数量，配合引用上限调整。   |
| `segment_length`   | `800-1200 字符` | 单个文本段落的预期长度，影响引用效率。     |

## 这两者互相约束的地方
模型 200000 token 的上下文预算是总和限制，召回的条数乘以每段的平均长度，其总 token 数不能超出此限制。引用上限 100000 token 专门用于外部知识的预算。向量库返回的段落按条数计，而引用上限按 token 计，最终谁先触达限制取决于每段文本的实际 token 长度。如果每段文本较短，则可以引用更多条，反之亦然。OceanBase 的索引参数，如 `ef_construction` 和 `m=16`，调大后能提升召回精度，这意味着模型可以获得更相关的信息，但可能增加索引构建和查询延迟。因此，需要根据实际业务需求和对延迟的容忍度进行权衡。SEEKDB 作为 OceanBase 的兼容实现，其配置口径与此处描述保持一致。

## 容易做错的三处
*   错误信息显示 `SQLSTATE: 08001`：连接 OceanBase 的 `OCEANBASE_URL` 配置有误，导致数据库连接失败。
*   检索结果为空，但知识库中明明有数据：`embedding_dim` 配置与实际模型输出维度不符，导致向量检索匹配失败。
*   模型回答缺乏外部知识支持，但日志显示已召回多条：召回的条目总 token 数超过了模型 `quoteMaxToken` 限制，导致部分内容被截断。

## 怎么确认配好了
*   执行一次简单的知识库检索，检查 OceanBase 查询日志，确认 `SELECT` 语句中的 `ef_construction` 和 `m` 参数是否按预期生效。
*   上传一段包含图片和文本的文档，观察模型是否能正确处理图片输入，并通过工具调用链路进行处理。
*   在 FastGPT 界面创建一个知识库，导入多段文本，然后发起一次对话，观察最终模型引用的外部知识 token 数是否在 `quoteMaxToken` 预算内，并通过调整 `max_return_docs` 参数，验证对引用内容条数的影响。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
