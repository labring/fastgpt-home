---
title: Ernie 64K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-ernie02-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 64K 上下文模型档位，其 64000 的上下文长度为单次交互提供了充足的信息容量，允许系统在一次请求中处理大量的召回内容。引用上限 55000 意味着在知识库检索时，模型能够有效利用的总引用内容长度上限。工具调用 `true` 标识了该模型具备调用外部工具的能力，可以在复杂任务中执行特"
language: zh
axis_model_tier: "Ernie / 64000 /  / 55000 / false / true"
axis_vector_db: "Milvus"
covered_models: "ernie-x1.1-preview、ernie-x1.1"
check_day: 2026-09-29
meta_title: Ernie 64K 上下文 这一档模型配 Milvus 的配置口径
meta_description: Ernie 64K 上下文模型档位，其 64000 的上下文长度为单次交互提供了充足的信息容量，允许系统在一次请求中处理大量的召回内容。引用上限 55000 意味着在知识库检索时，模型能够有效利用的总引用内容长度上限。工具调用 `true` 标识了该模型具备调用外部工具的能力，可以在复杂任务中执行特
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 64K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
Ernie 64K 上下文模型档位，其 64000 的上下文长度为单次交互提供了充足的信息容量，允许系统在一次请求中处理大量的召回内容。引用上限 55000 意味着在知识库检索时，模型能够有效利用的总引用内容长度上限。工具调用 `true` 标识了该模型具备调用外部工具的能力，可以在复杂任务中执行特定操作。图片输入 `false` 则表明该模型当前不支持直接处理图像信息。这些参数共同构成了模型在 RAG 架构下的能力边界与适用场景。

## 配 Milvus 要定哪些

| 配置项             | 建议取法       | 这样取的依据                                                 |
| ------------------ | -------------- | ------------------------------------------------------------ |
| `MILVUS_ADDRESS`   | `milvus.svc.cluster.local:19530` | 内部服务发现地址，确保 FastGPT 与 Milvus 间的网络连通性。 |
| `MILVUS_TOKEN`     | `按实测标定`   | 用于 Milvus 认证，保障数据访问安全。                             |
| `index_type`       | `HNSW`         | 适用于大规模向量检索，在保证召回效果的同时提供较好的查询性能。 |
| `metric_type`      | `IP`           | 内积相似度，与多数文本嵌入模型生成的向量匹配度高。           |
| `max_k_recall`     | `20`           | 单次 Milvus 查询返回的最大向量数量，为后续模型引用提供足够候选。 |
| `segment_length`   | `800-1200 字符` | 知识库分段的合理长度，避免过长或过短影响召回质量和模型理解。 |

## 这两者互相约束的地方
Ernie 64K 上下文模型的引用上限与 Milvus 的召回能力需要紧密协同。模型的 55000 引用上限是实际可利用的知识内容长度天花板，这意味着即使 Milvus 返回了大量向量，最终能送入模型的文本长度仍受此限制。因此，`max_k_recall` 参数的设置应与知识库分段长度 (`segment_length`) 结合考虑，确保 `max_k_recall` 乘以 `segment_length` 的总和不超过 55000，并留有余量给系统提示词和用户输入。若 Milvus 返回的向量数量过多，超出引用上限，FastGPT 将进行截断，可能导致部分相关信息无法被模型利用。此外，`HNSW` 等索引参数的调整会影响 Milvus 的召回精度和查询延迟，间接影响 FastGPT 的响应速度和知识利用效率。

## 容易做错的三处
*   日志显示 `Milvus connection refused: [Errno 111] Connection refused`：原因可能是 `MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
*   模型回复中知识点缺失，但知识库中明明存在相关文档：原因可能是 `max_k_recall` 设置过低，导致 Milvus 返回的向量不足以覆盖所有相关信息。
*   FastGPT 界面显示“上下文超限”错误，但用户输入并不长：原因可能是知识库分段长度 (`segment_length`) 过大，或 `max_k_recall` 导致召回内容总长度超过了 55000 的引用上限。

## 怎么确认配好了
*   在 FastGPT 中创建一个知识库，导入若干文档，并确保向量嵌入成功。
*   针对知识库内容进行提问，观察模型回复是否能准确引用相关知识段落，并通过 Milvus 的监控面板检查查询 QPS 和延迟是否在预期范围内。
*   逐步增加 `max_k_recall` 参数，观察模型引用知识内容的丰富程度是否提高，直到达到一个平衡点，即引用内容充足且未触发上下文超限。
*   使用 Milvus SDK 或客户端直连 Milvus，对同一向量进行查询，验证 `HNSW` 和 `IP` 索引参数下的召回结果与预期一致，并与 FastGPT 的召回结果进行比对。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
