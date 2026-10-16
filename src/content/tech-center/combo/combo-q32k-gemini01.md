---
title: 引用预算 1.2 万–3.2 万的对话模型配 gemini-embedding-2 的分段与引用口径
slug: /zh/combo/combo-q32k-gemini01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "`quoteMaxToken`是对话模型允许的单次对话中引入的外部参考内容的总token预算，限定了参考内容的总token上限。本档模型的`quoteMaxToken`区间为12000至32000 tokens，能够覆盖多数长文档问答、多段落引用的知识库应用场景，无需频繁截断参考内容，支持较为完整地"
language: zh
axis_model_tier: "引用预算 1.2 万–3.2 万"
covered_models: "Baichuan4、Baichuan4-Turbo、Baichuan4-Air、Baichuan3-Turbo、Baichuan-M3、Baichuan-M3-Plus、Baichuan2-Turbo、glm-4v-plus、ernie-4.5-turbo-32k、ernie-4.5-turbo-vl-32k、hunyuan-large、hunyuan-pro、hunyuan-standard、hunyuan-turbo、hunyuan-turbos-latest、hunyuan-t1-latest、internlm2-pro-chat、internlm3-8b-instruct、mistral-small-latest、moonshot-v1-32k、moonshot-v1-32k-vision-preview、qwen3-vl-flash、qwen3-vl-plus、qwen3-1.7b、qwen3-0.6b、Qwen/Qwen2-VL-72B-Instruct、deepseek-ai/DeepSeek-V2.5、lite、max-32k、step-1o-turbo-vision、step-1-32k、step-1o-vision-32k、step-1v-32k、yi-lightning、yi-vision-v2"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 1.2 万–3.2 万的对话模型配 gemini-embedding-2 的分段与引用口径

## 这一档模型的参数意味着什么
`quoteMaxToken`是对话模型允许的单次对话中引入的外部参考内容的总token预算，限定了参考内容的总token上限。本档模型的`quoteMaxToken`区间为12000至32000 tokens，能够覆盖多数长文档问答、多段落引用的知识库应用场景，无需频繁截断参考内容，支持较为完整地引入多段参考文本，适配需要较长上下文的对话需求，提升回答的准确性与完整性。

## 配 Gemini 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 tokens | 匹配gemini-embedding-2登记的默认每段长度，无需额外调整即可适配平台默认配置 |
| `maxToken` | 8192 tokens | 匹配gemini-embedding-2允许的单段最大token上限，充分利用模型的文本编码能力 |
| `quoteMaxToken` | 12000-32000 tokens | 匹配当前对话模型档的引用预算区间，适配对话模型的token限制 |
| `chunkSize` | 512-8192 tokens | 匹配向量模型的单段最大token上限，可根据业务需求灵活调整 |
| 分块重叠长度 | 分块长度的10%-20% | 保留段落间的语义连贯性，避免参考内容的语义断裂 |
| 单次搜索上限 | 与引用预算匹配的合理值 | 避免单次召回的段落总token不超过对话模型的`quoteMaxToken`预算 |

## 这两者互相约束的地方
当以默认512 tokens分段时，一轮引用最多可放下23至62段；若将每段调整至向量模型允许的8192 tokens上限，则仅可放下1段起。每段长度越长，单段承载的语义越完整，一轮可容纳的段落数量越少；每段长度越短，一轮可容纳的段落数量越多，但单段上下文越碎片化。更换向量模型后，已建立的知识库索引需要重建，因为向量维度与向量模型绑定，不同模型的向量表示存在差异，无法直接复用原有索引。

## 容易做错的三处
- 界面显示引用内容被意外截断，原因是单次引用的总token超过了对话模型的`quoteMaxToken`预算，超出了模型的引用限制。
- 检索召回的段落语义出现断裂，原因是分块重叠长度设置不合理，导致段落间的语义衔接缺失。
- 更换向量模型后未重建索引，原因是向量模型的向量维度与原有索引不匹配，无法生成正确的向量表示。

## 怎么确认配好了
- 进入知识库的配置页面，检查引用预算参数，确认其设置在12000至32000 tokens区间内。
- 查看向量模型的绑定列表，确认已选择gemini-embedding-2。
- 发起一次测试检索，查看返回的引用内容未被意外截断。
- 检查分块长度的设置，确认其在向量模型允许的范围内。
