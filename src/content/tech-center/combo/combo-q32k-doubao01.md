---
title: 引用预算 1.2 万–3.2 万的对话模型配 doubao-embedding-large-text-250515 / doubao-embedding-text-240715 的分段与引用口径
slug: /zh/combo/combo-q32k-doubao01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken` 是对话模型可承载的引用内容总token预算，限定了知识库召回内容的累计token上限。当前档位的预算区间为12000至32000 tokens，既可以支撑中等规模的知识库召回需求，覆盖较多的相关文档片段，又能避免因预算过高导致模型处理负载超出合理范围，适配多数企业级知"
language: zh
axis_model_tier: "引用预算 1.2 万–3.2 万"
covered_models: "Baichuan4、Baichuan4-Turbo、Baichuan4-Air、Baichuan3-Turbo、Baichuan-M3、Baichuan-M3-Plus、Baichuan2-Turbo、glm-4v-plus、ernie-4.5-turbo-32k、ernie-4.5-turbo-vl-32k、hunyuan-large、hunyuan-pro、hunyuan-standard、hunyuan-turbo、hunyuan-turbos-latest、hunyuan-t1-latest、internlm2-pro-chat、internlm3-8b-instruct、mistral-small-latest、moonshot-v1-32k、moonshot-v1-32k-vision-preview、qwen3-vl-flash、qwen3-vl-plus、qwen3-1.7b、qwen3-0.6b、Qwen/Qwen2-VL-72B-Instruct、deepseek-ai/DeepSeek-V2.5、lite、max-32k、step-1o-turbo-vision、step-1-32k、step-1o-vision-32k、step-1v-32k、yi-lightning、yi-vision-v2"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 1.2 万–3.2 万的对话模型配 doubao-embedding-large-text-250515 / doubao-embedding-text-240715 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken` 是对话模型可承载的引用内容总token预算，限定了知识库召回内容的累计token上限。当前档位的预算区间为12000至32000 tokens，既可以支撑中等规模的知识库召回需求，覆盖较多的相关文档片段，又能避免因预算过高导致模型处理负载超出合理范围，适配多数企业级知识库应用的上下文管理要求。

## 配 Doubao 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 匹配向量模型默认分块长度，无需额外调整即可兼容基础检索场景 |
| `maxToken` | 4096 tokens | 遵循向量模型单段输入上限，保证单段语义的完整性 |
| `quoteMaxToken` | 12000–32000 tokens | 匹配当前对话模型档的引用预算区间，适配不同召回规模的业务需求 |
| `chunkSize` | 512–4096 tokens | 可根据业务场景灵活调整，基础场景取512 tokens兼顾检索密度与语义连贯性，长文本场景取4096 tokens简化分块逻辑 |
| 分块重叠长度 | 50–100 tokens | 减少分块之间的语义割裂，保证相邻片段的上下文衔接自然 |
| 单次搜索上限 | 按引用预算测算的合理区间 | 结合`quoteMaxToken`与单段token数确定，避免召回内容超出预算 |
| 最低相关度 | 预设阈值区间 | 过滤低相关性的召回内容，优化引用内容的整体质量 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮引用最多可容纳23至62段；若将每段调整至向量模型允许的4096 tokens上限，仅可容纳约2段。每段越长，单段语义越完整，一轮能放下的段数越少；每段越短，段数越多，单段上下文越碎。同时，更换向量模型后，已创建的知识库索引需要重建，因为向量维度与向量模型绑定，旧索引无法适配新模型的向量计算逻辑，会导致检索功能异常。

## 容易做错的三处
- 界面显示引用内容超出预算，召回片段被强制截断。原因是未按当前对话模型的`quoteMaxToken`设置调整单次搜索上限或分块长度，导致累计token超出预算。
- 检索结果出现大量语义重复的片段。原因是分块重叠长度设置过高，导致相邻分块的内容重叠范围过大。
- 更换向量模型后无法正常检索内容。原因是未重建已有的知识库索引，旧索引的向量维度与新选用的向量模型不匹配。

## 怎么确认配好了
- 查看向量模型配置面板，确认`maxToken`与`defaultToken`的取值与当前选用的Doubao向量模型参数一致。
- 执行分块测试操作，查看生成的文档分块长度是否符合预设的`chunkSize`设置。
- 模拟对话场景，提交测试问题并验证召回内容的总token数未超出`quoteMaxToken`的预算范围。
- 更换向量模型后，执行索引重建操作，确认检索功能恢复正常。
