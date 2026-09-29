---
title: ChatGLM 16K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-chatglm10-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`glm-4v-plus` 模型的上下文长度为 16000 token，这意味着单次请求中模型能处理的输入总长度上限。引用上限 12000 token，这是模型用于整合引用内容的预算，它限定了引用内容的总量。图片输入为 true，表示模型支持多模态输入，能够处理图像信息。工具调用为 false，说明"
language: zh
axis_model_tier: "ChatGLM / 16000 /  / 12000 / true / false"
axis_vector_db: "Milvus"
covered_models: "glm-4v-plus"
check_day: 2026-09-29
meta_title: ChatGLM 16K 上下文 这一档模型配 Milvus 的配置口径
meta_description: `glm-4v-plus` 模型的上下文长度为 16000 token，这意味着单次请求中模型能处理的输入总长度上限。引用上限 12000 token，这是模型用于整合引用内容的预算，它限定了引用内容的总量。图片输入为 true，表示模型支持多模态输入，能够处理图像信息。工具调用为 false，说明
date_published: 2026-09-29
date_modified: 2026-09-29
---

# ChatGLM 16K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
`glm-4v-plus` 模型的上下文长度为 16000 token，这意味着单次请求中模型能处理的输入总长度上限。引用上限 12000 token，这是模型用于整合引用内容的预算，它限定了引用内容的总量。图片输入为 true，表示模型支持多模态输入，能够处理图像信息。工具调用为 false，说明此模型版本不直接支持通过函数调用与外部工具交互。单次最大输出未标注，通常需要通过实际测试或查阅最新文档确定。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `127.0.0.1:19530` | Milvus 服务默认监听端口，确保 FastGPT 能够连接。 |
| `MILVUS_TOKEN` | `fastgpt_secret_token` | 用于 Milvus 认证，确保访问安全，根据实际部署的 Milvus 配置。 |
| `index_type` | `HNSW` | HNSW 索引类型在召回性能和精度之间有良好平衡，适合通用 RAG 场景。 |
| `metric_type` | `IP` | 内积（IP）相似度度量，适用于归一化后的向量，且与许多 embedding 模型兼容。 |
| `search_k` | `32` | 搜索时在 HNSW 图中探索的邻居数量，影响召回质量，可根据实际效果调整。 |
| `ef` | `128` | HNSW 索引构建时的参数，影响索引的精度和构建速度。 |

## 这两者互相约束的地方
向量库返回的段落数量与每段长度之和，必须在模型 16000 token 的上下文长度限制之内。引用上限 12000 token 是对引用内容总量的硬性约束，向量库返回的段落总 token 数不能超出此限制。当向量库返回的每段内容较长时，引用上限会限制返回的段落条数。当每段内容较短时，引用上限允许返回更多段落。索引参数如 `search_k` 和 `ef` 调大，意味着向量检索的精度和召回质量可能提升，这会为模型提供更相关的上下文，但同时也会增加向量检索的计算开销。

## 容易做错的三处
*   日志显示 `Milvus connection failed: [Errno 111] Connection refused`。原因：`MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
*   模型输出内容与引用内容关联性差，甚至出现引用内容未被完全利用的情况。原因：检索到的单段文本过长，导致引用内容的总 token 数很快触及 12000 token 的上限，从而减少了可被引用的段落数量。
*   RAG 响应时间过长，出现 `Gateway Timeout` 错误。原因：`search_k` 或 `ef` 等索引参数设置过大，导致 Milvus 检索耗时过长。

## 怎么确认配好了
*   在 FastGPT 界面配置 Milvus 后，检查系统日志，确认没有 `Milvus connection error` 字样。
*   通过 FastGPT 的测试功能，输入一个较长的问题，观察模型响应中引用内容的长度和相关性，确保引用内容的总 token 数在 12000 左右。
*   在 Milvus 客户端执行 `SHOW COLLECTIONS` 命令，确认 FastGPT 创建了对应的向量集合。
*   在 FastGPT 的知识库管理页面，尝试上传文档并进行分段，确认数据能正常写入 Milvus，并能在日志中看到 `insert entities success` 的提示。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
