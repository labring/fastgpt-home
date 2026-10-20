---
title: 引用预算 1.2 万–3.2 万的对话模型配 jina-embeddings-v5-omni-small 的分段与引用口径
slug: /zh/combo/combo-q32k-jina03
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "quoteMaxToken指单轮对话中可注入的知识库参考内容累计token上限，本档对话模型的该参数区间为12000至32000 tokens。在知识库应用场景中，该预算覆盖了检索召回的所有参考内容，既可以支撑长文档的完整片段引用，也能适配多轮对话中多段参考内容的叠加，为复杂查询提供充足的上下文支撑"
language: zh
axis_model_tier: "引用预算 1.2 万–3.2 万"
covered_models: "Baichuan4、Baichuan4-Turbo、Baichuan4-Air、Baichuan3-Turbo、Baichuan-M3、Baichuan-M3-Plus、Baichuan2-Turbo、glm-4v-plus、ernie-4.5-turbo-32k、ernie-4.5-turbo-vl-32k、hunyuan-large、hunyuan-pro、hunyuan-standard、hunyuan-turbo、hunyuan-turbos-latest、hunyuan-t1-latest、internlm2-pro-chat、internlm3-8b-instruct、mistral-small-latest、moonshot-v1-32k、moonshot-v1-32k-vision-preview、qwen3-vl-flash、qwen3-vl-plus、qwen3-1.7b、qwen3-0.6b、Qwen/Qwen2-VL-72B-Instruct、deepseek-ai/DeepSeek-V2.5、lite、max-32k、step-1o-turbo-vision、step-1-32k、step-1o-vision-32k、step-1v-32k、yi-lightning、yi-vision-v2"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 1.2 万–3.2 万的对话模型配 jina-embeddings-v5-omni-small 的分段与引用口径

## 这一档模型的参数意味着什么
quoteMaxToken指单轮对话中可注入的知识库参考内容累计token上限，本档对话模型的该参数区间为12000至32000 tokens。在知识库应用场景中，该预算覆盖了检索召回的所有参考内容，既可以支撑长文档的完整片段引用，也能适配多轮对话中多段参考内容的叠加，为复杂查询提供充足的上下文支撑，避免因上下文截断影响回答的完整性与准确性。

## 配 Jina 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 与jina-embeddings-v5-omni-small的默认分段长度匹配，无需额外调整即可适配基础检索场景 |
| `maxToken` | 32000 | 匹配该向量模型的单段最大token上限，可充分利用模型的长文本处理能力 |
| `quoteMaxToken` | 12000至32000 | 适配本档对话模型的引用预算区间，需根据实际对话场景的上下文需求调整 |
| 分块长度 | 512至32000 | 可根据目标文档的语义完整性需求调整，短分段适合碎片化信息检索，长分段适合完整段落引用 |
| 重叠长度 | 64至128 | 避免语义内容被分块截断，保障相邻分块的上下文连贯性 |
| 单次搜索上限 | 根据引用预算动态调整 | 避免召回内容累计token超出对话模型的引用预算，保障上下文合规 |

## 这两者互相约束的地方
按默认每段512 tokens计算，一轮对话最多可容纳23至62段参考内容。当向量模型单段上限调至32000 tokens时，该长度已覆盖本档引用预算的下沿，此时单段即可占满整轮引用预算。每段越长，单段语义完整性越强，但一轮可承载的段数越少；每段越短，段数越多，但单段上下文的连贯性越弱。召回条数由检索侧设置，引用预算按token计，两者谁先触顶取决于每段的长度。此外，更换向量模型后，已生成的向量索引需重新构建，因向量维度与向量模型绑定，不同模型生成的向量无法兼容复用。

## 容易做错的三处
- 现象：检索召回的内容累计token超出对话模型预算，导致上下文被截断。原因：未根据对话模型的`quoteMaxToken`调整单次搜索上限或分块长度。
- 现象：向量检索结果无法正确关联图片内容。原因：未使用支持多模态的jina-embeddings-v5-omni-small进行索引构建，或未在检索时开启多模态匹配。
- 现象：分块后参考内容出现语义断层。原因：重叠长度设置过低，导致相邻分块的语义关联被切断。

## 怎么确认配好了
- 查看对话模型的引用预算参数，确认其处于12000至32000 tokens区间内。
- 检查向量模型的配置项，确认已选择jina-embeddings-v5-omni-small且分段参数匹配预设设置。
- 测试多模态文档检索，确认图片内容可被正确索引并关联到检索结果中。
- 模拟多轮对话场景，查看注入的参考内容未出现异常截断或格式问题。
