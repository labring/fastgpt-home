---
title: 引用预算 1.2 万–3.2 万的对话模型配 jina-embeddings-v5-text-nano / jina-embeddings-v3 的分段与引用口径
slug: /zh/combo/combo-q32k-jina02
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken`是对话模型可调用的引用内容总token预算，限定了一轮对话中可整合的知识库内容的总长度。这一档12000–32000 tokens的预算区间，可承载较多段落的知识库内容，适配长文档问答、多段落信息整合等场景，无需频繁压缩检索到的信息，能为对话模型提供充足的上下文支撑，提"
language: zh
axis_model_tier: "引用预算 1.2 万–3.2 万"
covered_models: "Baichuan4、Baichuan4-Turbo、Baichuan4-Air、Baichuan3-Turbo、Baichuan-M3、Baichuan-M3-Plus、Baichuan2-Turbo、glm-4v-plus、ernie-4.5-turbo-32k、ernie-4.5-turbo-vl-32k、hunyuan-large、hunyuan-pro、hunyuan-standard、hunyuan-turbo、hunyuan-turbos-latest、hunyuan-t1-latest、internlm2-pro-chat、internlm3-8b-instruct、mistral-small-latest、moonshot-v1-32k、moonshot-v1-32k-vision-preview、qwen3-vl-flash、qwen3-vl-plus、qwen3-1.7b、qwen3-0.6b、Qwen/Qwen2-VL-72B-Instruct、deepseek-ai/DeepSeek-V2.5、lite、max-32k、step-1o-turbo-vision、step-1-32k、step-1o-vision-32k、step-1v-32k、yi-lightning、yi-vision-v2"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 1.2 万–3.2 万的对话模型配 jina-embeddings-v5-text-nano / jina-embeddings-v3 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken`是对话模型可调用的引用内容总token预算，限定了一轮对话中可整合的知识库内容的总长度。这一档12000–32000 tokens的预算区间，可承载较多段落的知识库内容，适配长文档问答、多段落信息整合等场景，无需频繁压缩检索到的信息，能为对话模型提供充足的上下文支撑，提升回答的完整性与准确性。

## 配 Jina 向量模型要定哪些
| `defaultToken` | 512 | 匹配向量模型预设的默认每段长度，适配常规分块场景 |
| --- | --- | --- |
| `maxToken` | 8000 | 匹配向量模型支持的单段最大输入token上限，用于设置单段最长分块 |
| `quoteMaxToken` | 12000–32000 | 匹配当前对话模型档的引用预算区间，符合模型的上下文调用限制 |
| `chunkSize` | 512 或 8000 | 对应向量模型的默认或最大单段token，平衡语义完整性与引用段数 |
| 重叠长度 | 100–200 tokens | 避免分块割裂语义，保证相邻分块的信息衔接连贯性 |
| 单次搜索上限 | 不低于23 | 匹配默认分块时的理论最大引用段数下限，保障基础检索覆盖 |
| 最低相关度 | 自定义区间 | 根据知识库内容类型调整，过滤低相关性的检索结果 |

## 这两者互相约束的地方
这两者的约束体现在分段长度与引用预算的平衡上。按默认每段512 tokens计算，一轮引用最多可放下23–62段；若将每段调整至向量模型允许的上限8000 tokens，则仅可放下约1段。每段越长，单段承载的语义越完整，但一轮能容纳的引用段数越少；每段越短，段数越多，但单段上下文的连贯性越弱。此外，向量模型与向量维度绑定，更换向量模型后，已创建的知识库索引需要重新构建，否则会导致检索匹配出现异常。

## 容易做错的三处
- 检索返回的引用内容被意外截断，原因是未按对话模型档的预算区间设置`quoteMaxToken`，或分块长度超出单次引用的承载上限。
- 检索匹配的结果与实际需求偏差较大，原因是`chunkSize`未匹配向量模型的参数，或重叠长度设置不合理导致语义连贯性被破坏。
- 更换向量模型后无法检索到有效内容，原因是未重新构建已创建的知识库索引，新旧向量模型的向量维度不兼容。

## 怎么确认配好了
- 查看知识库集合的配置，确认`defaultToken`、`maxToken`与向量模型的登记参数匹配。
- 检查对话模型的`quoteMaxToken`设置，确认处于当前档的12000–32000 tokens区间内。
- 发起测试对话，验证引用内容未被过度截断且语义连贯。
- 更换向量模型后，确认已执行知识库索引重建操作。
