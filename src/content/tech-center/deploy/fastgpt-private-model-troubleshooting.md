---
title: FastGPT私有部署模型问题排查与修复方法
slug: /zh/deploy/fastgpt-private-model-troubleshooting
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/model-errors
source_type: 官方文档
---

# FastGPT私有部署模型问题排查与修复方法

## 模型可用性基础排查步骤
私有部署模型需先确认模型本身运行正常，可通过三层测试验证：首先直接通过CURL请求测试上游模型（云端或私有模型均可），其次通过CURL请求OneAPI测试，最后在FastGPT平台内使用该模型测试。以下为不同类型模型的CURL测试示例：
LLM模型测试参考格式：
```
curl https://api.openai.com/v1/chat/completions \n  -H Content-Type: application/json \n  -H Authorization: Bearer $OPENAI_API_KEY \n  -d { \"model\": \"gpt-4o\", \"messages\": [ { \"role\": \"system\", \"content\": \"You are a helpful assistant.\" }, { \"role\": \"user\", \"content\": \"Hello!\" } ] }
```
Embedding、Rerank、TTS、Whisper模型可参考官方提供的对应CURL请求格式完成测试。

## 常见模型报错问题与处理
当出现模型响应为空或模型报错时，多为stream模式下OneAPI直接结束流请求且无返回内容导致。4.8.10及以上版本会在日志中打印实际发送的Body参数，可复制该参数通过CURL向OneAPI发起请求测试；也可设置`stream=false`获取精确错误信息。
可能的报错原因包括：国内模型命中风控、存在不支持的额外参数、参数不符合模型要求（如temperature不支持0或两位小数、max_tokens超出限制、上下文超长）、模型部署不兼容stream模式。
测试示例请求：
```
curl --location --request POST https://api.openai.com/v1/chat/completions \n  --header Authorization: Bearer sk-xxxx \n  --header Content-Type: application/json \n  --data-raw { \"model\": \"xxx\", \"temperature\": 0.01, \"max_tokens\": 1000, \"stream\": true, \"messages\": [ { \"role\": \"user\", \"content\": \"你是饿\" } ] }
```

## 模型工具调用支持测试
需同时满足模型提供商与OneAPI支持工具调用才可使用，测试步骤如下：1. 通过CURL向OneAPI发起stream模式的工具调用测试；2. 检查响应参数，若正常调用会返回`tool_calls`参数。
测试示例请求：
```
curl --location --request POST https://oneapi.xxx/v1/chat/completions \n  --header Authorization: Bearer sk-xxxx \n  --header Content-Type: application/json \n  --data-raw { \"model\": \"gpt-5\", \"temperature\": 0.01, \"max_tokens\": 8000, \"stream\": true, \"messages\": [ { \"role\": \"user\", \"content\": \"几点了\" } ], \"tools\": [ { \"type\": \"function\", \"function\": { \"name\": \"hCVbIY\", \"description\": \"获取用户当前时区的时间。\", \"parameters\": { \"type\": \"object\", \"properties\": {}, \"required\": [] } } } ], \"tool_choice\": \"auto\" }
```
正常响应会包含`tool_calls`相关字段，如`id`、`type`、`function`等信息。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/model-errors
