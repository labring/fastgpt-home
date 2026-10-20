---
title: 引用预算 1.2 万–3.2 万的对话模型配 embedding-3 的分段与引用口径
slug: /zh/combo/combo-q32k-chatglm01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 限定了单次对话中可引用的知识库内容总token预算，该档位的区间覆盖了多数长上下文交互场景。它能支持批量召回较多的知识库片段，适配复杂问答、长文档总结等知识库应用需求，无需频繁截断引用内容，保障回答的上下文完整性与逻辑连贯性，同时适配平台的调用规则，平衡了内容丰富度与"
language: zh
axis_model_tier: "引用预算 1.2 万–3.2 万"
covered_models: "Baichuan4、Baichuan4-Turbo、Baichuan4-Air、Baichuan3-Turbo、Baichuan-M3、Baichuan-M3-Plus、Baichuan2-Turbo、glm-4v-plus、ernie-4.5-turbo-32k、ernie-4.5-turbo-vl-32k、hunyuan-large、hunyuan-pro、hunyuan-standard、hunyuan-turbo、hunyuan-turbos-latest、hunyuan-t1-latest、internlm2-pro-chat、internlm3-8b-instruct、mistral-small-latest、moonshot-v1-32k、moonshot-v1-32k-vision-preview、qwen3-vl-flash、qwen3-vl-plus、qwen3-1.7b、qwen3-0.6b、Qwen/Qwen2-VL-72B-Instruct、deepseek-ai/DeepSeek-V2.5、lite、max-32k、step-1o-turbo-vision、step-1-32k、step-1o-vision-32k、step-1v-32k、yi-lightning、yi-vision-v2"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 1.2 万–3.2 万的对话模型配 embedding-3 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 限定了单次对话中可引用的知识库内容总token预算，该档位的区间覆盖了多数长上下文交互场景。它能支持批量召回较多的知识库片段，适配复杂问答、长文档总结等知识库应用需求，无需频繁截断引用内容，保障回答的上下文完整性与逻辑连贯性，同时适配平台的调用规则，平衡了内容丰富度与调用成本。

## 配 ChatGLM 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 匹配embedding-3平台登记的默认每段输入长度，保障向量生成一致性 |
| `maxToken` | 8000 tokens | 匹配embedding-3平台登记的单段最大输入上限，充分利用模型承载能力 |
| `chunkSize` | 512 tokens / 8000 tokens | 分块长度，可根据场景需求选择默认标准值或最大上限 |
| 重叠长度 | 10%-20%的分块长度 | 保障相邻分块的语义连贯性，避免关键信息被分块截断 |
| 单次搜索上限 | 23-62条 | 基于`quoteMaxToken`与默认`defaultToken`计算的最大召回条数，防止超出token预算 |
| 最低相关度 | 自定义区间 | 过滤低相关性召回片段，优化引用内容的整体相关性与质量 |

## 这两者互相约束的地方
该组合下，按默认每段512 tokens计算，一轮引用最多可放下23-62段；若将每段调整至embedding-3允许的8000 tokens上限，则仅能放下约1段。每段越长，单段承载的语义信息越完整，一轮可容纳的段数越少；每段越短，一轮可容纳的段数越多，但单段上下文的完整性会下降。更换向量模型后，由于向量维度与模型绑定，已建立的知识库索引需要重新构建，才能适配新的向量生成逻辑。

## 容易做错的三处
- 界面显示引用内容超出长度提示，原因是未按`maxToken`限制设置分块长度，导致单段输入超出向量模型承载上限。
- 召回片段数量远超预期，原因是未设置合理的单次搜索上限，未结合`quoteMaxToken`与分块长度计算最大允许召回条数。
- 知识库查询返回内容碎片化严重，原因是分块长度设置过短且未配置足够的重叠长度，导致关键语义被拆分至多个片段。

## 怎么确认配好了
- 查看向量模型配置项，确认`defaultToken`与`maxToken`的取值匹配平台登记的embedding-3参数。
- 运行知识库分块测试，验证生成的片段长度符合预设的`chunkSize`设置。
- 发起测试对话，检查引用内容未触发超限提示。
- 查看索引构建日志，确认无异常报错，索引生成流程正常完成。
