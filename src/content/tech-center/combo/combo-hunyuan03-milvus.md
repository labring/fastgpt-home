---
title: Hunyuan 28K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-hunyuan03-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Hunyuan 28K 上下文模型系列，包括 `hunyuan-large` 和 `hunyuan-turbo`，具备 28000 token 的上下文长度，这意味着单次请求中模型可以处理的输入文本总量上限。引用上限为 20000 token，这明确了模型在生成回复时，可用于引用内容的 token "
language: zh
axis_model_tier: "Hunyuan / 28000 /  / 20000 / false / false"
axis_vector_db: "Milvus"
covered_models: "hunyuan-large、hunyuan-turbo"
check_day: 2026-09-29
meta_title: Hunyuan 28K 上下文 这一档模型配 Milvus 的配置口径
meta_description: Hunyuan 28K 上下文模型系列，包括 `hunyuan-large` 和 `hunyuan-turbo`，具备 28000 token 的上下文长度，这意味着单次请求中模型可以处理的输入文本总量上限。引用上限为 20000 token，这明确了模型在生成回复时，可用于引用内容的 token
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Hunyuan 28K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
Hunyuan 28K 上下文模型系列，包括 `hunyuan-large` 和 `hunyuan-turbo`，具备 28000 token 的上下文长度，这意味着单次请求中模型可以处理的输入文本总量上限。引用上限为 20000 token，这明确了模型在生成回复时，可用于引用内容的 token 总量。段落条数是检索系统返回的结果数量，与引用上限的 token 预算是两个独立的概念。该档模型不支持图片输入和工具调用，因此基于这些特性的高级交互能力不会被激活。

## 配 Milvus 要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `milvus-service:19530` | 内部服务发现地址，确保 FastGPT 能正确连接 Milvus 集群 |
| `MILVUS_TOKEN` | `按实测标定` | API 访问凭证，保障连接安全和权限控制 |
| `HNSW` `efConstruction` | `64` | 控制 HNSW 图构建时的邻居数量，影响索引质量与构建速度 |
| `HNSW` `M` | `16` | 控制 HNSW 图中每个节点的最大连接数，影响召回精度与查询速度 |
| `IP` | `True` | 使用内积距离度量，适用于推荐系统和文本相似度匹配 |
| `recall_num` | `前 5 条` | 向量库返回的向量条数，影响模型可引用的潜在内容量 |

## 这两者互相约束的地方
模型上下文预算为 28000 token，引用上限为 20000 token。当从 Milvus 召回内容时，检索条数与每段内容长度的乘积，不能超出模型的上下文预算。引用上限限制的是引用内容合计的 token 预算，而向量库返回的是段落条数，两者是不同的量。如果每段内容较短，可能在达到引用上限前就已召回较多段落；反之，若每段内容较长，则可能在召回少量段落后就触及引用上限。索引参数如 `HNSW` 的 `M` 和 `efConstruction` 调大，通常会提升检索精度，这意味着模型在有限的召回条数下，能获得更相关的上下文信息，从而提升回复质量。

## 容易做错的三处
*   日志中出现 `Milvus connection failed: [Errno 111] Connection refused`，原因是 `MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
*   模型回复内容空泛，且界面显示引用内容少于预期，原因是 `recall_num` 设置过低或向量库召回的相关性不足。
*   请求响应时间过长，甚至出现 `TimeoutError`，原因是 Milvus 索引参数（如 `HNSW` 的 `efConstruction` 或 `M`）设置过大，导致查询耗时过长。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，执行一次测试连接，确认 `MILVUS_ADDRESS` 和 `MILVUS_TOKEN` 配置无误，状态码显示为 200。
*   上传文档后，在向量库管理页面查看索引状态，确认所有文档均已成功入库，且 `HNSW` 和 `IP` 索引类型正确。
*   进行一次带引用的对话测试，观察模型回复中引用的内容是否与知识库原文高度相关，并检查引用内容的 token 总量是否在 20000 token 引用上限内。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
