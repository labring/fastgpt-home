---
title: FastGPT 支持的模型清单（319 个模型 · v1.1.3）
slug: /zh/reference/model-support-reference
page_type: 基准数据页
source: https://github.com/labring/fastgpt-plugin/tree/v1.1.3/packages/infrastructure/src/static-data/models/provider
delivery_source_type: 开源仓库模型定义
source_type: 官方文档
meta_title: FastGPT 支持的模型清单（319 个模型 · v1.1.3）｜FastGPT 技术中心
schema_type: TechArticle
date_published: 2026-09-28
date_modified: 2026-09-28
source_file: 基准数据页-第2批/中文-fastgpt.cn/reference/model-support-reference.md
source_sha256: e3ba76d504242ee2e7411ea5fa9642474fdcd6099f14e2d4f23422a1d3930184
source_verified: 2026-09-14
publication_batch: W9
delivery_note: 清单取自 `fastgpt-plugin` v1.1.3 的模型定义文件，核验日 2026-09-14。
meta_description: 查阅 fastgpt-plugin v1.1.3 的 319 条模型定义，按供应商与类型识别接入范围，并核对凭据、渠道配置和实际调用能力。
---

# FastGPT 支持的模型清单（319 个模型 · v1.1.3）

本页把 `fastgpt-plugin` v1.1.3 中定义的 319 个模型按类型逐条列出，给出提供商、模型标识、上下文长度、单次最大输出，以及是否支持图片输入、工具调用与推理过程。接入模型前可用它确认某个模型属于哪一类、定义是否声明支持原生工具调用；配置报错时可用模型标识核对填写的取值。

## 各列的含义

| 列 | 含义 |
| --- | --- |
| 提供商 | 模型定义所在的提供商目录名，与界面中的渠道分组对应 |
| 模型标识 | 定义中的 `model` 字段，配置模型时填写的就是这个值 |
| 上下文长度 | 定义中的 `maxContext`，单位为 token |
| 单次最大输出 | 定义中的 `maxTokens`，单位为 token |
| 图片输入 | 定义中的 `vision`，取值为是表示该模型可接收图片输入 |
| 工具调用 | 定义中的 `toolChoice` 标记，表示模型是否声明支持原生工具调用；实际调用模式由工作流节点与模型配置决定 |
| 推理过程 | `reasoning` 标记表示定义声明支持推理过程；实际返回受模型服务与请求配置影响 |
| 破折号 | 表示定义中没有这个字段，不代表取值为零 |

## 使用这张清单之前要知道的三件事

**1. 模型数量与提供商数量不是一个量。** 定义目录共 34 个提供商，其中 10 个目录内没有模型条目（FishAudio、HuggingFace、Meta、Moka、Ollama、OpenRouter、Other、PPIO、ai360、novita），实际带模型条目的提供商是 24 家。按目录数估算可选模型数会高估。

**2. 五类模型的数量差距很大。** 对话模型 268 个；向量模型 21 个；语音合成模型 16 个；重排模型 8 个；语音识别模型 6 个。对话模型占了绝大多数，向量与重排模型的可选范围要小得多，做知识库选型时这一层的余地比对话模型小。

**3. 这份清单随插件版本走。** 本页对应 `fastgpt-plugin` v1.1.3，不同版本的模型条目会增减。部署实例中实际可选的模型以该实例加载的插件版本为准，可在模型配置界面直接查看。

## 提供商与模型数量

| 提供商 | 模型数 |
| --- | --- |
| Qwen | 42 |
| OpenAI | 38 |
| ChatGLM | 28 |
| MiniMax | 17 |
| StepFun | 17 |
| Ernie | 16 |
| Claude | 15 |
| Gemini | 15 |
| Hunyuan | 15 |
| AntLing | 14 |
| Doubao | 14 |
| Groq | 11 |
| Jina | 11 |
| Moonshot | 11 |
| MistralAI | 10 |
| Siliconflow | 9 |
| Baichuan | 8 |
| Grok | 7 |
| SparkDesk | 7 |
| DeepSeek | 5 |
| AliCloud | 3 |
| BAAI | 2 |
| InternLM | 2 |
| Yi | 2 |

## 对话模型（268 个）

| 提供商 | 模型标识 | 上下文长度 | 单次最大输出 | 图片输入 | 工具调用 | 推理过程 |
| --- | --- | --- | --- | --- | --- | --- |
| AntLing | `Ling-1T` | 128,000 | 16,000 | 否 | 是 | 否 |
| AntLing | `Ling-2.6-1T` | 256,000 | 16,000 | 否 | 是 | 否 |
| AntLing | `Ling-2.6-flash` | 256,000 | 16,000 | 否 | 是 | 否 |
| AntLing | `Ling-3.0-flash` | 256,000 | 16,000 | 否 | 是 | 是 |
| AntLing | `Ling-3.0-flash-VL` | 256,000 | 102,400 | 是 | 是 | 否 |
| AntLing | `Ling-3.0-tiny` | 256,000 | 32,000 | 否 | 是 | 是 |
| AntLing | `Ling-flash-2.0` | 128,000 | 16,000 | 否 | 是 | 否 |
| AntLing | `Ling-mini-2.0` | 64,000 | 8,000 | 否 | 是 | 否 |
| AntLing | `Ming-flash-omni` | 128,000 | 16,000 | 是 | 是 | 否 |
| AntLing | `Ming-lite-omni` | 64,000 | 8,000 | 是 | 否 | 否 |
| AntLing | `Ring-1T` | 128,000 | 16,000 | 否 | 否 | 是 |
| AntLing | `Ring-2.6-1T` | 256,000 | 16,000 | 否 | 是 | 是 |
| AntLing | `Ring-flash-2.0` | 128,000 | 16,000 | 否 | 否 | 是 |
| AntLing | `Ring-mini-2.0` | 64,000 | 8,000 | 否 | 否 | 是 |
| Baichuan | `Baichuan-M3` | 32,000 | 5,000 | 否 | 否 | 是 |
| Baichuan | `Baichuan-M3-Plus` | 32,000 | 5,000 | 否 | 否 | 否 |
| Baichuan | `Baichuan2-Turbo` | 32,000 | 2,000 | 否 | 否 | 否 |
| Baichuan | `Baichuan3-Turbo` | 32,000 | 4,000 | 否 | 是 | 否 |
| Baichuan | `Baichuan3-Turbo-128k` | 128,000 | 4,000 | 否 | 是 | 否 |
| Baichuan | `Baichuan4` | 32,000 | 4,000 | 否 | 是 | 否 |
| Baichuan | `Baichuan4-Air` | 32,000 | 4,000 | 否 | 是 | 否 |
| Baichuan | `Baichuan4-Turbo` | 32,000 | 4,000 | 否 | 是 | 否 |
| ChatGLM | `glm-4-air` | 128,000 | 16,000 | 否 | 是 | 否 |
| ChatGLM | `glm-4-flash` | 128,000 | 16,000 | 否 | 是 | 否 |
| ChatGLM | `glm-4-long` | 1,000,000 | 4,000 | 否 | 否 | 否 |
| ChatGLM | `glm-4-plus` | 128,000 | 4,000 | 否 | 是 | 否 |
| ChatGLM | `glm-4.1v-thinking-flash` | 64,000 | 16,000 | 是 | 否 | 是 |
| ChatGLM | `glm-4.1v-thinking-flashx` | 64,000 | 16,000 | 是 | 否 | 是 |
| ChatGLM | `glm-4.5` | 128,000 | 96,000 | 否 | 是 | 是 |
| ChatGLM | `glm-4.5-air` | 128,000 | 96,000 | 否 | 是 | 是 |
| ChatGLM | `glm-4.5-airx` | 128,000 | 96,000 | 否 | 是 | 是 |
| ChatGLM | `glm-4.5-flash` | 128,000 | 96,000 | 否 | 是 | 是 |
| ChatGLM | `glm-4.5-x` | 128,000 | 96,000 | 否 | 是 | 是 |
| ChatGLM | `glm-4.6` | 200,000 | 128,000 | 否 | 是 | 是 |
| ChatGLM | `glm-4.6v` | 128,000 | 32,000 | 是 | 是 | 是 |
| ChatGLM | `glm-4.6v-flash` | 128,000 | 32,000 | 是 | 是 | 是 |
| ChatGLM | `glm-4.6v-flashx` | 128,000 | 16,000 | 是 | 是 | 是 |
| ChatGLM | `glm-4.7` | 200,000 | 128,000 | 否 | 是 | 是 |
| ChatGLM | `glm-4.7-flash` | 200,000 | 128,000 | 否 | 是 | 是 |
| ChatGLM | `glm-4.7-flashx` | 200,000 | 128,000 | 否 | 是 | 是 |
| ChatGLM | `glm-4v-flash` | 8,000 | 1,000 | 是 | 否 | 否 |
| ChatGLM | `glm-4v-plus` | 16,000 | 4,000 | 是 | 否 | 否 |
| ChatGLM | `glm-5` | 200,000 | 128,000 | 否 | 是 | 是 |
| ChatGLM | `glm-5-turbo` | 200,000 | 128,000 | 否 | 是 | 是 |
| ChatGLM | `glm-5.1` | 200,000 | 128,000 | 否 | 是 | 是 |
| ChatGLM | `glm-5.2` | 1,000,000 | 128,000 | 否 | 是 | 是 |
| ChatGLM | `glm-5.3` | 1,000,000 | 128,000 | 否 | 是 | 是 |
| ChatGLM | `glm-5.3-flash` | 1,000,000 | 128,000 | 是 | 是 | 是 |
| ChatGLM | `glm-5v-turbo` | 200,000 | 128,000 | 是 | 是 | 是 |
| Claude | `claude-fable-5` | 1,000,000 | 128,000 | 是 | 是 | 是 |
| Claude | `claude-fable-5-1` | 1,000,000 | 128,000 | 是 | 是 | 是 |
| Claude | `claude-haiku-4-5` | 200,000 | 64,000 | 是 | 是 | 是 |
| Claude | `claude-haiku-4-5-20251001` | 200,000 | 64,000 | 是 | 是 | 是 |
| Claude | `claude-opus-4-1-20250805` | 200,000 | 32,000 | 是 | 是 | 否 |
| Claude | `claude-opus-4-5-20251101` | 200,000 | 64,000 | 是 | 是 | 是 |
| Claude | `claude-opus-4-6` | 1,000,000 | 128,000 | 是 | 是 | 是 |
| Claude | `claude-opus-4-6-20260205` | 1,000,000 | 128,000 | 是 | 是 | 是 |
| Claude | `claude-opus-4-7` | 1,000,000 | 128,000 | 是 | 是 | 是 |
| Claude | `claude-opus-4-8` | 1,000,000 | 128,000 | 是 | 是 | 是 |
| Claude | `claude-opus-5` | 1,000,000 | 128,000 | 是 | 是 | 是 |
| Claude | `claude-sonnet-4-5-20250929` | 1,000,000 | 64,000 | 是 | 是 | 是 |
| Claude | `claude-sonnet-4-6` | 1,000,000 | 64,000 | 是 | 是 | 是 |
| Claude | `claude-sonnet-4-6-20260217` | 1,000,000 | 64,000 | 是 | 是 | 是 |
| Claude | `claude-sonnet-5` | 1,000,000 | 128,000 | 是 | 是 | 是 |
| DeepSeek | `deepseek-chat` | 64,000 | 8,000 | 否 | 是 | 否 |
| DeepSeek | `deepseek-flash` | 1,000,000 | 384,000 | 是 | 是 | 是 |
| DeepSeek | `deepseek-reasoner` | 64,000 | 8,000 | 否 | 否 | 是 |
| DeepSeek | `deepseek-v4-flash` | 1,000,000 | 384,000 | 否 | 是 | 是 |
| DeepSeek | `deepseek-v4-pro` | 1,000,000 | 384,000 | 否 | 是 | 是 |
| Doubao | `doubao-seed-1-8-251228` | 256,000 | 32,000 | 是 | 是 | 是 |
| Doubao | `doubao-seed-2-0-lite-260215` | 256,000 | 128,000 | 是 | 是 | 是 |
| Doubao | `doubao-seed-2-0-lite-260428` | 256,000 | 128,000 | 是 | 是 | 是 |
| Doubao | `doubao-seed-2-0-mini-260215` | 256,000 | 128,000 | 是 | 是 | 是 |
| Doubao | `doubao-seed-2-0-mini-260428` | 256,000 | 128,000 | 是 | 是 | 是 |
| Doubao | `doubao-seed-2-0-pro-260215` | 256,000 | 128,000 | 是 | 是 | 是 |
| Doubao | `doubao-seed-2-1-pro-260628` | 256,000 | 256,000 | 是 | 是 | 是 |
| Doubao | `doubao-seed-2-1-turbo-260628` | 256,000 | 256,000 | 是 | 是 | 是 |
| Doubao | `doubao-seed-evolving` | 1,024,000 | 256,000 | 是 | 是 | 是 |
| Ernie | `ERNIE-4.0-8K` | 8,000 | 2,048 | 否 | 否 | 否 |
| Ernie | `ERNIE-4.0-Turbo-8K` | 8,000 | 2,048 | 否 | 否 | 否 |
| Ernie | `ERNIE-Lite-8K` | 8,000 | 2,048 | 否 | 否 | 否 |
| Ernie | `ERNIE-Speed-128K` | 128,000 | 4,096 | 否 | 否 | 否 |
| Ernie | `ernie-4.5-turbo-128k` | 128,000 | 12,288 | 否 | 否 | 否 |
| Ernie | `ernie-4.5-turbo-32k` | 32,000 | 12,288 | 否 | 否 | 否 |
| Ernie | `ernie-4.5-turbo-vl` | 128,000 | 16,384 | 是 | 否 | 否 |
| Ernie | `ernie-4.5-turbo-vl-32k` | 32,000 | 12,288 | 是 | 否 | 否 |
| Ernie | `ernie-5.0` | 128,000 | 65,536 | 是 | 是 | 是 |
| Ernie | `ernie-5.0-thinking-latest` | 128,000 | 65,536 | 是 | 是 | 是 |
| Ernie | `ernie-5.0-thinking-preview` | 128,000 | 65,536 | 是 | 是 | 是 |
| Ernie | `ernie-5.1` | 128,000 | 65,536 | 否 | 是 | 是 |
| Ernie | `ernie-x1.1` | 64,000 | 65,536 | 否 | 是 | 是 |
| Ernie | `ernie-x1.1-preview` | 64,000 | 65,536 | 否 | 是 | 是 |
| Gemini | `gemini-2.5-flash` | 1,000,000 | 63,000 | 是 | 是 | 否 |
| Gemini | `gemini-2.5-flash-lite` | 1,000,000 | 63,000 | 是 | 是 | 否 |
| Gemini | `gemini-2.5-pro` | 1,000,000 | 63,000 | 是 | 是 | 否 |
| Gemini | `gemini-3-flash` | 1,024,000 | 64,000 | 是 | 是 | 是 |
| Gemini | `gemini-3-flash-preview` | 1,024,000 | 64,000 | 是 | 是 | 是 |
| Gemini | `gemini-3.1-flash-lite` | 1,048,576 | 65,536 | 是 | 是 | 是 |
| Gemini | `gemini-3.1-pro` | 1,000,000 | 64,000 | 是 | 是 | 是 |
| Gemini | `gemini-3.1-pro-preview` | 1,000,000 | 64,000 | 是 | 是 | 是 |
| Gemini | `gemini-3.1-pro-preview-customtools` | 1,000,000 | 64,000 | 是 | 是 | 是 |
| Gemini | `gemini-3.5-flash` | 1,048,576 | 65,536 | 是 | 是 | 是 |
| Gemini | `gemini-3.5-flash-lite` | 1,048,576 | 65,536 | 是 | 是 | 是 |
| Gemini | `gemini-3.6-flash` | 1,048,576 | 65,536 | 是 | 是 | 是 |
| Gemini | `gemini-3.7-flash` | 1,048,576 | 65,536 | 是 | 是 | 是 |
| Gemini | `gemini-3.8-flash` | 1,048,576 | 65,536 | 是 | 是 | 是 |
| Grok | `grok-4.20-0309-non-reasoning` | 1,000,000 | 8,000 | 是 | 是 | 否 |
| Grok | `grok-4.20-0309-reasoning` | 1,000,000 | 8,000 | 是 | 是 | 是 |
| Grok | `grok-4.20-multi-agent-0309` | 1,000,000 | 8,000 | 是 | 是 | 是 |
| Grok | `grok-4.3` | 1,000,000 | 8,000 | 是 | 是 | 是 |
| Grok | `grok-4.5` | 500,000 | 8,000 | 是 | 是 | 是 |
| Grok | `grok-4.6` | 500,000 | 8,000 | 是 | 是 | 是 |
| Grok | `grok-build-0.1` | 256,000 | 8,000 | 是 | 是 | 是 |
| Groq | `llama-3.1-8b-instant` | 131,072 | 131,072 | 否 | 是 | 否 |
| Groq | `llama-3.3-70b-versatile` | 131,072 | 32,768 | 否 | 是 | 否 |
| Groq | `meta-llama/llama-4-scout-17b-16e-instruct` | 131,072 | 8,192 | 是 | 是 | 否 |
| Groq | `minimaxai/minimax-m2.7` | 196,608 | 131,072 | 否 | 是 | 是 |
| Groq | `openai/gpt-oss-120b` | 131,072 | 65,536 | 否 | 是 | 是 |
| Groq | `openai/gpt-oss-20b` | 131,072 | 65,536 | 否 | 是 | 是 |
| Groq | `qwen/qwen3-32b` | 131,072 | 40,960 | 否 | 是 | 是 |
| Groq | `qwen/qwen3.6-27b` | 131,072 | 16,384 | 是 | 是 | 是 |
| Groq | `qwen/qwen3.8-27b` | 131,042 | 16,384 | 是 | 是 | 是 |
| Hunyuan | `hunyuan-2.0-instruct-20251111` | 128,000 | 16,000 | 否 | 否 | 是 |
| Hunyuan | `hunyuan-2.0-thinking-20251109` | 128,000 | 64,000 | 否 | 否 | 是 |
| Hunyuan | `hunyuan-a13b` | 224,000 | 32,000 | 否 | 否 | 是 |
| Hunyuan | `hunyuan-large` | 28,000 | 4,000 | 否 | 否 | 否 |
| Hunyuan | `hunyuan-lite` | 250,000 | 6,000 | 否 | 否 | 否 |
| Hunyuan | `hunyuan-pro` | 28,000 | 4,000 | 否 | 否 | 否 |
| Hunyuan | `hunyuan-standard` | 32,000 | 2,000 | 否 | 否 | 否 |
| Hunyuan | `hunyuan-t1-latest` | 32,000 | 64,000 | 否 | 否 | 是 |
| Hunyuan | `hunyuan-turbo` | 28,000 | 4,000 | 否 | 否 | 否 |
| Hunyuan | `hunyuan-turbo-vision` | 6,000 | 2,000 | 是 | 否 | 否 |
| Hunyuan | `hunyuan-turbos-latest` | 32,000 | 16,000 | 否 | 否 | 否 |
| Hunyuan | `hunyuan-vision` | 6,000 | 2,000 | 是 | 否 | 否 |
| Hunyuan | `hy3` | 256,000 | 128,000 | 否 | 是 | 是 |
| Hunyuan | `hy4-preview` | 1,024,000 | 64,000 | 否 | 是 | 是 |
| InternLM | `internlm2-pro-chat` | 32,000 | 8,000 | 否 | 是 | 否 |
| InternLM | `internlm3-8b-instruct` | 32,000 | 8,000 | 否 | 是 | 否 |
| MiniMax | `M2-her` | 64,000 | 2,048 | 否 | 否 | 否 |
| MiniMax | `MiniMax-M1` | 1,000,000 | 40,000 | 否 | 是 | 否 |
| MiniMax | `MiniMax-M2` | 196,000 | 100,000 | 否 | 是 | 是 |
| MiniMax | `MiniMax-M2.1` | 204,000 | 100,000 | 否 | 是 | 是 |
| MiniMax | `MiniMax-M2.1-lightning` | 204,000 | 100,000 | 否 | 是 | 是 |
| MiniMax | `MiniMax-M2.5` | 204,000 | 100,000 | 否 | 是 | 是 |
| MiniMax | `MiniMax-M2.5-highspeed` | 204,000 | 100,000 | 否 | 是 | 是 |
| MiniMax | `MiniMax-M2.7` | 204,000 | 100,000 | 否 | 是 | 是 |
| MiniMax | `MiniMax-M2.7-highspeed` | 204,000 | 100,000 | 否 | 是 | 是 |
| MiniMax | `MiniMax-M3` | 1,000,000 | 100,000 | 是 | 是 | 是 |
| MiniMax | `MiniMax-Text-01` | 1,000,000 | 40,000 | 否 | 否 | 否 |
| MistralAI | `ministral-14b-2512` | 131,000 | 8,000 | 是 | 是 | 否 |
| MistralAI | `ministral-3b-2512` | 131,000 | 8,000 | 是 | 是 | 否 |
| MistralAI | `ministral-3b-latest` | 130,000 | 8,000 | 否 | 是 | 否 |
| MistralAI | `ministral-8b-2512` | 131,000 | 8,000 | 是 | 是 | 否 |
| MistralAI | `ministral-8b-latest` | 130,000 | 8,000 | 否 | 是 | 否 |
| MistralAI | `mistral-large-2512` | 256,000 | 8,000 | 是 | 是 | 否 |
| MistralAI | `mistral-large-latest` | 130,000 | 8,000 | 否 | 是 | 否 |
| MistralAI | `mistral-medium-3-5` | 256,000 | 32,000 | 是 | 是 | 是 |
| MistralAI | `mistral-small-2603` | 256,000 | 32,000 | 是 | 是 | 是 |
| MistralAI | `mistral-small-latest` | 32,000 | 4,000 | 否 | 是 | 否 |
| Moonshot | `kimi-k2.5` | 262,144 | 32,000 | 是 | 是 | 是 |
| Moonshot | `kimi-k2.6` | 262,144 | 32,000 | 是 | 是 | 是 |
| Moonshot | `kimi-k2.7-code` | 262,144 | 32,768 | 是 | 是 | 是 |
| Moonshot | `kimi-k2.7-code-highspeed` | 262,144 | 32,768 | 是 | 是 | 是 |
| Moonshot | `kimi-k3` | 1,048,576 | 1,048,576 | 是 | 是 | 是 |
| Moonshot | `moonshot-v1-128k` | 128,000 | 4,000 | 否 | 是 | 否 |
| Moonshot | `moonshot-v1-128k-vision-preview` | 128,000 | 4,000 | 是 | 是 | 否 |
| Moonshot | `moonshot-v1-32k` | 32,000 | 4,000 | 否 | 是 | 否 |
| Moonshot | `moonshot-v1-32k-vision-preview` | 32,000 | 4,000 | 是 | 是 | 否 |
| Moonshot | `moonshot-v1-8k` | 8,000 | 4,000 | 否 | 是 | 否 |
| Moonshot | `moonshot-v1-8k-vision-preview` | 8,000 | 4,000 | 是 | 是 | 否 |
| OpenAI | `gpt-4.1` | 1,000,000 | 32,000 | 是 | 是 | 否 |
| OpenAI | `gpt-4.1-mini` | 1,000,000 | 32,000 | 是 | 是 | 否 |
| OpenAI | `gpt-4.1-nano` | 1,000,000 | 32,000 | 是 | 是 | 否 |
| OpenAI | `gpt-4o` | 128,000 | 4,000 | 是 | 是 | 否 |
| OpenAI | `gpt-4o-mini` | 128,000 | 16,000 | 是 | 是 | 否 |
| OpenAI | `gpt-5` | 400,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5-chat-latest` | 128,000 | 16,384 | 是 | 是 | 否 |
| OpenAI | `gpt-5-mini` | 400,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5-nano` | 400,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5-pro` | 400,000 | 272,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5.1` | 400,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5.1-chat-latest` | 128,000 | 16,384 | 是 | 是 | 否 |
| OpenAI | `gpt-5.2` | 400,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5.2-chat-latest` | 128,000 | 16,384 | 是 | 是 | 否 |
| OpenAI | `gpt-5.2-pro` | 400,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5.3-codex` | 400,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5.4` | 1,050,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5.4-mini` | 400,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5.4-nano` | 400,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5.4-pro` | 1,050,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5.5` | 1,050,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5.5-pro` | 1,050,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5.6` | 1,050,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5.6-luna` | 1,050,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5.6-sol` | 1,050,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-5.6-terra` | 1,050,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-6-astra` | 1,050,000 | 128,000 | 是 | 是 | 是 |
| OpenAI | `gpt-oss-120b` | 131,000 | 131,000 | 否 | 是 | 是 |
| OpenAI | `gpt-oss-20b` | 131,000 | 131,000 | 否 | 是 | 是 |
| OpenAI | `o3` | 200,000 | 100,000 | 是 | 是 | 是 |
| OpenAI | `o3-mini` | 200,000 | 100,000 | 否 | 是 | 是 |
| OpenAI | `o4-mini` | 200,000 | 100,000 | 是 | 是 | 是 |
| Qwen | `qwen-coder-turbo` | 128,000 | 8,000 | 否 | 否 | 否 |
| Qwen | `qwen-flash` | 1,000,000 | 32,000 | 否 | 是 | 否 |
| Qwen | `qwen-long` | 10,000,000 | 6,000 | 否 | 否 | 否 |
| Qwen | `qwen-max` | 128,000 | 8,000 | 否 | 是 | 否 |
| Qwen | `qwen-plus` | 1,000,000 | 32,000 | 否 | 是 | 否 |
| Qwen | `qwen-turbo` | 1,000,000 | 16,000 | 否 | 是 | 否 |
| Qwen | `qwen-vl-max` | 128,000 | 8,000 | 是 | 否 | 否 |
| Qwen | `qwen-vl-plus` | 128,000 | 8,000 | 是 | 否 | 否 |
| Qwen | `qwen2.5-14b-instruct` | 128,000 | 8,000 | 否 | 是 | 否 |
| Qwen | `qwen2.5-32b-instruct` | 128,000 | 8,000 | 否 | 是 | 否 |
| Qwen | `qwen2.5-72b-instruct` | 128,000 | 8,000 | 否 | 是 | 否 |
| Qwen | `qwen2.5-7b-instruct` | 128,000 | 8,000 | 否 | 是 | 否 |
| Qwen | `qwen3-0.6b` | 32,000 | 8,000 | 否 | 是 | 是 |
| Qwen | `qwen3-1.7b` | 32,000 | 8,000 | 否 | 是 | 是 |
| Qwen | `qwen3-14b` | 128,000 | 8,000 | 否 | 是 | 是 |
| Qwen | `qwen3-235b-a22b` | 128,000 | 8,000 | 否 | 是 | 是 |
| Qwen | `qwen3-30b-a3b` | 128,000 | 8,000 | 否 | 是 | 是 |
| Qwen | `qwen3-32b` | 128,000 | 8,000 | 否 | 是 | 是 |
| Qwen | `qwen3-4b` | 128,000 | 8,000 | 否 | 是 | 是 |
| Qwen | `qwen3-8b` | 128,000 | 8,000 | 否 | 是 | 是 |
| Qwen | `qwen3-coder-flash` | 1,024,000 | 64,000 | 否 | 是 | 是 |
| Qwen | `qwen3-coder-next` | 256,000 | 64,000 | 否 | 是 | 是 |
| Qwen | `qwen3-coder-plus` | 1,024,000 | 64,000 | 否 | 是 | 是 |
| Qwen | `qwen3-max` | 256,000 | 64,000 | 否 | 是 | 否 |
| Qwen | `qwen3-vl-flash` | 25,000 | 8,000 | 是 | 是 | 否 |
| Qwen | `qwen3-vl-plus` | 25,000 | 8,000 | 是 | 是 | 否 |
| Qwen | `qwen3.5-flash` | 1,000,000 | 64,000 | 是 | 是 | 是 |
| Qwen | `qwen3.5-plus` | 1,000,000 | 64,000 | 是 | 是 | 是 |
| Qwen | `qwen3.6-flash` | 1,000,000 | 64,000 | 是 | 是 | 是 |
| Qwen | `qwen3.6-max-preview` | 260,000 | 64,000 | 否 | 是 | 是 |
| Qwen | `qwen3.6-plus` | 1,000,000 | 64,000 | 是 | 是 | 是 |
| Qwen | `qwen3.7-flash` | 1,000,000 | 64,000 | 是 | 是 | 是 |
| Qwen | `qwen3.7-max` | 1,000,000 | 64,000 | 是 | 是 | 是 |
| Qwen | `qwen3.7-plus` | 1,000,000 | 64,000 | 是 | 是 | 是 |
| Qwen | `qwen3.8-flash` | 1,000,000 | 64,000 | 是 | 是 | 是 |
| Qwen | `qwen3.8-max` | 1,000,000 | 64,000 | 是 | 是 | 是 |
| Qwen | `qwq-32b` | 128,000 | 8,000 | 否 | 是 | 是 |
| Qwen | `qwq-plus` | 128,000 | 8,000 | 否 | 是 | 是 |
| Siliconflow | `Qwen/Qwen2-VL-72B-Instruct` | 32,000 | 4,000 | 是 | 否 | 否 |
| Siliconflow | `Qwen/Qwen2.5-72B-Instruct` | 128,000 | 8,000 | 否 | 是 | 否 |
| Siliconflow | `deepseek-ai/DeepSeek-V2.5` | 32,000 | 4,000 | 是 | 是 | 否 |
| SparkDesk | `4.0Ultra` | 8,000 | 8,000 | 否 | 否 | 否 |
| SparkDesk | `generalv3` | 8,000 | 8,000 | 否 | 否 | 否 |
| SparkDesk | `generalv3.5` | 8,000 | 8,000 | 否 | 否 | 否 |
| SparkDesk | `lite` | 32,000 | 4,000 | 否 | 否 | 否 |
| SparkDesk | `max-32k` | 32,000 | 8,000 | 否 | 否 | 否 |
| SparkDesk | `pro-128k` | 128,000 | 4,000 | 否 | 否 | 否 |
| SparkDesk | `spark-x` | 262,144 | 262,144 | 否 | 是 | 是 |
| StepFun | `step-1-128k` | 128,000 | 8,000 | 否 | 否 | 否 |
| StepFun | `step-1-256k` | 256,000 | 8,000 | 否 | 否 | 否 |
| StepFun | `step-1-32k` | 32,000 | 8,000 | 否 | 否 | 否 |
| StepFun | `step-1-8k` | 8,000 | 8,000 | 否 | 否 | 否 |
| StepFun | `step-1-flash` | 8,000 | 4,000 | 否 | 否 | 否 |
| StepFun | `step-1o-turbo-vision` | 32,000 | 8,000 | 是 | 是 | 否 |
| StepFun | `step-1o-vision-32k` | 32,000 | 8,000 | 是 | 否 | 否 |
| StepFun | `step-1v-32k` | 32,000 | 8,000 | 是 | 否 | 否 |
| StepFun | `step-1v-8k` | 8,000 | 8,000 | 是 | 否 | 否 |
| StepFun | `step-2-16k` | 16,000 | 4,000 | 否 | 否 | 否 |
| StepFun | `step-2-mini` | 8,000 | 4,000 | 否 | 否 | 否 |
| StepFun | `step-3` | 64,000 | 8,000 | 是 | 是 | 是 |
| StepFun | `step-3.5-flash` | 256,000 | 8,000 | 否 | 是 | 是 |
| StepFun | `step-3.5-flash-2603` | 256,000 | 8,000 | 否 | 是 | 是 |
| StepFun | `step-3.7-flash` | 256,000 | 8,000 | 是 | 是 | 是 |
| StepFun | `step-r1-v-mini` | 100,000 | 8,000 | 是 | 是 | 是 |
| Yi | `yi-lightning` | 16,000 | 4,000 | 否 | 否 | 否 |
| Yi | `yi-vision-v2` | 16,000 | 4,000 | 是 | 否 | 否 |

## 向量模型（21 个）

| 提供商 | 模型标识 |
| --- | --- |
| BAAI | `bge-m3` |
| ChatGLM | `embedding-3` |
| Doubao | `doubao-embedding-large-text-250515` |
| Doubao | `doubao-embedding-text-240715` |
| Ernie | `Embedding-V1` |
| Ernie | `tao-8k` |
| Gemini | `gemini-embedding-2` |
| Hunyuan | `hunyuan-embedding` |
| Jina | `jina-clip-v2` |
| Jina | `jina-embeddings-v3` |
| Jina | `jina-embeddings-v4` |
| Jina | `jina-embeddings-v5-omni-nano` |
| Jina | `jina-embeddings-v5-omni-small` |
| Jina | `jina-embeddings-v5-text-nano` |
| Jina | `jina-embeddings-v5-text-small` |
| OpenAI | `text-embedding-3-large` |
| OpenAI | `text-embedding-3-small` |
| OpenAI | `text-embedding-ada-002` |
| Qwen | `text-embedding-v3` |
| Qwen | `text-embedding-v4` |
| Siliconflow | `BAAI/bge-m3` |

## 重排模型（8 个）

| 提供商 | 模型标识 |
| --- | --- |
| BAAI | `bge-reranker-v2-m3` |
| Jina | `jina-reranker-m0` |
| Jina | `jina-reranker-v2-base-multilingual` |
| Jina | `jina-reranker-v3` |
| Jina | `jina-reranker-v3.5` |
| Qwen | `gte-rerank-v2` |
| Qwen | `qwen3-rerank` |
| Siliconflow | `BAAI/bge-reranker-v2-m3` |

## 语音合成模型（16 个）

| 提供商 | 模型标识 |
| --- | --- |
| AliCloud | `sambert-v1` |
| Doubao | `doubao-tts` |
| Doubao | `seed-tts-2.0-expressive` |
| Doubao | `seed-tts-2.0-standard` |
| MiniMax | `speech-01-hd` |
| MiniMax | `speech-01-turbo` |
| MiniMax | `speech-02-hd` |
| MiniMax | `speech-02-turbo` |
| MiniMax | `speech-2.8-hd` |
| MiniMax | `speech-2.8-turbo` |
| OpenAI | `tts-1` |
| OpenAI | `tts-1-hd` |
| Siliconflow | `FunAudioLLM/CosyVoice2-0.5B` |
| Siliconflow | `RVC-Boss/GPT-SoVITS` |
| Siliconflow | `fishaudio/fish-speech-1.5` |
| StepFun | `step-tts-mini` |

## 语音识别模型（6 个）

| 提供商 | 模型标识 |
| --- | --- |
| AliCloud | `SenseVoiceSmall` |
| AliCloud | `fun-asr` |
| Groq | `whisper-large-v3` |
| Groq | `whisper-large-v3-turbo` |
| OpenAI | `whisper-1` |
| Siliconflow | `FunAudioLLM/SenseVoiceSmall` |

## 这张清单的适用范围

清单反映的是定义文件中的登记值。以下情形需要另行确认：

- 提供商侧调整了模型的上下文长度或能力，而插件定义尚未同步
- 通过自定义渠道接入的模型，其能力由渠道配置决定，不在本清单内
- 同名模型在不同提供商下的实际行为差异，需要在部署环境中实测
