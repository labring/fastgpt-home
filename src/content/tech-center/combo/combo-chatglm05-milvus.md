---
title: ChatGLM 128K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-chatglm05-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "这一档模型具备 128000 的上下文长度，这意味着在单次交互中可以处理极大量的信息输入。单次最大输出能力未明确标注，通常由模型内部机制控制，并受限于总上下文长度。引用上限为 120000 token，这是模型为引用内容预留的最大预算，它限制了所有引用内容合计所能占用的 token 数量。段落条数则"
language: zh
axis_model_tier: "ChatGLM / 128000 /  / 120000 / true / true"
axis_vector_db: "Milvus"
covered_models: "glm-4.6v、glm-4.6v-flashx、glm-4.6v-flash"
check_day: 2026-09-29
meta_title: ChatGLM 128K 上下文 这一档模型配 Milvus 的配置口径
meta_description: 这一档模型具备 128000 的上下文长度，这意味着在单次交互中可以处理极大量的信息输入。单次最大输出能力未明确标注，通常由模型内部机制控制，并受限于总上下文长度。引用上限为 120000 token，这是模型为引用内容预留的最大预算，它限制了所有引用内容合计所能占用的 token 数量。段落条数则
date_published: 2026-09-29
date_modified: 2026-09-29
---

# ChatGLM 128K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
这一档模型具备 128000 的上下文长度，这意味着在单次交互中可以处理极大量的信息输入。单次最大输出能力未明确标注，通常由模型内部机制控制，并受限于总上下文长度。引用上限为 120000 token，这是模型为引用内容预留的最大预算，它限制了所有引用内容合计所能占用的 token 数量。段落条数则由检索系统决定，与引用上限是两个独立的概念。模型支持图片输入，允许处理多模态数据，并内置工具调用能力，可执行外部函数或 API。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `localhost:19530` 或 `your_milvus_host:19530` | 建立与 Milvus 服务的网络连接，确保 FastGPT 能够访问 Milvus 实例。 |
| `MILVUS_TOKEN` | 按实际部署情况设置 | 用于 Milvus 集群的认证，保障数据访问安全，建议非开发环境启用。 |
| `HNSW` `M` | `32` | 影响 HNSW 图的连接度，平衡检索性能与召回率，`32` 是常见且效果良好的起始点。 |
| `HNSW` `efConstruction` | `200` | 影响 HNSW 索引构建时的邻居搜索范围，越大索引质量越高但构建时间越长。 |
| `IP` | 欧氏距离或余弦相似度 | 向量相似度计算方法，`IP` (内积) 适用于归一化向量，需与 Embedding 模型匹配。 |
| `recall_top_k` | `5`–`10` 条 | 初始召回条数，需要与模型引用上限和单段长度结合评估，避免超出模型处理能力。 |

## 这两者互相约束的地方
模型 128000 token 的上下文长度是总输入量的上限，其中 120000 token 专门用于引用内容。这意味着从 Milvus 召回的文档片段总长度，在转换为 token 后，不应超过这个预算。引用上限按 token 计数，而 Milvus 返回的是具体的段落条数。当每段文档的平均长度不同时，相同的召回条数可能对应不同的 token 数量，因此需要根据实际文档长度来动态调整 Milvus 的 `recall_top_k` 参数。索引参数如 `HNSW` `M` 和 `efConstruction` 的调大，通常能提升 Milvus 的检索精度，从而为模型提供更相关的上下文，这对于利用 128K 上下文长度模型的高级理解能力至关重要。

## 容易做错的三处
*   日志显示 `Milvus connection failed: [ErrCode: 0, ErrMsg: fail to connect to server]`：`MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
*   模型返回内容空泛或不相关，但 Milvus 检索结果看似正常：`recall_top_k` 过大导致引用内容超出模型 120000 token 引用上限，模型自动截断或忽略。
*   检索速度慢，响应时间长：`HNSW` `efConstruction` 设置过高，或 Milvus 实例资源不足。

## 怎么确认配好了
*   在 FastGPT 界面配置 Milvus 连接后，点击“测试连接”按钮，确认返回状态码为 200。
*   通过 FastGPT 的检索测试功能，输入测试问题，观察 Milvus 返回的 `recall_top_k` 条目是否与预期相符，并检查每条内容长度。
*   使用一个包含大量引用内容的复杂问题进行端到端测试，检查模型输出的引用是否完整且准确，并根据实际 token 消耗判断 120000 token 引用上限是否得到有效利用。
*   监控 Milvus 服务的 CPU、内存、网络 I/O 等指标，确保在高并发查询下服务稳定，没有出现资源瓶颈。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
