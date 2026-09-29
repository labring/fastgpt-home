---
title: Ernie 128K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-ernie01-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 这一档模型具备 128000 个 token 的上下文长度，允许在单次对话中处理大量信息。引用上限为 119000 token，这意味着用于引用内容的 token 预算是 119000。引用内容的 token 预算用于限制所有被召回并送入模型作为上下文的文本总量。段落条数由检索侧的配置决"
language: zh
axis_model_tier: "Ernie / 128000 /  / 119000 / false / true"
axis_vector_db: "Milvus"
covered_models: "ernie-5.1"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 Milvus 的配置口径
meta_description: Ernie 这一档模型具备 128000 个 token 的上下文长度，允许在单次对话中处理大量信息。引用上限为 119000 token，这意味着用于引用内容的 token 预算是 119000。引用内容的 token 预算用于限制所有被召回并送入模型作为上下文的文本总量。段落条数由检索侧的配置决
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
Ernie 这一档模型具备 128000 个 token 的上下文长度，允许在单次对话中处理大量信息。引用上限为 119000 token，这意味着用于引用内容的 token 预算是 119000。引用内容的 token 预算用于限制所有被召回并送入模型作为上下文的文本总量。段落条数由检索侧的配置决定，与引用内容的 token 预算是两个不同的量。该模型支持工具调用能力，可以与外部工具进行交互以完成复杂任务。它不具备图片输入能力，无法直接处理图像信息。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :--- | :--- | :--- |
| `MILVUS_ADDRESS` | `milvus-cluster.svc.cluster.local:19530` | Milvus 服务的内部地址与端口，确保 FastGPT 可以访问 |
| `MILVUS_TOKEN` | 按部署 Milvus 时设定的 `root` 用户密码 | 用于认证连接 Milvus，保证数据安全 |
| `HNSW` | `{"M": 16, "efConstruction": 200}` | HNSW 索引参数，平衡搜索性能与索引构建时间 |
| `IP` | `COSINE` | 向量相似度度量方式，适合大多数文本嵌入场景 |
| 召回条数 | `15–20` 条 | 经验值，兼顾召回质量与上下文预算 |
| 单段最大字符数 | `500–800` 字符 | 经验值，避免单段过长或过短，影响模型理解 |

## 这两者互相约束的地方
模型上下文预算是 128000 token，其中引用上限为 119000 token。向量库返回的段落条数与每段文本的长度共同决定了最终送入模型的引用内容总量。引用上限按 token 计，向量库返回的按条数计，具体谁先触顶取决于每段文本的实际 token 长度。当向量库配置的召回条数过多或每段文本过长时，可能超出模型的引用上限，导致部分内容无法被模型处理。Milvus 索引参数 `HNSW` 中的 `efConstruction` 调大后，索引构建时间会增加，但搜索召回的准确性通常会提高。更高的召回准确性意味着模型能从更相关的文档中获取信息，从而提升回答质量。

## 容易做错的三处
*   日志显示 `Milvus connection failed: authorization failed`。原因：`MILVUS_TOKEN` 配置错误或未设置。
*   模型返回的回答内容简短，未充分利用知识库。原因：检索侧召回条数过少或单段字符数过短，未充分利用模型的引用上限。
*   RAG 链路响应时间过长，甚至超时。原因：Milvus 索引参数 `HNSW` 的 `efConstruction` 或 `M` 设置过大，导致向量检索耗时过长。

## 怎么确认配好了
*   在 FastGPT 知识库管理页面，尝试添加并同步一个文档，检查 Milvus 是否成功接收向量数据。
*   进行一次知识库问答，检查 FastGPT 控制台或日志中是否有 Milvus 相关的错误信息。
*   通过多次问答，观察模型返回的引用内容，判断召回条数和每段长度是否符合预期，并根据实际效果调整召回阈值。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
