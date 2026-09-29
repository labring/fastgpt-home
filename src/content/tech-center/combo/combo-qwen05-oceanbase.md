---
title: Qwen 128K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-qwen05-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Qwen 128K 模型的 `maxContext` 为 128000 token，这决定了单次请求中可输入的最大文本量。引用上限 `quoteMaxToken` 为 120000 token，这是 FastGPT 在构造模型输入时，为知识库召回内容预留的 token 预算。此预算限制了所有引用内容"
language: zh
axis_model_tier: "Qwen / 128000 /  / 120000 / false / true"
axis_vector_db: "OceanBase"
covered_models: "qwen-max"
check_day: 2026-09-29
meta_title: Qwen 128K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: Qwen 128K 模型的 `maxContext` 为 128000 token，这决定了单次请求中可输入的最大文本量。引用上限 `quoteMaxToken` 为 120000 token，这是 FastGPT 在构造模型输入时，为知识库召回内容预留的 token 预算。此预算限制了所有引用内容
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Qwen 128K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
Qwen 128K 模型的 `maxContext` 为 128000 token，这决定了单次请求中可输入的最大文本量。引用上限 `quoteMaxToken` 为 120000 token，这是 FastGPT 在构造模型输入时，为知识库召回内容预留的 token 预算。此预算限制了所有引用内容合并后的总 token 数。工具调用能力 `tool_calling` 为 true，支持模型通过工具函数扩展能力。图片输入 `image_input` 为 false，表示模型不具备直接处理图像信息的能力。

## 配 OceanBase 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `OCEANBASE_URL` | `ob://user:pass@host:port/database` | 连接 OceanBase 实例，确保数据库可访问 |
| `ef_construction` | `128` | 影响 HNSW 索引构建质量和查询召回率 |
| `m` | `16` | 影响 HNSW 索引的图结构，平衡内存占用与查询性能 |
| `chunk_size` | `500–800 字符` | 平衡单段文本信息密度与模型上下文处理效率 |
| `recall_top_k` | `前 5–10 条` | 避免不相关内容过多占用模型上下文，提高召回精准度 |

## 这两者互相约束的地方
模型上下文长度 `maxContext` 限制了总输入 token 数，其中包括了用户提问、系统指令和知识库召回内容。引用上限 `quoteMaxToken` 则明确了知识库召回内容所能占用的最大 token 预算。向量库在检索时返回的是按条数计的段落，而模型处理时是按 token 计。当 `chunk_size` 较小时，可能会返回较多条数才达到 `quoteMaxToken`；当 `chunk_size` 较大时，少数几条就可能触及 `quoteMaxToken`。索引参数 `ef_construction` 和 `m` 调大，通常能提升召回内容的质量和相关性，这对于模型理解和生成高质量回答至关重要。高质量的召回内容能够更有效地利用 `quoteMaxToken` 预算，从而提升模型的整体表现。

## 容易做错的三处
* 错误日志显示 `context_length_exceeded`：原因是向量库召回内容与用户提问总和超出模型 `maxContext`。
* 知识库返回结果为空：原因是 `OCEANBASE_URL` 配置有误，导致 FastGPT 无法连接到 OceanBase 实例。
* 模型回答内容与知识库关联性差：原因是 `ef_construction` 或 `m` 参数设置过低，导致向量索引质量不佳，召回不相关内容。

## 怎么确认配好了
* 检查 FastGPT 系统日志，确认连接 OceanBase 成功，没有 `Connection refused` 或 `Authentication failed` 等错误信息。
* 在 FastGPT 知识库管理界面，上传文档并查看分段结果，确认 `chunk_size` 符合预期，且分段内容语义完整。
* 通过 FastGPT 的调试模式，观察模型输入中的 `quote` 字段，确认召回条数和引用内容 token 数在 `quoteMaxToken` 预算内。
* 进行多次问答测试，观察模型回答是否准确引用了知识库内容，并评估回答质量。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
