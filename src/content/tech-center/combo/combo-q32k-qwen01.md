---
title: 引用预算 1.2 万–3.2 万的对话模型配 text-embedding-v4 / text-embedding-v3 的分段与引用口径
slug: /zh/combo/combo-q32k-qwen01
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "quoteMaxToken是对话模型允许的上下文引用内容的总token预算，限定了单次对话中可带入的参考文档总token上限。本档包含Baichuan系列、ChatGLM/glm-4v-plus、Ernie系列等共35款对话模型，其12000至32000 tokens的区间，覆盖了多数企业级知识库的"
language: zh
axis_model_tier: "引用预算 1.2 万–3.2 万"
covered_models: "Baichuan4、Baichuan4-Turbo、Baichuan4-Air、Baichuan3-Turbo、Baichuan-M3、Baichuan-M3-Plus、Baichuan2-Turbo、glm-4v-plus、ernie-4.5-turbo-32k、ernie-4.5-turbo-vl-32k、hunyuan-large、hunyuan-pro、hunyuan-standard、hunyuan-turbo、hunyuan-turbos-latest、hunyuan-t1-latest、internlm2-pro-chat、internlm3-8b-instruct、mistral-small-latest、moonshot-v1-32k、moonshot-v1-32k-vision-preview、qwen3-vl-flash、qwen3-vl-plus、qwen3-1.7b、qwen3-0.6b、Qwen/Qwen2-VL-72B-Instruct、deepseek-ai/DeepSeek-V2.5、lite、max-32k、step-1o-turbo-vision、step-1-32k、step-1o-vision-32k、step-1v-32k、yi-lightning、yi-vision-v2"
check_day: 2026-09-28
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# 引用预算 1.2 万–3.2 万的对话模型配 text-embedding-v4 / text-embedding-v3 的分段与引用口径

## 这一档模型的参数意味着什么
quoteMaxToken是对话模型允许的上下文引用内容的总token预算，限定了单次对话中可带入的参考文档总token上限。本档包含Baichuan系列、ChatGLM/glm-4v-plus、Ernie系列等共35款对话模型，其12000至32000 tokens的区间，覆盖了多数企业级知识库的长上下文需求，能够支撑多段文档、多轮检索后的完整上下文拼接，无需频繁截断核心参考内容，适配需要全面背景知识支撑的问答、文档总结等知识库应用场景。

## 配 Qwen 向量模型要定哪些
| 配置项 | 建议取法 | 这样取的依据 |
| --- | --- | --- |
| `defaultToken` | 512 | 与Qwen text-embedding-v4/v3的默认分段参数对齐，保证分块内容与模型输入格式匹配 |
| `maxToken` | 8000 | 匹配Qwen text-embedding系列模型的单段最大输入token上限，避免分块内容被截断 |
| `quoteMaxToken` | 12000-32000 | 贴合当前对话模型档的官方参数区间，适配该档模型的上下文引用预算要求 |
| `chunkSize` | 512 至 8000 | 可根据场景灵活调整，覆盖细粒度到长段落的分块需求 |
| 单次搜索上限 | 1 至 62 条 | 匹配引用预算与分块长度的约束关系，避免单次检索内容超出token限额 |
| 最低相关度 | 自定义阈值 | 过滤低相关性内容，减少无效引用占用token预算 |

## 这两者互相约束的地方
引用预算与向量模型分块参数存在直接约束。当分块长度取默认的512 tokens时，一轮对话最多可容纳23至62段检索内容；当分块长度调至向量模型允许的上限8000 tokens时，仅可容纳1段及以上内容。分块越长，单段承载的语义越完整，但单轮可引用的段落数量越少；分块越短，单轮可引用的段落数量越多，但单段语义完整性会有所下降。若更换向量模型，由于向量维度与模型绑定，已创建的知识库索引需要重新构建，否则无法正常匹配检索。

## 容易做错的三处
- 现象：生成内容被截断或提示引用内容超出限额。原因：未根据对话模型的quoteMaxToken设置合理的单次搜索上限，导致检索返回的内容总token超出预算。
- 现象：向量检索返回空结果或内容异常。原因：更换向量模型后未重建知识库索引，新旧模型的向量维度不匹配，无法正确匹配检索请求。
- 现象：部分分块内容无法被正确向量化。原因：未将分块长度设置在向量模型maxToken允许的范围内，导致超长分块被强制截断或无法完成向量化。

## 怎么确认配好了
- 查看对话模型的配置面板，确认引用预算参数处于指定区间内。
- 检查向量模型的配置项，确认单段最大输入参数与选用的Qwen text-embedding系列模型一致。
- 发起一次包含多段参考内容的检索测试，观察引用内容的展示是否符合预期。
- 执行知识库索引的重建操作，验证更换向量模型后索引可正常完成更新。
