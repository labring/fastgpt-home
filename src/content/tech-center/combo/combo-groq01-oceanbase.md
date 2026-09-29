---
title: Groq 131K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-groq01-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Groq 平台提供的模型，例如 `openai/gpt-oss-120b` 和 `llama-3.3-70b-versatile`，在 FastGPT 中主要通过其参数画像来体现工程上的约束。131072 的上下文长度决定了一次请求中可以携带的总文本量，包括用户输入、系统指令、历史对话以及知识库召回"
language: zh
axis_model_tier: "Groq / 131072 /  / 120000 / false / true"
axis_vector_db: "OceanBase"
covered_models: "openai/gpt-oss-120b、openai/gpt-oss-20b、qwen/qwen3-32b、llama-3.1-8b-instant、llama-3.3-70b-versatile"
check_day: 2026-09-29
meta_title: Groq 131K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: Groq 平台提供的模型，例如 `openai/gpt-oss-120b` 和 `llama-3.3-70b-versatile`，在 FastGPT 中主要通过其参数画像来体现工程上的约束。131072 的上下文长度决定了一次请求中可以携带的总文本量，包括用户输入、系统指令、历史对话以及知识库召回
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Groq 131K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么

Groq 平台提供的模型，例如 `openai/gpt-oss-120b` 和 `llama-3.3-70b-versatile`，在 FastGPT 中主要通过其参数画像来体现工程上的约束。131072 的上下文长度决定了一次请求中可以携带的总文本量，包括用户输入、系统指令、历史对话以及知识库召回内容。单次最大输出长度虽未明确标注，但决定了模型单轮回复的上限。120000 的引用上限，意味着 FastGPT 在构建知识库引用时，最多可以聚合的 token 数量。工具调用能力的 `true` 表示模型支持通过特定协议与外部工具交互，而图片输入为 `false` 则表明当前模型不具备直接处理图像信息的能力。

## 配 OceanBase 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `OCEANBASE_URL` | `mysql://user:pass@host:port/db` | FastGPT 连接 OceanBase 的标准 MySQL 连接字符串格式。 |
| `ef_construction` | `800` | 建立索引时，控制图的稠密程度，影响索引质量和构建时间。 |
| `m=16` | `16` | HNSW 图的层间连接数，影响召回性能与精度。 |
| `recall_top_k` | `5-8` | 向量召回的条数，与模型引用上限和单段长度共同决定最终引用。 |
| `chunk_size` | `800` | 知识库文档分段的字符长度，需与模型上下文预算协同。 |
| `chunk_overlap` | `100` | 知识库文档分段的重叠字符长度，用于保障语义连贯性。 |

## 这两者互相约束的地方

在 FastGPT 中，Groq 模型的上下文长度与 OceanBase 的向量召回、知识库分段策略紧密相关。模型 131072 的上下文预算是硬性上限。这意味着召回条数 (`recall_top_k`) 乘以每段平均长度 (`chunk_size`)，加上用户输入、系统指令和历史对话的总和，不能超过这个阈值。120000 的引用上限则进一步限制了知识库内容在模型上下文中的占比。当 FastGPT 从 OceanBase 召回多条文档时，会优先处理 `recall_top_k` 设定的条数，再根据引用上限进行截断。如果 OceanBase 的 `ef_construction` 或 `m` 值设置过大，虽然可能提高召回精度，但会显著增加索引构建时间与查询延迟，可能导致模型响应变慢，影响用户体验。

## 容易做错的三处

*   日志显示 `context window exceeded`：知识库召回内容加用户输入超过了模型 131072 的上下文长度。
*   模型回复中知识库引用内容不完整或缺失：`引用上限 120000` 导致召回内容被截断，未能完全纳入模型输入。
*   向量搜索请求超时，返回 `HTTP 504 Gateway Timeout`：OceanBase 的 `ef_construction` 或 `m` 参数设置过高，导致查询计算量过大。

## 怎么确认配好了

*   在 FastGPT 知识库管理界面上传一篇长文档，观察分段后的 `chunk_size` 和 `chunk_overlap` 是否符合预期设置。
*   通过 FastGPT 的调试功能，观察模型请求中 `messages` 字段的总 token 数，确认未超过 131072。
*   在 FastGPT 的知识库测试中，使用包含特定关键词的查询，检查返回的引用内容是否准确且条数与 `recall_top_k` 参数一致。
*   监控 OceanBase 的查询日志，确认向量搜索的平均响应时间在可接受范围内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
