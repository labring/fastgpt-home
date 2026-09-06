---
title: 为FastGPT添加Ollama上下文与输出token参数支持
slug: /zh/troubleshoot/fastgpt-ollama-context-token-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2812
source_type: GitHub issue
---

# 为FastGPT添加Ollama上下文与输出token参数支持

## 现象
用户在使用FastGPT对接Ollama模型时，希望通过传入max_tokens和num_ctx参数分别限制输出token数量和调整上下文窗口大小，但当前FastGPT无法正确转发这两个参数到Ollama接口。参考该issue提供的oneapi测试curl，该接口可正常传递num_ctx和max_tokens参数并生效，但FastGPT未实现对应支持。

## 可能原因
目前FastGPT的Ollama对接逻辑未包含对max_tokens和num_ctx参数的转发处理，无法将用户在请求中传入的这两个参数传递给Ollama的官方接口，导致参数无法生效。

## 排查步骤
1. 确认当前使用的FastGPT版本，检查是否已内置对max_tokens和num_ctx参数的支持（需按实际环境确认）。
2. 检查调用FastGPT的API请求体，确认是否正确包含max_tokens和num_ctx字段，且参数格式符合要求。
3. 对比issue中提供的oneapi测试curl请求格式，确认FastGPT的请求参数结构是否与之一致。
4. 查看FastGPT的运行日志，确认是否存在过滤或丢弃max_tokens和num_ctx参数的情况。

## 解决与验证
解决方法：参考oneapi的实现逻辑，在FastGPT的Ollama对接代码中添加参数转发支持。将用户请求中的max_tokens映射为Ollama的num_predict参数，直接将num_ctx参数转发至Ollama接口。
验证方法：使用与issue中类似的curl请求调用FastGPT的v1/chat/completions接口，例如：
```
curl --location --request POST 'http://{FastGPT服务地址}/v1/chat/completions' \
--header 'Authorization: Bearer {你的API密钥}' \
--header 'Content-Type: application/json' \
--data '{
  "model": "qwen2:latest",
  "stream": false,
  "temperature": 1,
  "max_tokens": 2000,
  "num_ctx":7777,
  "messages": [{"role": "user", "content": "你是谁"}]
}'
```
确认请求能正常将参数转发给Ollama，可通过查看Ollama的运行日志或接口返回结果，验证上下文窗口和输出token限制是否生效。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2812)
