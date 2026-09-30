---
title: Hunyuan 128K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-hunyuan10-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Hunyuan 128K 上下文模型系列，其 128000 的上下文长度（`maxContext`）定义了单次对话可以承载的最大输入文本量，包括系统指令、用户查询以及所有召回内容的合计。模型本身并未标注单次最大输出字数，这意味着在实际应用中需要根据具体业务需求和下游应用限制来管理生成文本的长度。引用"
language: zh
axis_model_tier: "Hunyuan / 128000 /  / 128000 / false / false"
axis_vector_db: "Milvus"
covered_models: "hunyuan-2.0-instruct-20251111、hunyuan-2.0-thinking-20251109"
check_day: 2026-09-29
meta_title: Hunyuan 128K 上下文 这一档模型配 Milvus 的配置口径
meta_description: Hunyuan 128K 上下文模型系列，其 128000 的上下文长度（`maxContext`）定义了单次对话可以承载的最大输入文本量，包括系统指令、用户查询以及所有召回内容的合计。模型本身并未标注单次最大输出字数，这意味着在实际应用中需要根据具体业务需求和下游应用限制来管理生成文本的长度。引用
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Hunyuan 128K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
Hunyuan 128K 上下文模型系列，其 128000 的上下文长度（`maxContext`）定义了单次对话可以承载的最大输入文本量，包括系统指令、用户查询以及所有召回内容的合计。模型本身并未标注单次最大输出字数，这意味着在实际应用中需要根据具体业务需求和下游应用限制来管理生成文本的长度。引用上限（`quoteMaxToken`）为 128000，这表示所有作为引用的内容合计占用的 token 预算。引用内容的总 token 数量受到此参数的严格控制。段落条数由检索系统返回，与引用内容的 token 预算是两个独立的量。此档模型不支持图片输入和工具调用能力，因此在设计应用时无需考虑这两类功能集成。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `milvus-service.default.svc.cluster.local:19530` | 内部服务访问地址，减少网络延迟 |
| `MILVUS_TOKEN` | `<your_milvus_api_key>` | 用于 Milvus 认证，保障数据安全 |
| `HNSW` `efConstruction` | `128` | 影响 HNSW 索引构建质量，提高召回准确性 |
| `HNSW` `M` | `32` | 影响 HNSW 索引图的连通性，平衡查询速度与召回率 |
| `IP` | `True` | 使用内积距离度量，适用于大多数文本相似性检索场景 |
| `recall_top_k` | `前 5 条` | 初始召回条数，平衡模型上下文与检索效率 |

## 这两者互相约束的地方
模型上下文预算是核心约束。召回条数与每段内容的长度决定了总召回内容占用的 token 数量。当召回条数乘以每段平均长度的 token 数，其总和不能超过模型的上下文预算。引用上限是针对引用内容的 token 预算，它独立于向量库返回的段落条数。引用内容的 token 预算会限制总计可被引用的内容量。向量库返回的是固定数量的段落，而这些段落的实际 token 数量则受引用上限的制约。索引参数，如 Milvus 的 `HNSW` `M` 和 `efConstruction`，调大可以提升检索的精确性，这意味着可以更有效地从海量数据中找到相关性高的内容。这些更精确的召回内容，在模型有限的上下文窗口内，能够提供更优质的输入，从而可能提高模型理解和生成答案的质量。

## 容易做错的三处
*   日志显示 `Error: Context window exceeded`，原因是在向量检索侧返回了过多的内容，导致总输入 token 超过了 128000 的上限。
*   模型输出内容过短或信息缺失，可能是因为引用内容总 token 超过了 128000 的引用上限，导致部分召回内容被截断，关键信息未能送达模型。
*   查询 Milvus 返回结果为空，但知识库中明明有相关文档，原因可能是 `MILVUS_ADDRESS` 配置错误或 `MILVUS_TOKEN` 认证失败。

## 怎么确认配好了
*   通过 FastGPT 管理界面上传文档，观察 Milvus 对应 Collection 中数据是否正常写入，并能通过 ID 精确检索。
*   在 FastGPT 中创建一个测试应用，配置 Hunyuan 模型，并进行模拟对话。检查对话日志，确认每次召回的 token 数量未超过 128000 的引用上限。
*   调整 `recall_top_k` 参数，观察不同召回条数下，模型回答的完整性和相关性，根据业务需求标定合适的阈值。
*   使用 Milvus 客户端进行多次查询，监控查询延迟和召回结果的准确性，确保 `HNSW` 索引参数在实际负载下的表现符合预期。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
