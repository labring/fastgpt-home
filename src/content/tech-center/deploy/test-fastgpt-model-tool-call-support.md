---
title: 测试FastGPT所使用模型的工具调用支持能力
slug: /zh/deploy/test-fastgpt-model-tool-call-support
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/troubleshooting/model-errors
source_type: 官方文档小节
---

# 测试FastGPT所使用模型的工具调用支持能力

### 前提条件
工具调用功能需要模型提供商与oneapi同时支持工具调用能力，才能在FastGPT中正常启用该功能。

### 测试步骤
1. 发起第一轮工具调用测试请求
使用curl命令向oneapi的chat/completions接口发起stream模式请求，示例命令如下：
```bash
curl --location --request POST 'https://oneapi.xxx/v1/chat/completions' \
--header 'Authorization: Bearer sk-xxxx' \
--header 'Content-Type: application/json' \
--data-raw '{
"model": "gpt-5",
"temperature": 0.01,
"max_tokens": 8000,
"stream": true,
"messages": [
{
"role": "user",
"content": "几点了"
}
],
"tools": [
{
"type": "function",
"function": {
"name": "hCVbIY",
"description": "获取用户当前时区的时间。",
"parameters": {
"type": "object",
"properties": {},
"required": []
}
}
],
"tool_choice": "auto"
}'
```
2. 检查第一轮响应
若模型与oneapi支持工具调用，响应结果中将包含`tool_calls`参数，示例有效响应片段如下：
```json
{
"id": "chatcmpl-A7kwo1rZ3OHYSeIFgfWYxu8X2koN3",
"object": "chat.completion.chunk",
"created": 1726412126,
"model": "gpt-5",
"system_fingerprint": "fp_483d39d857",
"choices": [
{
"index": 0,
"id": "call_0n24eiFk8OUyIyrdEbLdirU7",
"type": "function",
"function": {
"name": "mEYIcFl84rYC",
"arguments": ""
}
}
],
"refusal": null,
"logprobs": null,
"finish_reason": null
}
```
3. 发起第二轮工具调用测试请求
将第一轮获取的工具调用结果回传给模型，示例请求命令如下：
```bash
curl --location --request POST 'https://oneapi.xxxx/v1/chat/completions' \
--header 'Authorization: Bearer sk-xxx' \
--header 'Content-Type: application/json' \
--data-raw '{
"model": "gpt-5",
"temperature": 0.01,
"max_tokens": 8000,
"stream": true,
"messages": [
{
"role": "user",
"content": "几点了"
},
{
"role": "assistant",
"tool_calls": [
{
"id": "kDia9S19c4RO",
"type": "function",
"function": {
"name": "hCVbIY",
"arguments": "{}"
}
}
]
},
{
"tool_call_id": "kDia9S19c4RO",
"role": "tool",
"name": "hCVbIY",
"content": "{\n \"time\": \"2024-09-14 22:59:21 Sunday\"}"
}
],
"tools": [
{
"type": "function",
"function": {
"name": "hCVbIY",
"description": "获取用户当前时区的时间。",
"parameters": {
"type": "object",
"properties": {},
"required": []
}
}
],
"tool_choice": "auto"
}'
```

### 结果验证
第一轮请求成功返回`tool_calls`参数，说明模型与oneapi已具备工具调用的基础支持能力。第二轮请求完成后，将收到模型基于工具返回结果生成的自然语言回答，即可验证完整的工具调用流程正常运行。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/troubleshooting/model-errors)
