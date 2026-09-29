---
title: Groq 131K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-groq01-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Groq 提供的这一档模型，包含 `openai/gpt-oss-120b`、`openai/gpt-oss-20b`、`qwen/qwen3-32b`、`llama-3.1-8b-instant`、`llama-3.3-70b-versatile` 等。其 `上下文长度 131072` 决定了模型"
language: zh
axis_model_tier: "Groq / 131072 /  / 120000 / false / true"
axis_vector_db: "Milvus"
covered_models: "openai/gpt-oss-120b、openai/gpt-oss-20b、qwen/qwen3-32b、llama-3.1-8b-instant、llama-3.3-70b-versatile"
check_day: 2026-09-29
meta_title: Groq 131K 上下文 这一档模型配 Milvus 的配置口径
meta_description: Groq 提供的这一档模型，包含 `openai/gpt-oss-120b`、`openai/gpt-oss-20b`、`qwen/qwen3-32b`、`llama-3.1-8b-instant`、`llama-3.3-70b-versatile` 等。其 `上下文长度 131072` 决定了模型
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Groq 131K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
Groq 提供的这一档模型，包含 `openai/gpt-oss-120b`、`openai/gpt-oss-20b`、`qwen/qwen3-32b`、`llama-3.1-8b-instant`、`llama-3.3-70b-versatile` 等。其 `上下文长度 131072` 决定了模型在单次交互中能处理的总 token 量，这直接影响了能塞入的检索内容和历史对话长度。`引用上限 120000` 明确了引用内容在总上下文中可占据的最大 token 预算。段落条数由检索结果决定，引用上限约束的是这些引用内容的合计 token 量。`图片输入 false` 表示模型不具备处理图像信息的能力，`工具调用 true` 则意味着模型支持通过外部工具扩展其功能。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `localhost:19530` 或 `your_milvus_cluster_endpoint:19530` | 指定 Milvus 服务端的网络地址和端口，确保 FastGPT 能够建立连接。 |
| `MILVUS_TOKEN` | 依据 Milvus 认证配置 | 如果 Milvus 开启了 RBAC 认证，需要提供有效的 `token` 进行身份验证。 |
| `HNSW` | `{"M": 16, "efConstruction": 200}` | `HNSW` 索引类型在召回性能和精度之间提供了良好平衡，`M` 影响图连接数，`efConstruction` 影响构建时的搜索范围。 |
| `IP` | `COSINE` | `IP` 相似度量方式，建议与 embedding 模型输出的向量空间特性保持一致，`COSINE` 对归一化向量效果好。 |
| 召回条数 | `10-15` | 根据模型 `引用上限` 和预期每段文本的平均长度，平衡召回数量与上下文空间。 |
| 单段最大字符数 | `800-1200` | 结合模型 `引用上限` 和单次最大上下文，控制每段文本的粒度，避免单一长段占用过多 token。 |

## 这两者互相约束的地方
模型 `上下文长度` 和 `引用上限` 对 Milvus 的召回策略构成直接约束。当 Milvus 返回的 `召回条数` 乘以 `每段长度`（以 token 计）的总和超过了模型的 `引用上限` 时，即使总上下文长度未触顶，引用内容也会被截断。引用上限是按 token 计算的，而向量库返回的是独立的段落条数，两者在实际应用中需要协同考虑。例如，若平均每段文本 token 数量较多，则 `召回条数` 需要适当减少，以确保引用内容在 `引用上限 120000` token 内；反之，若每段文本较短，则可以增加 `召回条数`。Milvus 的索引参数，如 `HNSW` 的 `efConstruction` 值调大，会提升召回精度，从而为模型提供更相关的上下文信息，但同时可能增加索引构建和查询的时间开销，这需要在整体系统响应时间与模型理解能力之间取得平衡。

## 容易做错的三处
*   日志显示 `Milvus connection failed: [Errno 111] Connection refused`。原因：`MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
*   模型输出内容与预期召回内容关联性弱，但检索结果显示匹配度高。原因：向量嵌入模型与 Milvus 存储的向量模型不一致，导致向量空间不匹配。
*   FastGPT 界面提示 `Quota exceeded for context window`。原因：`召回条数` 或 `单段最大字符数` 配置过大，使得引用内容总 token 超过了 `引用上限 120000`。

## 怎么确认配好了
*   在 FastGPT 的数据源管理界面，成功连接 Milvus 并能显示集合信息，确保 `MILVUS_ADDRESS` 和 `MILVUS_TOKEN` 配置正确。
*   执行一次 RAG 问答，观察模型回答中是否能有效利用到从 Milvus 召回的知识，同时检查日志中是否存在 `embedding` 向量生成错误或 Milvus 查询超时信息。
*   通过 FastGPT 的 RAG 调试工具，模拟不同查询，查看实际召回的段落条数和每段长度，估算总 token 量，确保其在 `引用上限 120000` 内。
*   持续监控 Milvus 服务的 CPU、内存、QPS 等指标，确保在实际负载下，查询延迟 `latency` 保持在可接受范围，例如 `500ms` 以下。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
