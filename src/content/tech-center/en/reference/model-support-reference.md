---
title: FastGPT Supported Model Reference (319 models, v1.1.3)
slug: /en/reference/model-support-reference
page_type: Reference data page
source: https://github.com/labring/fastgpt-plugin/tree/v1.1.3/packages/infrastructure/src/static-data/models/provider
delivery_source_type: Open-source repository model definitions
source_type: 官方文档
meta_title: FastGPT Supported Model Reference (319 models, v1.1.3) | FastGPT Technical Center
schema_type: TechArticle
date_published: 2026-09-28
date_modified: 2026-09-28
source_file: 基准数据页-第2批/英文-fastgpt.io/reference/model-support-reference.md
source_sha256: 1f4248d03cad38277b4792c58f5d1ac50b52f26604ccd1b61d17b5e0dec7eefb
source_verified: 2026-09-14
publication_batch: W9
delivery_note: Compiled from the model definition files in `fastgpt-plugin` v1.1.3, verified on 2026-09-14.
meta_description: Browse 319 model definitions in fastgpt-plugin v1.1.3 by provider and type, and check configuration and runtime compatibility requirements.
---

# FastGPT Supported Model Reference (319 models, v1.1.3)

This page lists every one of the 319 models defined in `fastgpt-plugin` v1.1.3, grouped by model type, with provider, model identifier, context length, maximum single response, and whether image input, tool calling and reasoning output are supported. Use it before wiring up a provider to confirm which type a model belongs to and whether its definition declares native tool-call support; use the model identifier to check a configuration value when a model call fails.

## What each column means

| Column | Meaning |
| --- | --- |
| Provider | Provider directory holding the definition; matches the channel group in the UI |
| Model identifier | The `model` field in the definition; this is the value entered when configuring a model |
| Context length | The `maxContext` field, in tokens |
| Max single response | The `maxTokens` field, in tokens |
| Image input | The `vision` field; Yes means the model accepts image input |
| Tool calling | The `toolChoice` flag declares native tool-call support. The effective call mode depends on the workflow node and model configuration |
| Reasoning output | The `reasoning` flag declares support for reasoning output; returned content depends on the provider and request settings |
| Em dash | The field is absent from the definition; this does not mean the value is zero |

## Three things to know before using this list

**1. Model count and provider count are different quantities.** There are 34 provider directories; 10 of them contain no model entries (FishAudio, HuggingFace, Meta, Moka, Ollama, OpenRouter, Other, PPIO, ai360, novita), so 24 providers actually carry models. Estimating the number of selectable models from the directory count overstates it.

**2. The five model types differ widely in size.** Chat 268; Embedding 21; Text-to-speech 16; Rerank 8; Speech-to-text 6. Chat models dominate; the embedding and rerank pools are far smaller, which leaves less room to switch at that layer during knowledge base selection.

**3. The list tracks the plugin version.** This page reflects `fastgpt-plugin` v1.1.3; entries are added and removed across versions. The models actually selectable in a deployment follow the plugin version that deployment loads, and can be checked directly in the model configuration screen.

## Providers and model counts

| Provider | Models |
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

## Chat models (268)

| Provider | Model identifier | Context length | Max single response | Image input | Tool calling | Reasoning output |
| --- | --- | --- | --- | --- | --- | --- |
| AntLing | `Ling-1T` | 128,000 | 16,000 | No | Yes | No |
| AntLing | `Ling-2.6-1T` | 256,000 | 16,000 | No | Yes | No |
| AntLing | `Ling-2.6-flash` | 256,000 | 16,000 | No | Yes | No |
| AntLing | `Ling-3.0-flash` | 256,000 | 16,000 | No | Yes | Yes |
| AntLing | `Ling-3.0-flash-VL` | 256,000 | 102,400 | Yes | Yes | No |
| AntLing | `Ling-3.0-tiny` | 256,000 | 32,000 | No | Yes | Yes |
| AntLing | `Ling-flash-2.0` | 128,000 | 16,000 | No | Yes | No |
| AntLing | `Ling-mini-2.0` | 64,000 | 8,000 | No | Yes | No |
| AntLing | `Ming-flash-omni` | 128,000 | 16,000 | Yes | Yes | No |
| AntLing | `Ming-lite-omni` | 64,000 | 8,000 | Yes | No | No |
| AntLing | `Ring-1T` | 128,000 | 16,000 | No | No | Yes |
| AntLing | `Ring-2.6-1T` | 256,000 | 16,000 | No | Yes | Yes |
| AntLing | `Ring-flash-2.0` | 128,000 | 16,000 | No | No | Yes |
| AntLing | `Ring-mini-2.0` | 64,000 | 8,000 | No | No | Yes |
| Baichuan | `Baichuan-M3` | 32,000 | 5,000 | No | No | Yes |
| Baichuan | `Baichuan-M3-Plus` | 32,000 | 5,000 | No | No | No |
| Baichuan | `Baichuan2-Turbo` | 32,000 | 2,000 | No | No | No |
| Baichuan | `Baichuan3-Turbo` | 32,000 | 4,000 | No | Yes | No |
| Baichuan | `Baichuan3-Turbo-128k` | 128,000 | 4,000 | No | Yes | No |
| Baichuan | `Baichuan4` | 32,000 | 4,000 | No | Yes | No |
| Baichuan | `Baichuan4-Air` | 32,000 | 4,000 | No | Yes | No |
| Baichuan | `Baichuan4-Turbo` | 32,000 | 4,000 | No | Yes | No |
| ChatGLM | `glm-4-air` | 128,000 | 16,000 | No | Yes | No |
| ChatGLM | `glm-4-flash` | 128,000 | 16,000 | No | Yes | No |
| ChatGLM | `glm-4-long` | 1,000,000 | 4,000 | No | No | No |
| ChatGLM | `glm-4-plus` | 128,000 | 4,000 | No | Yes | No |
| ChatGLM | `glm-4.1v-thinking-flash` | 64,000 | 16,000 | Yes | No | Yes |
| ChatGLM | `glm-4.1v-thinking-flashx` | 64,000 | 16,000 | Yes | No | Yes |
| ChatGLM | `glm-4.5` | 128,000 | 96,000 | No | Yes | Yes |
| ChatGLM | `glm-4.5-air` | 128,000 | 96,000 | No | Yes | Yes |
| ChatGLM | `glm-4.5-airx` | 128,000 | 96,000 | No | Yes | Yes |
| ChatGLM | `glm-4.5-flash` | 128,000 | 96,000 | No | Yes | Yes |
| ChatGLM | `glm-4.5-x` | 128,000 | 96,000 | No | Yes | Yes |
| ChatGLM | `glm-4.6` | 200,000 | 128,000 | No | Yes | Yes |
| ChatGLM | `glm-4.6v` | 128,000 | 32,000 | Yes | Yes | Yes |
| ChatGLM | `glm-4.6v-flash` | 128,000 | 32,000 | Yes | Yes | Yes |
| ChatGLM | `glm-4.6v-flashx` | 128,000 | 16,000 | Yes | Yes | Yes |
| ChatGLM | `glm-4.7` | 200,000 | 128,000 | No | Yes | Yes |
| ChatGLM | `glm-4.7-flash` | 200,000 | 128,000 | No | Yes | Yes |
| ChatGLM | `glm-4.7-flashx` | 200,000 | 128,000 | No | Yes | Yes |
| ChatGLM | `glm-4v-flash` | 8,000 | 1,000 | Yes | No | No |
| ChatGLM | `glm-4v-plus` | 16,000 | 4,000 | Yes | No | No |
| ChatGLM | `glm-5` | 200,000 | 128,000 | No | Yes | Yes |
| ChatGLM | `glm-5-turbo` | 200,000 | 128,000 | No | Yes | Yes |
| ChatGLM | `glm-5.1` | 200,000 | 128,000 | No | Yes | Yes |
| ChatGLM | `glm-5.2` | 1,000,000 | 128,000 | No | Yes | Yes |
| ChatGLM | `glm-5.3` | 1,000,000 | 128,000 | No | Yes | Yes |
| ChatGLM | `glm-5.3-flash` | 1,000,000 | 128,000 | Yes | Yes | Yes |
| ChatGLM | `glm-5v-turbo` | 200,000 | 128,000 | Yes | Yes | Yes |
| Claude | `claude-fable-5` | 1,000,000 | 128,000 | Yes | Yes | Yes |
| Claude | `claude-fable-5-1` | 1,000,000 | 128,000 | Yes | Yes | Yes |
| Claude | `claude-haiku-4-5` | 200,000 | 64,000 | Yes | Yes | Yes |
| Claude | `claude-haiku-4-5-20251001` | 200,000 | 64,000 | Yes | Yes | Yes |
| Claude | `claude-opus-4-1-20250805` | 200,000 | 32,000 | Yes | Yes | No |
| Claude | `claude-opus-4-5-20251101` | 200,000 | 64,000 | Yes | Yes | Yes |
| Claude | `claude-opus-4-6` | 1,000,000 | 128,000 | Yes | Yes | Yes |
| Claude | `claude-opus-4-6-20260205` | 1,000,000 | 128,000 | Yes | Yes | Yes |
| Claude | `claude-opus-4-7` | 1,000,000 | 128,000 | Yes | Yes | Yes |
| Claude | `claude-opus-4-8` | 1,000,000 | 128,000 | Yes | Yes | Yes |
| Claude | `claude-opus-5` | 1,000,000 | 128,000 | Yes | Yes | Yes |
| Claude | `claude-sonnet-4-5-20250929` | 1,000,000 | 64,000 | Yes | Yes | Yes |
| Claude | `claude-sonnet-4-6` | 1,000,000 | 64,000 | Yes | Yes | Yes |
| Claude | `claude-sonnet-4-6-20260217` | 1,000,000 | 64,000 | Yes | Yes | Yes |
| Claude | `claude-sonnet-5` | 1,000,000 | 128,000 | Yes | Yes | Yes |
| DeepSeek | `deepseek-chat` | 64,000 | 8,000 | No | Yes | No |
| DeepSeek | `deepseek-flash` | 1,000,000 | 384,000 | Yes | Yes | Yes |
| DeepSeek | `deepseek-reasoner` | 64,000 | 8,000 | No | No | Yes |
| DeepSeek | `deepseek-v4-flash` | 1,000,000 | 384,000 | No | Yes | Yes |
| DeepSeek | `deepseek-v4-pro` | 1,000,000 | 384,000 | No | Yes | Yes |
| Doubao | `doubao-seed-1-8-251228` | 256,000 | 32,000 | Yes | Yes | Yes |
| Doubao | `doubao-seed-2-0-lite-260215` | 256,000 | 128,000 | Yes | Yes | Yes |
| Doubao | `doubao-seed-2-0-lite-260428` | 256,000 | 128,000 | Yes | Yes | Yes |
| Doubao | `doubao-seed-2-0-mini-260215` | 256,000 | 128,000 | Yes | Yes | Yes |
| Doubao | `doubao-seed-2-0-mini-260428` | 256,000 | 128,000 | Yes | Yes | Yes |
| Doubao | `doubao-seed-2-0-pro-260215` | 256,000 | 128,000 | Yes | Yes | Yes |
| Doubao | `doubao-seed-2-1-pro-260628` | 256,000 | 256,000 | Yes | Yes | Yes |
| Doubao | `doubao-seed-2-1-turbo-260628` | 256,000 | 256,000 | Yes | Yes | Yes |
| Doubao | `doubao-seed-evolving` | 1,024,000 | 256,000 | Yes | Yes | Yes |
| Ernie | `ERNIE-4.0-8K` | 8,000 | 2,048 | No | No | No |
| Ernie | `ERNIE-4.0-Turbo-8K` | 8,000 | 2,048 | No | No | No |
| Ernie | `ERNIE-Lite-8K` | 8,000 | 2,048 | No | No | No |
| Ernie | `ERNIE-Speed-128K` | 128,000 | 4,096 | No | No | No |
| Ernie | `ernie-4.5-turbo-128k` | 128,000 | 12,288 | No | No | No |
| Ernie | `ernie-4.5-turbo-32k` | 32,000 | 12,288 | No | No | No |
| Ernie | `ernie-4.5-turbo-vl` | 128,000 | 16,384 | Yes | No | No |
| Ernie | `ernie-4.5-turbo-vl-32k` | 32,000 | 12,288 | Yes | No | No |
| Ernie | `ernie-5.0` | 128,000 | 65,536 | Yes | Yes | Yes |
| Ernie | `ernie-5.0-thinking-latest` | 128,000 | 65,536 | Yes | Yes | Yes |
| Ernie | `ernie-5.0-thinking-preview` | 128,000 | 65,536 | Yes | Yes | Yes |
| Ernie | `ernie-5.1` | 128,000 | 65,536 | No | Yes | Yes |
| Ernie | `ernie-x1.1` | 64,000 | 65,536 | No | Yes | Yes |
| Ernie | `ernie-x1.1-preview` | 64,000 | 65,536 | No | Yes | Yes |
| Gemini | `gemini-2.5-flash` | 1,000,000 | 63,000 | Yes | Yes | No |
| Gemini | `gemini-2.5-flash-lite` | 1,000,000 | 63,000 | Yes | Yes | No |
| Gemini | `gemini-2.5-pro` | 1,000,000 | 63,000 | Yes | Yes | No |
| Gemini | `gemini-3-flash` | 1,024,000 | 64,000 | Yes | Yes | Yes |
| Gemini | `gemini-3-flash-preview` | 1,024,000 | 64,000 | Yes | Yes | Yes |
| Gemini | `gemini-3.1-flash-lite` | 1,048,576 | 65,536 | Yes | Yes | Yes |
| Gemini | `gemini-3.1-pro` | 1,000,000 | 64,000 | Yes | Yes | Yes |
| Gemini | `gemini-3.1-pro-preview` | 1,000,000 | 64,000 | Yes | Yes | Yes |
| Gemini | `gemini-3.1-pro-preview-customtools` | 1,000,000 | 64,000 | Yes | Yes | Yes |
| Gemini | `gemini-3.5-flash` | 1,048,576 | 65,536 | Yes | Yes | Yes |
| Gemini | `gemini-3.5-flash-lite` | 1,048,576 | 65,536 | Yes | Yes | Yes |
| Gemini | `gemini-3.6-flash` | 1,048,576 | 65,536 | Yes | Yes | Yes |
| Gemini | `gemini-3.7-flash` | 1,048,576 | 65,536 | Yes | Yes | Yes |
| Gemini | `gemini-3.8-flash` | 1,048,576 | 65,536 | Yes | Yes | Yes |
| Grok | `grok-4.20-0309-non-reasoning` | 1,000,000 | 8,000 | Yes | Yes | No |
| Grok | `grok-4.20-0309-reasoning` | 1,000,000 | 8,000 | Yes | Yes | Yes |
| Grok | `grok-4.20-multi-agent-0309` | 1,000,000 | 8,000 | Yes | Yes | Yes |
| Grok | `grok-4.3` | 1,000,000 | 8,000 | Yes | Yes | Yes |
| Grok | `grok-4.5` | 500,000 | 8,000 | Yes | Yes | Yes |
| Grok | `grok-4.6` | 500,000 | 8,000 | Yes | Yes | Yes |
| Grok | `grok-build-0.1` | 256,000 | 8,000 | Yes | Yes | Yes |
| Groq | `llama-3.1-8b-instant` | 131,072 | 131,072 | No | Yes | No |
| Groq | `llama-3.3-70b-versatile` | 131,072 | 32,768 | No | Yes | No |
| Groq | `meta-llama/llama-4-scout-17b-16e-instruct` | 131,072 | 8,192 | Yes | Yes | No |
| Groq | `minimaxai/minimax-m2.7` | 196,608 | 131,072 | No | Yes | Yes |
| Groq | `openai/gpt-oss-120b` | 131,072 | 65,536 | No | Yes | Yes |
| Groq | `openai/gpt-oss-20b` | 131,072 | 65,536 | No | Yes | Yes |
| Groq | `qwen/qwen3-32b` | 131,072 | 40,960 | No | Yes | Yes |
| Groq | `qwen/qwen3.6-27b` | 131,072 | 16,384 | Yes | Yes | Yes |
| Groq | `qwen/qwen3.8-27b` | 131,042 | 16,384 | Yes | Yes | Yes |
| Hunyuan | `hunyuan-2.0-instruct-20251111` | 128,000 | 16,000 | No | No | Yes |
| Hunyuan | `hunyuan-2.0-thinking-20251109` | 128,000 | 64,000 | No | No | Yes |
| Hunyuan | `hunyuan-a13b` | 224,000 | 32,000 | No | No | Yes |
| Hunyuan | `hunyuan-large` | 28,000 | 4,000 | No | No | No |
| Hunyuan | `hunyuan-lite` | 250,000 | 6,000 | No | No | No |
| Hunyuan | `hunyuan-pro` | 28,000 | 4,000 | No | No | No |
| Hunyuan | `hunyuan-standard` | 32,000 | 2,000 | No | No | No |
| Hunyuan | `hunyuan-t1-latest` | 32,000 | 64,000 | No | No | Yes |
| Hunyuan | `hunyuan-turbo` | 28,000 | 4,000 | No | No | No |
| Hunyuan | `hunyuan-turbo-vision` | 6,000 | 2,000 | Yes | No | No |
| Hunyuan | `hunyuan-turbos-latest` | 32,000 | 16,000 | No | No | No |
| Hunyuan | `hunyuan-vision` | 6,000 | 2,000 | Yes | No | No |
| Hunyuan | `hy3` | 256,000 | 128,000 | No | Yes | Yes |
| Hunyuan | `hy4-preview` | 1,024,000 | 64,000 | No | Yes | Yes |
| InternLM | `internlm2-pro-chat` | 32,000 | 8,000 | No | Yes | No |
| InternLM | `internlm3-8b-instruct` | 32,000 | 8,000 | No | Yes | No |
| MiniMax | `M2-her` | 64,000 | 2,048 | No | No | No |
| MiniMax | `MiniMax-M1` | 1,000,000 | 40,000 | No | Yes | No |
| MiniMax | `MiniMax-M2` | 196,000 | 100,000 | No | Yes | Yes |
| MiniMax | `MiniMax-M2.1` | 204,000 | 100,000 | No | Yes | Yes |
| MiniMax | `MiniMax-M2.1-lightning` | 204,000 | 100,000 | No | Yes | Yes |
| MiniMax | `MiniMax-M2.5` | 204,000 | 100,000 | No | Yes | Yes |
| MiniMax | `MiniMax-M2.5-highspeed` | 204,000 | 100,000 | No | Yes | Yes |
| MiniMax | `MiniMax-M2.7` | 204,000 | 100,000 | No | Yes | Yes |
| MiniMax | `MiniMax-M2.7-highspeed` | 204,000 | 100,000 | No | Yes | Yes |
| MiniMax | `MiniMax-M3` | 1,000,000 | 100,000 | Yes | Yes | Yes |
| MiniMax | `MiniMax-Text-01` | 1,000,000 | 40,000 | No | No | No |
| MistralAI | `ministral-14b-2512` | 131,000 | 8,000 | Yes | Yes | No |
| MistralAI | `ministral-3b-2512` | 131,000 | 8,000 | Yes | Yes | No |
| MistralAI | `ministral-3b-latest` | 130,000 | 8,000 | No | Yes | No |
| MistralAI | `ministral-8b-2512` | 131,000 | 8,000 | Yes | Yes | No |
| MistralAI | `ministral-8b-latest` | 130,000 | 8,000 | No | Yes | No |
| MistralAI | `mistral-large-2512` | 256,000 | 8,000 | Yes | Yes | No |
| MistralAI | `mistral-large-latest` | 130,000 | 8,000 | No | Yes | No |
| MistralAI | `mistral-medium-3-5` | 256,000 | 32,000 | Yes | Yes | Yes |
| MistralAI | `mistral-small-2603` | 256,000 | 32,000 | Yes | Yes | Yes |
| MistralAI | `mistral-small-latest` | 32,000 | 4,000 | No | Yes | No |
| Moonshot | `kimi-k2.5` | 262,144 | 32,000 | Yes | Yes | Yes |
| Moonshot | `kimi-k2.6` | 262,144 | 32,000 | Yes | Yes | Yes |
| Moonshot | `kimi-k2.7-code` | 262,144 | 32,768 | Yes | Yes | Yes |
| Moonshot | `kimi-k2.7-code-highspeed` | 262,144 | 32,768 | Yes | Yes | Yes |
| Moonshot | `kimi-k3` | 1,048,576 | 1,048,576 | Yes | Yes | Yes |
| Moonshot | `moonshot-v1-128k` | 128,000 | 4,000 | No | Yes | No |
| Moonshot | `moonshot-v1-128k-vision-preview` | 128,000 | 4,000 | Yes | Yes | No |
| Moonshot | `moonshot-v1-32k` | 32,000 | 4,000 | No | Yes | No |
| Moonshot | `moonshot-v1-32k-vision-preview` | 32,000 | 4,000 | Yes | Yes | No |
| Moonshot | `moonshot-v1-8k` | 8,000 | 4,000 | No | Yes | No |
| Moonshot | `moonshot-v1-8k-vision-preview` | 8,000 | 4,000 | Yes | Yes | No |
| OpenAI | `gpt-4.1` | 1,000,000 | 32,000 | Yes | Yes | No |
| OpenAI | `gpt-4.1-mini` | 1,000,000 | 32,000 | Yes | Yes | No |
| OpenAI | `gpt-4.1-nano` | 1,000,000 | 32,000 | Yes | Yes | No |
| OpenAI | `gpt-4o` | 128,000 | 4,000 | Yes | Yes | No |
| OpenAI | `gpt-4o-mini` | 128,000 | 16,000 | Yes | Yes | No |
| OpenAI | `gpt-5` | 400,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5-chat-latest` | 128,000 | 16,384 | Yes | Yes | No |
| OpenAI | `gpt-5-mini` | 400,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5-nano` | 400,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5-pro` | 400,000 | 272,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5.1` | 400,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5.1-chat-latest` | 128,000 | 16,384 | Yes | Yes | No |
| OpenAI | `gpt-5.2` | 400,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5.2-chat-latest` | 128,000 | 16,384 | Yes | Yes | No |
| OpenAI | `gpt-5.2-pro` | 400,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5.3-codex` | 400,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5.4` | 1,050,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5.4-mini` | 400,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5.4-nano` | 400,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5.4-pro` | 1,050,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5.5` | 1,050,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5.5-pro` | 1,050,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5.6` | 1,050,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5.6-luna` | 1,050,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5.6-sol` | 1,050,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-5.6-terra` | 1,050,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-6-astra` | 1,050,000 | 128,000 | Yes | Yes | Yes |
| OpenAI | `gpt-oss-120b` | 131,000 | 131,000 | No | Yes | Yes |
| OpenAI | `gpt-oss-20b` | 131,000 | 131,000 | No | Yes | Yes |
| OpenAI | `o3` | 200,000 | 100,000 | Yes | Yes | Yes |
| OpenAI | `o3-mini` | 200,000 | 100,000 | No | Yes | Yes |
| OpenAI | `o4-mini` | 200,000 | 100,000 | Yes | Yes | Yes |
| Qwen | `qwen-coder-turbo` | 128,000 | 8,000 | No | No | No |
| Qwen | `qwen-flash` | 1,000,000 | 32,000 | No | Yes | No |
| Qwen | `qwen-long` | 10,000,000 | 6,000 | No | No | No |
| Qwen | `qwen-max` | 128,000 | 8,000 | No | Yes | No |
| Qwen | `qwen-plus` | 1,000,000 | 32,000 | No | Yes | No |
| Qwen | `qwen-turbo` | 1,000,000 | 16,000 | No | Yes | No |
| Qwen | `qwen-vl-max` | 128,000 | 8,000 | Yes | No | No |
| Qwen | `qwen-vl-plus` | 128,000 | 8,000 | Yes | No | No |
| Qwen | `qwen2.5-14b-instruct` | 128,000 | 8,000 | No | Yes | No |
| Qwen | `qwen2.5-32b-instruct` | 128,000 | 8,000 | No | Yes | No |
| Qwen | `qwen2.5-72b-instruct` | 128,000 | 8,000 | No | Yes | No |
| Qwen | `qwen2.5-7b-instruct` | 128,000 | 8,000 | No | Yes | No |
| Qwen | `qwen3-0.6b` | 32,000 | 8,000 | No | Yes | Yes |
| Qwen | `qwen3-1.7b` | 32,000 | 8,000 | No | Yes | Yes |
| Qwen | `qwen3-14b` | 128,000 | 8,000 | No | Yes | Yes |
| Qwen | `qwen3-235b-a22b` | 128,000 | 8,000 | No | Yes | Yes |
| Qwen | `qwen3-30b-a3b` | 128,000 | 8,000 | No | Yes | Yes |
| Qwen | `qwen3-32b` | 128,000 | 8,000 | No | Yes | Yes |
| Qwen | `qwen3-4b` | 128,000 | 8,000 | No | Yes | Yes |
| Qwen | `qwen3-8b` | 128,000 | 8,000 | No | Yes | Yes |
| Qwen | `qwen3-coder-flash` | 1,024,000 | 64,000 | No | Yes | Yes |
| Qwen | `qwen3-coder-next` | 256,000 | 64,000 | No | Yes | Yes |
| Qwen | `qwen3-coder-plus` | 1,024,000 | 64,000 | No | Yes | Yes |
| Qwen | `qwen3-max` | 256,000 | 64,000 | No | Yes | No |
| Qwen | `qwen3-vl-flash` | 25,000 | 8,000 | Yes | Yes | No |
| Qwen | `qwen3-vl-plus` | 25,000 | 8,000 | Yes | Yes | No |
| Qwen | `qwen3.5-flash` | 1,000,000 | 64,000 | Yes | Yes | Yes |
| Qwen | `qwen3.5-plus` | 1,000,000 | 64,000 | Yes | Yes | Yes |
| Qwen | `qwen3.6-flash` | 1,000,000 | 64,000 | Yes | Yes | Yes |
| Qwen | `qwen3.6-max-preview` | 260,000 | 64,000 | No | Yes | Yes |
| Qwen | `qwen3.6-plus` | 1,000,000 | 64,000 | Yes | Yes | Yes |
| Qwen | `qwen3.7-flash` | 1,000,000 | 64,000 | Yes | Yes | Yes |
| Qwen | `qwen3.7-max` | 1,000,000 | 64,000 | Yes | Yes | Yes |
| Qwen | `qwen3.7-plus` | 1,000,000 | 64,000 | Yes | Yes | Yes |
| Qwen | `qwen3.8-flash` | 1,000,000 | 64,000 | Yes | Yes | Yes |
| Qwen | `qwen3.8-max` | 1,000,000 | 64,000 | Yes | Yes | Yes |
| Qwen | `qwq-32b` | 128,000 | 8,000 | No | Yes | Yes |
| Qwen | `qwq-plus` | 128,000 | 8,000 | No | Yes | Yes |
| Siliconflow | `Qwen/Qwen2-VL-72B-Instruct` | 32,000 | 4,000 | Yes | No | No |
| Siliconflow | `Qwen/Qwen2.5-72B-Instruct` | 128,000 | 8,000 | No | Yes | No |
| Siliconflow | `deepseek-ai/DeepSeek-V2.5` | 32,000 | 4,000 | Yes | Yes | No |
| SparkDesk | `4.0Ultra` | 8,000 | 8,000 | No | No | No |
| SparkDesk | `generalv3` | 8,000 | 8,000 | No | No | No |
| SparkDesk | `generalv3.5` | 8,000 | 8,000 | No | No | No |
| SparkDesk | `lite` | 32,000 | 4,000 | No | No | No |
| SparkDesk | `max-32k` | 32,000 | 8,000 | No | No | No |
| SparkDesk | `pro-128k` | 128,000 | 4,000 | No | No | No |
| SparkDesk | `spark-x` | 262,144 | 262,144 | No | Yes | Yes |
| StepFun | `step-1-128k` | 128,000 | 8,000 | No | No | No |
| StepFun | `step-1-256k` | 256,000 | 8,000 | No | No | No |
| StepFun | `step-1-32k` | 32,000 | 8,000 | No | No | No |
| StepFun | `step-1-8k` | 8,000 | 8,000 | No | No | No |
| StepFun | `step-1-flash` | 8,000 | 4,000 | No | No | No |
| StepFun | `step-1o-turbo-vision` | 32,000 | 8,000 | Yes | Yes | No |
| StepFun | `step-1o-vision-32k` | 32,000 | 8,000 | Yes | No | No |
| StepFun | `step-1v-32k` | 32,000 | 8,000 | Yes | No | No |
| StepFun | `step-1v-8k` | 8,000 | 8,000 | Yes | No | No |
| StepFun | `step-2-16k` | 16,000 | 4,000 | No | No | No |
| StepFun | `step-2-mini` | 8,000 | 4,000 | No | No | No |
| StepFun | `step-3` | 64,000 | 8,000 | Yes | Yes | Yes |
| StepFun | `step-3.5-flash` | 256,000 | 8,000 | No | Yes | Yes |
| StepFun | `step-3.5-flash-2603` | 256,000 | 8,000 | No | Yes | Yes |
| StepFun | `step-3.7-flash` | 256,000 | 8,000 | Yes | Yes | Yes |
| StepFun | `step-r1-v-mini` | 100,000 | 8,000 | Yes | Yes | Yes |
| Yi | `yi-lightning` | 16,000 | 4,000 | No | No | No |
| Yi | `yi-vision-v2` | 16,000 | 4,000 | Yes | No | No |

## Embedding models (21)

| Provider | Model identifier |
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

## Rerank models (8)

| Provider | Model identifier |
| --- | --- |
| BAAI | `bge-reranker-v2-m3` |
| Jina | `jina-reranker-m0` |
| Jina | `jina-reranker-v2-base-multilingual` |
| Jina | `jina-reranker-v3` |
| Jina | `jina-reranker-v3.5` |
| Qwen | `gte-rerank-v2` |
| Qwen | `qwen3-rerank` |
| Siliconflow | `BAAI/bge-reranker-v2-m3` |

## Text-to-speech models (16)

| Provider | Model identifier |
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

## Speech-to-text models (6)

| Provider | Model identifier |
| --- | --- |
| AliCloud | `SenseVoiceSmall` |
| AliCloud | `fun-asr` |
| Groq | `whisper-large-v3` |
| Groq | `whisper-large-v3-turbo` |
| OpenAI | `whisper-1` |
| Siliconflow | `FunAudioLLM/SenseVoiceSmall` |

## Scope of this list

The list reflects the values recorded in the definition files. The following cases need separate confirmation:

- A provider changed a model's context length or capabilities and the plugin definition has not caught up
- Models reached through a custom channel, whose capabilities come from the channel configuration and are not covered here
- Behavioural differences between identically named models across providers, which have to be measured in the deployment itself
