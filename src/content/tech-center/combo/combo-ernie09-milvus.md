---
title: Ernie 8K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-ernie09-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`ERNIE-Lite-8K` 模型提供 8000 tokens 的上下文长度，这意味着单次请求可以处理的总输入文本量（包括指令、知识库召回内容、历史对话等）受到严格限制。引用上限 6000 tokens 明确了知识库召回内容在整个上下文中的最大占比，这直接影响了 RAG 链路中召回段落的总长度。模"
language: zh
axis_model_tier: "Ernie / 8000 /  / 6000 / false / false"
axis_vector_db: "Milvus"
covered_models: "ERNIE-Lite-8K"
check_day: 2026-09-29
meta_title: Ernie 8K 上下文 这一档模型配 Milvus 的配置口径
meta_description: `ERNIE-Lite-8K` 模型提供 8000 tokens 的上下文长度，这意味着单次请求可以处理的总输入文本量（包括指令、知识库召回内容、历史对话等）受到严格限制。引用上限 6000 tokens 明确了知识库召回内容在整个上下文中的最大占比，这直接影响了 RAG 链路中召回段落的总长度。模
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 8K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
`ERNIE-Lite-8K` 模型提供 8000 tokens 的上下文长度，这意味着单次请求可以处理的总输入文本量（包括指令、知识库召回内容、历史对话等）受到严格限制。引用上限 6000 tokens 明确了知识库召回内容在整个上下文中的最大占比，这直接影响了 RAG 链路中召回段落的总长度。模型未标注单次最大输出，但通常会与上下文长度存在一定比例关系，影响回答的详细程度。缺乏图片输入与工具调用能力，则意味着该模型不适用于多模态处理或需要外部 API 交互的 Agent 场景，技术方案需纯粹围绕文本理解与生成构建。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `localhost:19530` 或 `milvus-service.default.svc.cluster.local:19530` | 指向 Milvus 服务端点，确保连接可达性。 |
| `MILVUS_TOKEN` | 按实测标定 | 根据 Milvus 认证配置，用于访问控制，保障数据安全。 |
| `index_type` | `HNSW` | `HNSW` 提供优良的召回性能与查询速度，适用于大规模向量检索。 |
| `metric_type` | `IP` | `IP` (内积) 是衡量文本相似度的常用指标，与大多数嵌入模型兼容。 |
| `top_k` | `5` | 结合模型引用上限与召回段落长度，`top_k=5` 可在保证召回质量的同时，有效控制上下文占用。 |
| `ef` | `64` | `ef` 参数影响 `HNSW` 索引的搜索精度，`64` 为精度与性能的折衷。 |

## 这两者互相约束的地方
`ERNIE-Lite-8K` 的 8000 tokens 上下文长度是核心约束。知识库召回的条数乘以每条召回内容的平均长度，必须严格控制在 6000 tokens 的引用上限之内，且不能使总输入超过 8000 tokens。这意味着即使 Milvus 返回了大量 `top_k` 结果，也需要根据模型的引用上限进行截断或精选。Milvus 的 `top_k` 参数在向量检索阶段生效，决定了返回给 FastGPT 的向量数量；而模型的引用上限则在 FastGPT 内部处理，决定了最终送入模型的知识内容。通常，`top_k` 应略大于或等于 FastGPT 实际送入模型的引用条数，以提供更多选择空间。索引参数如 `HNSW` 的 `ef` 值调大，会提高召回精度，但可能增加查询延迟，这在处理实时对话时需要权衡，避免因查询耗时过长导致模型等待。

## 容易做错的三处
*   日志显示 "Milvus connection failed: [Errno 111] Connection refused"：`MILVUS_ADDRESS` 配置错误或 Milvus 服务未运行。
*   模型返回的回答明显缺乏知识库信息，但 FastGPT 界面显示已召回多条数据：召回的知识段落总长度超过了模型 6000 tokens 的引用上限，导致部分内容被截断。
*   Milvus 查询耗时过长，导致模型响应延迟：`HNSW` 索引参数 `ef` 设置过高，或 Milvus 实例资源不足。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，上传文档并进行分段，确认分段策略是否合理，每段长度是否符合预期。
*   执行一次带知识库的对话测试，在 FastGPT 的调试面板中查看 Milvus 返回的 `top_k` 条召回内容，并确认其内容与数量是否符合 `top_k` 配置。
*   检查 FastGPT 发送给模型请求中的 `prompt` 内容，确认知识库引用部分的总 token 数未超过 6000 tokens。
*   通过 Milvus 客户端或 API 执行查询，观察响应时间，并与预期的性能指标进行对比，确保 Milvus 查询延迟在可接受范围内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
