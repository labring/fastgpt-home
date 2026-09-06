---
title: 解决FastGPT OpenAPI聊天接口流式返回首包缺少assistant角色问题
slug: /zh/troubleshoot/fastgpt-openapi-stream-missing-role
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/670
source_type: GitHub issue
---

# 解决FastGPT OpenAPI聊天接口流式返回首包缺少assistant角色问题

## 现象
使用FastGPT的OpenAPI聊天接口，以`stream=true`参数请求`Chat/Completions`接口时，流式返回的首包JSON的`delta`字段内未包含`role: "assistant"`。该问题会导致飞书智能伙伴自定义模型的上下文功能无法正常使用。

## 可能原因
经问题描述与返回格式对比，该问题源于FastGPT的OpenAPI流式返回实现未遵循OpenAI官方标准格式，未在首包的`delta`字段中添加`role: "assistant"`参数，导致依赖该字段的功能无法正确识别首包内容。

## 排查步骤
1. 确认调用参数：检查发起`Chat/Completions`接口请求时，是否设置了`stream=true`参数。
2. 捕获返回内容：通过抓包或日志工具，获取流式返回的首包JSON数据。
3. 检查字段完整性：查看首包中`delta`字段是否包含`role: "assistant"`字段。
4. 对照标准格式：对比OpenAI官方流式返回格式，确认是否存在字段缺失。

## 解决与验证
目前可等待FastGPT官方修复该接口的流式返回格式问题。修复验证步骤如下：
1. 再次以`stream=true`参数发起`Chat/Completions`接口请求。
2. 检查流式返回的首包JSON，确认`delta`字段已包含`role: "assistant"`。
3. 验证依赖该格式的功能可正常使用上下文关联能力。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/670)
