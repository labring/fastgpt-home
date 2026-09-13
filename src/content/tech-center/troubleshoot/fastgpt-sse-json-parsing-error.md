---
title: 解决FastGPT调用模型分段回复时出现JSON解析错误的问题
slug: /zh/troubleshoot/fastgpt-sse-json-parsing-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1719
source_type: GitHub issue
---

# 解决FastGPT调用模型分段回复时出现JSON解析错误的问题

## 现象
用户使用FastGPT 4.8.1版本，通过OneAPI接入glm4-9b-chat模型。当AI回复内容存在分段时，接口会报错“Unexpected end of JSON input”。后台日志显示两条关键信息：一是`Could not parse message into JSON: From chunk: [ 'data: ' ]`，二是`sse error: Unexpected end of JSON input`，同时附带JSON.parse的调用栈报错。

## 可能原因
结合报错日志分析，该问题的核心是SSE流式响应的chunk解析异常。日志显示解析失败的源chunk仅为`[ 'data: ' ]`，未包含完整的有效JSON数据，触发JSON.parse的“意外结束”错误。该问题仅在回复存在分段时出现，说明分段场景下的流式数据传输或转发存在不完整的情况。

## 排查步骤
1.  确认当前FastGPT版本为4.8.1，检查模型接入渠道是否为OneAPI，以及目标模型是否支持SSE流式返回。
2.  查看FastGPT后台日志，确认是否存在`Could not parse message into JSON: From chunk: [ 'data: ' ]`和`sse error: Unexpected end of JSON input`的报错内容。
3.  复现问题，抓取OneAPI转发的原始SSE响应内容，检查分段回复时的返回chunk是否存在不完整的情况。
4.  检查OneAPI的相关配置，确认是否存在超时、限流或转发截断的设置项。

## 解决与验证
若问题由OneAPI转发异常导致，可调整OneAPI的流式转发配置，确保完整传递SSE的data数据块。若为FastGPT自身解析逻辑存在缺陷，需参考官方更新日志确认对应版本是否已修复该问题，或等待官方发布相关补丁。
验证方式为重新发起包含分段需求的提问，确认AI回复时不再触发JSON解析错误，后台无对应报错日志，接口正常返回完整的分段回复内容。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1719)
