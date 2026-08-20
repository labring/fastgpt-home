---
title: FastGPT私有部署模型问题排查与测试方法
slug: /zh/deploy/fastgpt-self-host-model-troubleshooting
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/model-errors
source_type: 官方文档
---

# FastGPT私有部署模型问题排查与测试方法

## 模型可用性检查流程
私有部署模型时，需先确认模型本身运行正常，可按三步完成检查：
1. 直接通过CURL请求测试上游模型（含云端模型与私有模型）；
2. 通过CURL请求OneAPI测试模型可用性；
3. 在FastGPT平台内使用该模型进行最终测试。

以下为各类型模型的测试CURL示例：
### LLM模型
```
curl https://api.openai.com/v1/chat/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-d '{"model": "gpt-4o", "messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"}]}'
```
### Embedding模型
```
curl https://api.openai.com/v1/embeddings \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-H "Content-Type: application/json" \
-d '{"input": "The food was delicious and the waiter...", "model": "text-embedding-ada-002", "encoding_format": "float"}'
```
### Rerank模型
```
curl --location --request POST https://xxxx.com/api/v1/rerank \
--header "Authorization: Bearer {{ACCESS_TOKEN}}" \
--header "Content-Type: application/json" \
--data-raw '{"model": "bge-rerank-m3", "query": "导演是谁", "documents": ["你是谁？\n我是电影《铃芽之旅》助手"]}'
```

## 模型响应为空或报错排查
该错误通常因stream模式下OneAPI直接结束流请求且无返回内容导致。4.8.10及以上版本会在日志中打印实际发送的Body参数，可复制该参数后通过CURL向OneAPI发起请求测试。若无法捕获错误，可设置`stream=false`获取精确报错信息。

常见报错原因包括：国内模型命中风控、存在不支持的模型参数（建议仅保留`messages`与必要参数测试）、参数不符合模型要求（如部分模型不支持`temperature=0`或两位小数、`max_tokens`超出上限、上下文长度超长）、模型部署不兼容stream模式。

可复制日志中的请求体进行测试，示例命令如下：
```
curl --location --request POST https://api.openai.com/v1/chat/completions \
--header "Authorization: Bearer sk-xxxx" \
--header "Content-Type: application/json" \
--data-raw '{"model": "xxx", "temperature": 0.01, "max_tokens": 1000, "stream": true, "messages": [{"role": "user", "content": "你是饿"}]}'
```

## 模型工具调用测试方法
需模型提供商与OneAPI同时支持工具调用才可使用，测试步骤如下：
1. 通过CURL向OneAPI发起stream模式的工具调用测试，示例命令：
```
curl --location --request POST https://oneapi.xxx/v1/chat/completions \
--header "Authorization: Bearer sk-xxxx" \
--header "Content-Type: application/json" \
--data-raw '{"model": "gpt-5", "temperature": 0.01, "max_tokens": 8000, "stream": true, "messages": [{"role": "user", "content": "几点了"}], "tools": [{"type": "function", "function": {"name": "hCVbIY", "description": "获取用户当前时区的时间。", "parameters": {"type": "object", "properties": {}, "required": []}}}], "tool_choice": "auto"}'
```
2. 检查响应参数：若能正常调用工具，会返回包含`tool_calls`的参数内容，示例响应片段包含`id`、`choices`等字段。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/model-errors)
