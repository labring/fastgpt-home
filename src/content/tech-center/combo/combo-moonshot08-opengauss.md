---
title: Moonshot 128K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-moonshot08-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`moonshot-v1-128k-vision-preview` 模型档位具备 128000 tokens 的上下文长度，决定了在单次交互中可处理的输入总量。模型支持图片输入，允许在对话中融入视觉信息进行理解与分析。工具调用功能则使得模型能够与外部系统或服务集成，执行特定操作。引用上限为 6000"
language: zh
axis_model_tier: "Moonshot / 128000 /  / 60000 / true / true"
axis_vector_db: "openGauss"
covered_models: "moonshot-v1-128k-vision-preview"
check_day: 2026-09-29
meta_title: Moonshot 128K 上下文 这一档模型配 openGauss 的配置口径
meta_description: `moonshot-v1-128k-vision-preview` 模型档位具备 128000 tokens 的上下文长度，决定了在单次交互中可处理的输入总量。模型支持图片输入，允许在对话中融入视觉信息进行理解与分析。工具调用功能则使得模型能够与外部系统或服务集成，执行特定操作。引用上限为 6000
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Moonshot 128K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
`moonshot-v1-128k-vision-preview` 模型档位具备 128000 tokens 的上下文长度，决定了在单次交互中可处理的输入总量。模型支持图片输入，允许在对话中融入视觉信息进行理解与分析。工具调用功能则使得模型能够与外部系统或服务集成，执行特定操作。引用上限为 60000 tokens，限定了引用内容在总上下文中的token预算。这意味着在生成回答时，模型可引用的外部知识内容总计不超过此 token 数。段落条数由检索系统返回，与引用内容的 token 预算是不同的衡量维度。

## 配 openGauss 要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
|---|---|---|
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 openGauss 数据库的标准连接字符串格式。 |
| `ef_construction` | `100–200` | 索引构建时，控制图的连接性，数值越大构建质量越高，但耗时也越长。 |
| `ef_search` | `50–100` | 搜索时，控制遍历的邻居节点数量，数值越大召回率越高，但查询延迟也越大。 |
| `m = 32` | `32` | HNSW 索引中每个节点的最大连接数，影响索引的内存占用和查询性能。 |
| `chunk_size` | `500–800 字符` | 文本切片时，每个片段的字符长度，影响检索精度和引用效率。 |
| `top_k` | `前 5–10 条` | 向量检索时，返回最相似的文档片段数量，直接影响模型可引用的内容量。 |

## 这两者互相约束的地方
模型上下文预算是 128000 tokens，而引用上限是 60000 tokens。这意味着即使整体上下文允许，可供模型引用的知识内容总量也受 60000 tokens 的限制。openGauss 向量库返回的是条数，每条内容的实际 token 数量则取决于切片策略。当单条内容较短时，可以在引用上限内包含更多条目；若单条内容较长，则可能在达到引用上限时，实际引用的条目数相对较少。索引参数 `ef_construction` 和 `ef_search` 的调整，会影响 openGauss 检索的召回率与查询延迟。更高的召回率意味着模型在更相关的知识片段中进行选择，从而提升回答质量，但可能增加整体响应时间。

## 容易做错的三处
- 向量检索返回的 `top_k` 条目总 token 数超过了模型的引用上限，导致部分内容被截断，模型无法完整参考。原因在于未充分估算单条文档的 token 长度，导致 `top_k` 设置过高。
- `OPENGAUSS_URL` 配置错误，FastGPT 启动时报数据库连接失败，无法初始化向量存储。原因通常是连接字符串中的主机、端口、用户名或密码有误。
- 尽管 openGauss 返回了大量相关文档，但模型生成回答的质量仍然不佳，且回答中未体现出对引用内容的有效整合。原因可能是 `ef_search` 设置过低，导致向量检索的召回率不足，未能提供足够高质量的上下文信息。

## 怎么确认配好了
- 部署 FastGPT 后，通过管理界面查看 openGauss 连接状态，确认显示“已连接”。
- 在 FastGPT 中上传文档并进行知识库分段，然后通过 FastGPT 的调试功能，观察 openGauss 实际返回的 `top_k` 条目与内容是否符合预期，并检查引用内容的总 token 数是否在引用上限内。
- 进行多次问答测试，观察模型回答中是否有效利用了知识库内容，并评估回答的准确性与相关性，判断 `ef_construction` 和 `ef_search` 的设置是否达到了可接受的召回与延迟平衡点。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
