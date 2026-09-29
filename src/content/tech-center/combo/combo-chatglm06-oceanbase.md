---
title: ChatGLM 128K 上下文 这一档模型配 OceanBase 的配置口径
slug: /zh/combo/combo-chatglm06-oceanbase
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "ChatGLM 128K 上下文模型系列，如 `glm-4.5` 和 `glm-4-air`，其上下文长度高达 128000 token，这决定了单次请求中模型能处理的输入信息总量。引用上限 `quoteMaxToken` 为 120000 token，这意味着在 RAG（检索增强生成）场景下，用于"
language: zh
axis_model_tier: "ChatGLM / 128000 /  / 120000 / false / true"
axis_vector_db: "OceanBase"
covered_models: "glm-4.5、glm-4.5-x、glm-4.5-air、glm-4.5-airx、glm-4.5-flash、glm-4-air、glm-4-flash、glm-4-plus"
check_day: 2026-09-29
meta_title: ChatGLM 128K 上下文 这一档模型配 OceanBase 的配置口径
meta_description: ChatGLM 128K 上下文模型系列，如 `glm-4.5` 和 `glm-4-air`，其上下文长度高达 128000 token，这决定了单次请求中模型能处理的输入信息总量。引用上限 `quoteMaxToken` 为 120000 token，这意味着在 RAG（检索增强生成）场景下，用于
date_published: 2026-09-29
date_modified: 2026-09-29
---

# ChatGLM 128K 上下文 这一档模型配 OceanBase 的配置口径

## 这一档模型的参数意味着什么
ChatGLM 128K 上下文模型系列，如 `glm-4.5` 和 `glm-4-air`，其上下文长度高达 128000 token，这决定了单次请求中模型能处理的输入信息总量。引用上限 `quoteMaxToken` 为 120000 token，这意味着在 RAG（检索增强生成）场景下，用于填充引用内容的 token 总量预算。单次最大输出未标注，通常表示模型会根据上下文和请求生成尽可能完整的回复。图片输入为 `false`，表明这些模型不直接支持图像作为输入。工具调用 `true` 则意味着模型具备调用外部工具的能力，可用于复杂任务编排。

## 配 OceanBase 要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `OCEANBASE_URL` | `ob://user:pass@host:port/database` | OceanBase 数据库连接凭证，确保 FastGPT 能访问 |
| `ef_construction` | `64` | HNSW 索引构建参数，影响索引质量与构建速度，默认值通常为 16 或 32，调高以提高召回准确率 |
| `m=16` | `16` | HNSW 索引层数参数，影响搜索效率与准确率，保持默认或根据数据规模调整 |
| `chunk_size` | `800` 字符 | 单个文本块的字符长度，需与模型引用预算匹配 |
| `chunk_overlap` | `80` 字符 | 文本块之间的重叠部分，有助于保持上下文连贯性 |
| `recall_top_k` | `5` 条 | 检索阶段从 OceanBase 返回的向量条数，不宜过高以避免超出模型输入限制 |

## 这两者互相约束的地方
在 FastGPT 中，模型输入总长度受限于模型的上下文长度（128000 token）。当使用 OceanBase 进行检索时，检索到的内容（即召回条数乘以每段长度）不能超过这个总预算。引用上限 `quoteMaxToken`（120000 token）是专门为引用内容预留的 token 预算。向量库返回的是固定数量的条目，而这些条目转换为 token 后的总和才是实际消耗的引用预算。因此，是“引用内容总 token 数”先触达 120000 的上限，还是“召回条数”先触达 FastGPT 的最大检索条数限制，取决于每个文本块的平均 token 长度。如果索引参数 `ef_construction` 和 `m` 调得较大，通常意味着索引的构建时间会增加，但检索的准确率可能更高，这对于需要高质量召回以充分利用模型上下文能力的场景是有利的。

## 容易做错的三处
*   配置 `OCEANBASE_URL` 后连接失败，提示 `Error: Can't connect to OceanBase`。原因：连接字符串格式错误、端口不通或认证信息不正确。
*   RAG 模式下模型输出内容简短或答非所问，但 FastGPT 界面显示 `quoteTokens` 远低于 120000。原因：`recall_top_k` 设置过小，导致检索到的关联内容不足。
*   模型响应时间过长，甚至超时，日志显示 `Context window exceeded`。原因：`chunk_size` 设置过大或 `recall_top_k` 过多，导致总输入 token 超过了 128000 的上下文长度。

## 怎么确认配好了
*   在 FastGPT 中创建一个知识库，导入一批文档，查看 OceanBase 数据库中是否有对应的向量数据插入，并检查 `vector_dimension` 字段是否与模型嵌入维度匹配。
*   执行一次知识库问答，检查 FastGPT 调试界面中的 `quoteTokens` 字段，确保引用内容消耗的 token 量在 120000 预算之内。
*   调整 `recall_top_k` 参数，观察模型返回的引用内容数量和质量，找到在保证回复质量的前提下，最小化 token 消耗的平衡点。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
