---
title: Ernie 128K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-ernie03-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 128K 上下文模型档位提供 128000 tokens 的上下文长度，这意味着在单次请求中可以输入大量的召回内容、历史对话以及指令。引用上限为 119000 tokens，直接决定了知识库召回内容在输入模型时所能占据的最大空间。单次最大输出未标注，通常需要根据实际应用场景进行测试以确定"
language: zh
axis_model_tier: "Ernie / 128000 /  / 119000 / true / true"
axis_vector_db: "Milvus"
covered_models: "ernie-5.0、ernie-5.0-thinking-preview、ernie-5.0-thinking-latest"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 Milvus 的配置口径
meta_description: Ernie 128K 上下文模型档位提供 128000 tokens 的上下文长度，这意味着在单次请求中可以输入大量的召回内容、历史对话以及指令。引用上限为 119000 tokens，直接决定了知识库召回内容在输入模型时所能占据的最大空间。单次最大输出未标注，通常需要根据实际应用场景进行测试以确定
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
Ernie 128K 上下文模型档位提供 128000 tokens 的上下文长度，这意味着在单次请求中可以输入大量的召回内容、历史对话以及指令。引用上限为 119000 tokens，直接决定了知识库召回内容在输入模型时所能占据的最大空间。单次最大输出未标注，通常需要根据实际应用场景进行测试以确定其生成内容的长度限制。图片输入能力支持多模态RAG场景，允许模型处理图像信息。工具调用能力的提供，则允许模型在生成回复时调用外部工具，扩展其功能边界，实现更复杂的业务逻辑。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `MILVUS_ADDRESS` | `milvus-service.milvus.svc.cluster.local:19530` | 生产环境使用 Kubernetes 内部服务地址，确保网络连通性。 |
| `MILVUS_TOKEN` | 按实测标定 | Milvus 开启认证后，需要提供有效的访问凭证。 |
| `HNSW` | `{"M": 16, "efConstruction": 200}` | `M` 决定了邻居数量，`efConstruction` 决定了索引构建时的搜索范围，平衡召回率与构建速度。 |
| `IP` | `L2` | 欧氏距离（L2）适用于大部分场景，尤其是处理归一化后的向量。 |
| 召回条数 | `前 5 条` | 平衡模型上下文与召回质量，避免不必要的 token 消耗。 |
| 单段最大字符数 | `800–1200 字符` | 兼顾信息完整性和模型处理效率，避免单段过长或过短。 |

## 这两者互相约束的地方
Ernie 128K 上下文模型与 Milvus 向量库的配合，核心在于对模型上下文窗口的有效管理。召回条数与每段长度的乘积，加上系统指令、历史对话等，总和不能超过模型的 128000 tokens 上下文预算。其中，知识库引用部分的上限为 119000 tokens，这意味着即使 Milvus 返回了大量相关度高的向量，最终能送入模型的文本量也受此约束。在实际操作中，Milvus 的 `top_k` 参数（即返回的召回条数）与模型实际引用的条数，谁先达到限制谁就生效。如果 Milvus 配置了较高的 `top_k`，但模型上下文或引用上限不足，则部分召回内容会被截断。此外，Milvus 的索引参数，如 `HNSW` 中的 `M` 和 `efConstruction`，调大后虽然可能提升召回精度，但也会增加索引构建和查询的资源消耗，这对于需要快速响应的 Ernie 模型调用场景而言，可能引入额外的延迟。

## 容易做错的三处
*   日志显示 `Milvus connection failed: [Errno 111] Connection refused`：原因通常是 `MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
*   模型回答中知识库引用内容为空：原因可能是 Milvus 召回结果为空，或者召回的文本段落长度为零。
*   模型返回 `Context window exceeded` 错误：原因在于召回条数过多或单段文本过长，导致输入总 token 数超过了 128000 tokens。

## 怎么确认配好了
*   在 FastGPT 知识库配置中，确保 Milvus 连接状态显示为“已连接”，并能成功同步知识库数据。
*   进行一次包含知识库查询的对话测试，检查模型返回的引用内容是否与 Milvus 中存储的原文一致，并观察 `token_usage` 指标。
*   逐步调整召回条数和单段最大字符数，观察模型输出的引用内容长度和效果，以确定符合业务需求的配置阈值。
*   使用 Milvus 客户端直接查询，验证 `HNSW` 索引参数下，查询返回的向量相似度是否符合预期，确认索引构建效果。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
