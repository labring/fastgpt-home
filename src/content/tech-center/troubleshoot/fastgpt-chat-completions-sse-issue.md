---
title: 解决FastGPT的/api/v1/chat/completions接口流中断后无法续接的问题
slug: /zh/troubleshoot/fastgpt-chat-completions-sse-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4994
source_type: GitHub issue
---

# 解决FastGPT的/api/v1/chat/completions接口流中断后无法续接的问题

## 现象
用户在使用FastGPT时，调用/api/v1/chat/completions接口，若第一次请求的stream=true的流式响应尚未结束，此时发起第二次请求，无法续接第一次请求未完成的流式内容。

## 可能原因
该接口的流式响应基于一次性SSE连接，连接建立后无法复用，断开后无法保留会话状态以续接未完成的流式内容。

## 排查步骤
1. 确认调用的接口为/api/v1/chat/completions，且请求参数中配置了stream=true以启用流式响应。
2. 验证第二次请求发起的时机，确认第一次请求的流式响应尚未结束。
3. 检查会话相关的配置项，需按实际环境确认是否存在可复用会话的相关参数。

## 解决与验证
当前该接口的流式请求为一次性SSE连接，无法在第一次流未结束时通过第二次请求续接未完成的流式内容。验证方式：发起携带stream=true参数的/api/v1/chat/completions请求，在响应未结束时发起第二次请求，无法获取第一次请求未完成的流式数据。

> 来源: [FastGPT GitHub issue #4994](https://github.com/labring/FastGPT/issues/4994)
