---
title: Ernie 128K 上下文 这一档模型配 openGauss 的配置口径
slug: /zh/combo/combo-ernie05-opengauss
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 128K 上下文模型，其上下文长度 128000 决定了单次请求中可输入的最大文本量，这直接影响到知识库召回内容的数量和详细程度。引用上限 123000 设定了模型在生成回答时可以参考的知识库段落总token量天花板，高于此上限的内容将无法被模型有效引用。图片输入能力允许模型处理包含图像"
language: zh
axis_model_tier: "Ernie / 128000 /  / 123000 / true / false"
axis_vector_db: "openGauss"
covered_models: "ernie-4.5-turbo-vl"
check_day: 2026-09-29
meta_title: Ernie 128K 上下文 这一档模型配 openGauss 的配置口径
meta_description: Ernie 128K 上下文模型，其上下文长度 128000 决定了单次请求中可输入的最大文本量，这直接影响到知识库召回内容的数量和详细程度。引用上限 123000 设定了模型在生成回答时可以参考的知识库段落总token量天花板，高于此上限的内容将无法被模型有效引用。图片输入能力允许模型处理包含图像
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 128K 上下文 这一档模型配 openGauss 的配置口径

## 这一档模型的参数意味着什么
Ernie 128K 上下文模型，其上下文长度 128000 决定了单次请求中可输入的最大文本量，这直接影响到知识库召回内容的数量和详细程度。引用上限 123000 设定了模型在生成回答时可以参考的知识库段落总token量天花板，高于此上限的内容将无法被模型有效引用。图片输入能力允许模型处理包含图像信息的请求，但工具调用功能缺失则意味着该模型无法直接通过外部工具扩展其能力，所有逻辑需在调用层完成。单次最大输出未标注，通常表示其输出长度受限于上下文总量或内部设计。

## 配 openGauss 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :--- | :--- | :--- |
| `OPENGAUSS_URL` | `postgresql://user:password@host:port/database` | FastGPT 连接 openGauss 数据库的连接字符串规范。 |
| `ef_construction` | `64` | 影响 HNSW 索引构建时的图连接数量，过大增加构建时间，过小影响召回质量。 |
| `ef_search` | `32` | 影响 HNSW 索引查询时的图遍历范围，过大增加查询耗时，过小可能降低召回准确率。 |
| `m` | `32` | HNSW 索引中每个节点的最大连接数，影响索引大小和查询性能的平衡。 |
| 召回条数 | `前 30 条` | 结合模型引用上限和单段平均 token 数，确保召回内容能被模型有效处理。 |
| 单段最大 token 数 | `800 token` | 知识库分段策略，避免单段过长导致模型处理效率下降或超出上下文。 |

## 这两者互相约束的地方
模型 128000 的上下文预算与 openGauss 召回内容紧密相关。召回条数乘以每段平均 token 数之和，必须严格控制在 128000 token 预算之内，否则模型将无法处理所有输入。引用上限 123000 token 进一步限制了模型实际能引用的内容量，即使向量库返回了大量相关段落，超出此上限的部分也不会被模型有效利用。因此，在 openGauss 中设置的召回条数，需要与知识库分段策略（单段平均 token 数）协同考虑，确保召回的总 token 量既能充分利用模型上下文，又不超过引用上限。openGauss 索引参数 `ef_construction` 和 `ef_search` 的调整，会直接影响召回的准确性和速度。调大这些参数能提高召回质量，但可能增加 openGauss 的计算负担，进而影响整体响应时间。

## 容易做错的三处
*   知识库召回结果为空，但 openGauss 中有相关数据。原因可能是向量化模型与查询模型不一致，或向量索引未正确构建。
*   模型回答中未引用知识库内容，或引用内容不相关。原因可能是召回条数设置过少，或 openGauss 召回的段落质量不高，导致模型认为无需引用。
*   请求模型时出现上下文超限错误。原因可能是 openGauss 召回的段落总 token 数加上提示词的总 token 数，超过了模型 128000 的上下文长度限制。

## 怎么确认配好了
*   在 FastGPT 知识库管理界面，查看单次查询的召回条数是否符合预期，并检查召回内容的 relevancy score。
*   通过 FastGPT 的调试功能，观察模型实际输入中知识库内容的 token 数量，确保其在 128000 上下文长度和 123000 引用上限内。
*   模拟不同复杂度的查询，观察 openGauss 的查询响应时间是否在可接受范围内，并检查 `pg_stat_statements` 等监控视图，确认索引使用情况。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
