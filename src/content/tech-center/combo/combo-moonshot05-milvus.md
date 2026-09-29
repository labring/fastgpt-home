---
title: Moonshot 128K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-moonshot05-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Moonshot `moonshot-v1-128k` 模型提供了 128000 tokens 的上下文长度，这意味着单次请求可以处理非常长的输入。引用上限 60000 tokens 规定了知识库召回内容在上下文中可占据的最大比例。模型支持工具调用，使其能够与外部系统进行交互，执行特定任务。不支持图"
language: zh
axis_model_tier: "Moonshot / 128000 /  / 60000 / false / true"
axis_vector_db: "Milvus"
covered_models: "moonshot-v1-128k"
check_day: 2026-09-29
meta_title: Moonshot 128K 上下文 这一档模型配 Milvus 的配置口径
meta_description: Moonshot `moonshot-v1-128k` 模型提供了 128000 tokens 的上下文长度，这意味着单次请求可以处理非常长的输入。引用上限 60000 tokens 规定了知识库召回内容在上下文中可占据的最大比例。模型支持工具调用，使其能够与外部系统进行交互，执行特定任务。不支持图
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 128K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
Moonshot `moonshot-v1-128k` 模型提供了 128000 tokens 的上下文长度，这意味着单次请求可以处理非常长的输入。引用上限 60000 tokens 规定了知识库召回内容在上下文中可占据的最大比例。模型支持工具调用，使其能够与外部系统进行交互，执行特定任务。不支持图片输入则限定了其在多模态应用中的使用场景，需要额外处理图像信息。这些参数共同定义了该模型在 RAG 架构中的工程约束与能力边界。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :----- | :----- |
| `MILVUS_ADDRESS` | `localhost:19530` 或 `your_milvus_cluster_ip:19530` | 指定 Milvus 服务端的网络地址和端口，确保连接性。 |
| `MILVUS_TOKEN` | `your_milvus_api_key` | 用于 Milvus Cloud 或启用认证的 Milvus 实例的访问凭证，保障安全。 |
| `HNSW` `efConstruction` | `64` | HNSW 索引构建参数，影响索引质量和构建时间，适中值平衡性能。 |
| `HNSW` `M` | `16` | HNSW 索引层数参数，影响搜索精度和内存占用。 |
| 召回条数 | `前 5-10 条` | 结合模型引用上限和单段长度，控制召回数量，避免上下文溢出。 |
| 单段长度 | `500-800 字符` | 确保每段内容有足够信息量，同时避免单段过长导致上下文利用率低。 |

## 这两者互相约束的地方
Moonshot `moonshot-v1-128k` 模型的 128000 tokens 上下文长度与 60000 tokens 的引用上限，对 Milvus 的召回策略提出了明确要求。召回条数与每段长度的乘积必须小于模型的引用上限，同时也要在整体上下文长度的预算之内。例如，如果每段长度设定为 500 字符（约 125 tokens），那么最多只能召回 480 段（60000 / 125），实际操作中应留有余量。Milvus 返回的向量条数是召回上限的硬性约束，而引用上限则是模型处理能力的上限，两者取小者生效。当 Milvus 的 `HNSW` 索引参数，如 `efConstruction` 或 `M` 被调大时，通常会提高搜索精度，这对于依赖高质量召回的 `moonshot-v1-128k` 模型而言，意味着更相关的上下文输入，有助于模型生成更准确的回答。

## 容易做错的三处
- 调用模型时提示 `Context window exceeded`，原因是 Milvus 返回的召回内容总长度超过了模型的上下文限制。
- 模型回答内容与知识库关联性差，现象是模型输出信息不够准确，原因可能是 Milvus 索引参数 `M` 或 `efConstruction` 设置过低，导致召回向量的精度不足。
- Milvus 连接超时或认证失败，日志显示 `Error: Connection refused` 或 `Authentication failed`，原因是 `MILVUS_ADDRESS` 或 `MILVUS_TOKEN` 配置错误。

## 怎么确认配好了
- 检查 FastGPT 系统日志，确认 Milvus 连接状态正常，没有出现 `Error: Connection refused` 或 `Authentication failed` 错误码。
- 在 FastGPT 知识库管理界面，上传文档并进行向量化，观察 Milvus 中对应的 Collection 是否有数据写入，并能成功检索。
- 针对某个特定查询，观察模型返回结果中引用的知识段落数量和内容，与 Milvus 实际召回的条数进行比对，确认召回条数与引用上限的匹配度。
- 通过 FastGPT 的调试功能，查看模型实际接收到的上下文内容，确认召回内容的总长度未超出 `moonshot-v1-128k` 模型的 128000 tokens 上下文限制。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
