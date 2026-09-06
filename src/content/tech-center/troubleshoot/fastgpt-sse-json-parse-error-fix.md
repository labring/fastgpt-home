---
title: 解决FastGPT中SSE流式响应JSON解析失败的问题
slug: /zh/troubleshoot/fastgpt-sse-json-parse-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/683
source_type: GitHub issue
---

# 解决FastGPT中SSE流式响应JSON解析失败的问题

## 现象
服务端抛出`Could not parse message into JSON`报错，伴随具体语法错误`SyntaxError: Unexpected token { in JSON at position 212`。日志中会打印原始的SSE chunk数据，示例如下：
```
[
  'data: {"id":"chatcmpl-8cmdvebyMOfuH5UCDgpkWlZeus0XD","object":"chat.completion.chunk","created":1704254139,"model":"gpt-35-turbo","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}',
  'data: {"id":"chatcmpl-8cmdvebyMOfuH5UCDgpkWlZeus0XD","object":"chat.completion.chunk","created":1704254139,"model":"gpt-35-turbo","choices":[{"index":0,"delta":{"content":"你"},"finish_reason":null}]}'
]
```
同时会输出包含`/app/projects/app/.next/server/chunks/`路径的错误栈信息。

## 可能原因
从报错信息和日志来看，核心问题是SSE流式响应的多条消息被合并为单个字符串，导致JSON解析失败。具体表现为上游返回的两条独立SSE消息（均以`data: `开头）未被正确分割，被当作单个JSON字符串进行解析，从而触发`Unexpected token {`的语法错误，该问题出现在SSE消息的迭代解析环节。

## 排查步骤
1.  查看服务端日志的`From chunk`字段，确认原始SSE chunk是否存在多条`data: `开头的JSON内容未被拆分的情况。
2.  核对上游模型接口返回的SSE数据格式，确认是否符合标准SSE协议（每条消息以`data: `开头，以`\n\n`作为结束分隔符）。
3.  检查FastGPT服务中处理SSE流的代码逻辑，确认是否正确实现了按`data: `前缀和分隔符拆分每条消息的功能。

## 解决与验证
解决方法：修复SSE流的解析逻辑，正确按`data: `前缀和标准分隔符拆分每条独立的SSE消息，将合并的JSON对象拆分为单个可解析的单元。验证方法：重新发起聊天请求，观察服务端日志是否不再出现`Could not parse message into JSON`和`SyntaxError: Unexpected token {`的报错，同时确认能正常接收完整的流式回复内容。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/683)
