---
title: 解决FastGPT调用Ollama模型时应用运行报错的问题
slug: /zh/troubleshoot/fastgpt-ollama-model-run-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2717
source_type: GitHub issue
---

# 解决FastGPT调用Ollama模型时应用运行报错的问题

## 现象
用户使用4.9.10-fix版本的FastGPT，搭配ollama qwen2:0.5b模型。在AI对话中调试时请求正常，OneAPI日志显示请求返回200，promptTokens为0、completionTokens为18，配额消耗540。直接运行应用时则出现报错，OneAPI日志多次输出`error unmarshalling stream response: invalid character '}' after top-level value`，请求同样返回200，但promptTokens和completionTokens均为0，配额消耗为0。

## 可能原因
该报错提示OneAPI在解析流式响应时失败，顶层JSON值后出现无效字符}，说明Ollama返回的流式响应格式不符合预期，导致解析异常。

## 排查步骤
1. 对比AI对话调试和应用运行的场景，确认两者的请求配置是否一致。
2. 查看OneAPI的报错日志，定位到`error unmarshalling stream response: invalid character '}' after top-level value`错误。
3. 检查Ollama模型返回的原始流式响应内容，确认是否存在格式异常。
4. 核对FastGPT应用运行时的请求参数，与调试场景的参数是否匹配。

## 解决与验证
1. 统一FastGPT调试与应用运行的请求配置，确保参数完全一致。
2. 重新运行应用，验证OneAPI日志中不再出现`error unmarshalling stream response: invalid character '}' after top-level value`错误。
3. 查看对话结果是否正常返回，确认配额消耗和token统计符合预期。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2717)
