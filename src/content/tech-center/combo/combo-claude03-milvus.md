---
title: Claude 1000K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-claude03-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`claude-sonnet-4-5-20250929` 模型具备 1000000 token 的上下文长度，决定了单次交互中可处理的输入总量，包括用户查询、系统指令及召回内容。引用上限为 100000 token，表明在知识库问答场景下，模型可接受的引用段落总长度存在上限。图片输入能力允许模型处理"
language: zh
axis_model_tier: "Claude / 1000000 /  / 100000 / true / true"
axis_vector_db: "Milvus"
covered_models: "claude-sonnet-4-5-20250929"
check_day: 2026-09-29
meta_title: Claude 1000K 上下文 这一档模型配 Milvus 的配置口径
meta_description: `claude-sonnet-4-5-20250929` 模型具备 1000000 token 的上下文长度，决定了单次交互中可处理的输入总量，包括用户查询、系统指令及召回内容。引用上限为 100000 token，表明在知识库问答场景下，模型可接受的引用段落总长度存在上限。图片输入能力允许模型处理
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Claude 1000K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
`claude-sonnet-4-5-20250929` 模型具备 1000000 token 的上下文长度，决定了单次交互中可处理的输入总量，包括用户查询、系统指令及召回内容。引用上限为 100000 token，表明在知识库问答场景下，模型可接受的引用段落总长度存在上限。图片输入能力允许模型处理视觉信息，支持多模态RAG。工具调用能力则使得模型能够与外部系统或功能模块进行交互，扩展其解决问题的范围。单次最大输出未标注，意味着实际输出长度可能受限于请求方或模型内部限制。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `MILVUS_ADDRESS` | `localhost:19530` 或 `your_milvus_cluster_ip:19530` | 指定 Milvus 服务端的连接地址与端口，确保 FastGPT 能够定位并连接到 Milvus 实例。 |
| `MILVUS_TOKEN` | 按实测标定 | Milvus 认证凭证，用于访问受保护的 Milvus 实例，保障数据安全。 |
| `HNSW` | `M=16, efConstruction=128` | HNSW 索引参数，`M` 影响邻居节点数量，`efConstruction` 影响索引构建时的搜索精度，对召回性能和索引构建时间有直接影响。 |
| `IP` | `L2` 或 `COSINE` | 向量相似度度量方式，`L2` 适用于欧氏距离，`COSINE` 适用于余弦相似度，需与 embedding 模型输出的向量特性匹配。 |
| 召回条数 | `10-20` 条 | 限制从 Milvus 召回的向量数量，过多会增加模型上下文压力，过少可能导致信息缺失。 |
| 单段字符长度 | `300-500` 字符 | 知识库分段时建议的字符长度，兼顾信息完整性和模型上下文处理效率。 |

## 这两者互相约束的地方
模型 1000000 token 的上下文长度与 Milvus 的召回机制紧密关联。召回条数与每段字符长度的乘积，加上用户查询和系统指令，必须严格控制在模型的上下文预算内，否则会导致输入截断或报错。例如，如果召回 `20` 条，每条 `500` 字符（约 `1500` token），则召回内容就占用了 `30000` token，这在 1000000 token 的上限下是可行的。引用上限 100000 token 进一步约束了知识库引用的总长度，即使 Milvus 返回了大量条目，最终送入模型的引用内容也受此限制。Milvus 的向量库返回条数是其自身的配置，而引用上限是模型侧的约束，两者取最小值生效。调大 Milvus 的 `HNSW` 索引参数，如 `efConstruction`，会提升召回精度，但可能增加查询延迟，进而影响 FastGPT 整体响应时间，需要权衡。

## 容易做错的三处
- 日志显示 `Milvus connection refused`：`MILVUS_ADDRESS` 配置错误或 Milvus 服务未运行。
- 界面提示 `上下文溢出，请缩短输入或减少引用段落`：召回条数过多或单段字符长度过长，导致模型输入超过 1000000 token 上限。
- 知识库问答结果缺乏相关性：`IP` 相似度度量选择不当，或 `HNSW` 索引参数 `M` 和 `efConstruction` 设置过低影响召回质量。

## 怎么确认配好了
- 通过 FastGPT 界面发送一个包含知识库查询的请求，观察模型响应是否准确且引用内容完整。
- 检查 FastGPT 后台日志，确认没有 Milvus 连接错误或向量查询异常信息。
- 使用 Milvus 客户端工具，对配置的向量集合执行相似度查询，验证 `HNSW` 索引和 `IP` 距离度量是否按预期工作，并与 FastGPT 的召回结果对比。
- 模拟高并发查询，观察 FastGPT 和 Milvus 的响应时间，确保在负载下系统性能达标。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
