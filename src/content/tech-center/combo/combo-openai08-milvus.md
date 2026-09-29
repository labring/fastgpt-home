---
title: OpenAI 131K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-openai08-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "这一档模型，如 `gpt-oss-120b` 和 `gpt-oss-20b`，其 131000 的上下文长度 (`maxContext`) 决定了单次请求中模型可以处理的输入信息总量，包括用户指令、系统提示以及检索到的引用内容。这意味着在构建 RAG 流程时，需要合理控制所有输入内容的 token "
language: zh
axis_model_tier: "OpenAI / 131000 /  / 100000 / false / true"
axis_vector_db: "Milvus"
covered_models: "gpt-oss-120b、gpt-oss-20b"
check_day: 2026-09-29
meta_title: OpenAI 131K 上下文 这一档模型配 Milvus 的配置口径
meta_description: 这一档模型，如 `gpt-oss-120b` 和 `gpt-oss-20b`，其 131000 的上下文长度 (`maxContext`) 决定了单次请求中模型可以处理的输入信息总量，包括用户指令、系统提示以及检索到的引用内容。这意味着在构建 RAG 流程时，需要合理控制所有输入内容的 token
date_published: 2026-09-29
date_modified: 2026-09-29
---

# OpenAI 131K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么

这一档模型，如 `gpt-oss-120b` 和 `gpt-oss-20b`，其 131000 的上下文长度 (`maxContext`) 决定了单次请求中模型可以处理的输入信息总量，包括用户指令、系统提示以及检索到的引用内容。这意味着在构建 RAG 流程时，需要合理控制所有输入内容的 token 数量，以避免超出模型上限。引用上限 (`quoteMaxToken`) 为 100000 token，这是专门分配给检索结果的 token 预算。它不直接限制检索条数，而是限制所有被引用的文本段落合并后的总 token 数。检索系统需要根据这个预算来决定最终返回给模型的引用内容。模型支持工具调用 (`tool_calling: true`)，允许 FastGPT 利用外部函数来扩展模型能力，例如执行数据库查询或 API 调用。但不支持图片输入 (`image_input: false`)，表示不能直接处理视觉信息。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `MILVUS_ADDRESS` | `your_milvus_host:19530` | 指定 Milvus 服务的网络地址和端口，确保 FastGPT 可以连接。 |
| `MILVUS_TOKEN` | `your_api_key` | Milvus 访问凭证，用于身份验证，保障数据安全。 |
| `index_type` | `HNSW` | HNSW 在高维向量检索中表现出良好的查询性能和召回率。 |
| `metric_type` | `IP` | 内积相似度适用于许多文本嵌入模型，与 OpenAI 模型的嵌入特性匹配。 |
| `nlist` | `128` | 索引构建参数，影响查询速度和索引大小，需根据数据集规模和查询延迟要求调整。 |
| `nprobe` | `32` | 查询参数，影响查询的召回率和速度，数值越大召回率越高但查询时间越长。 |

## 这两者互相约束的地方

这一档模型 131000 的上下文长度与 Milvus 的检索结果之间存在直接约束。当 Milvus 返回多条文本段落时，这些段落的合并长度（token 数）必须在模型的总上下文预算之内。更具体地，引用上限 `quoteMaxToken` 为 100000 token，这意味着即使 Milvus 检索到大量相关段落，最终传递给模型的引用内容总 token 数也不能超过此限制。Milvus 返回的是条数，而引用上限是 token 预算，两者并非直接等同。最终引用的段落数量取决于每段文本的平均 token 长度以及 `quoteMaxToken` 的预算。如果单段文本较长，则能引用的条数会减少；如果单段文本较短，则能引用的条数会增加。此外，Milvus 的索引参数如 `nlist` 或 `nprobe` 调大，会提升检索的召回率，意味着可能返回更多或更相关的段落。这在 FastGPT 中可能导致需要更精细的后处理逻辑来筛选和截断，以确保最终引用的内容不超过模型的 `quoteMaxToken`。

## 容易做错的三处

*   FastGPT 界面显示“上下文长度超出限制”：原因是没有正确估算检索内容的 token 数，导致检索结果与用户指令合并后超过模型 `maxContext`。
*   部分引用内容未被模型处理：原因是在 Milvus 中检索到的段落总 token 数超过了 `quoteMaxToken`，FastGPT 进行了截断。
*   返回答案与预期相关性不足：原因在于 Milvus 的 `nprobe` 参数设置过低，导致召回率下降，未能检索到最相关的少数段落。

## 怎么确认配好了

*   在 FastGPT 中上传文档并创建知识库，观察 Milvus 日志中是否有向量写入操作，确认向量数据成功导入。
*   进行一次带知识库的对话，检查 FastGPT 的调试面板，确认检索到的引用内容条数与预期的 `quoteMaxToken` 预算相符。
*   在 FastGPT 中调整知识库的“最大引用内容 token 限制”参数，观察模型回答长度和引用内容截断情况，以确定 `quoteMaxToken` 的实际效果。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
