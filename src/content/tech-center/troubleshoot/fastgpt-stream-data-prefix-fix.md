---
title: 解决FastGPT开启stream:true后流式输出多出data:前缀的问题
slug: /zh/troubleshoot/fastgpt-stream-data-prefix-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4287
source_type: GitHub issue
---

# 解决FastGPT开启stream:true后流式输出多出data:前缀的问题

## 现象
当在FastGPT中配置`stream: true`启用流式输出时，返回的每条内容会额外带有`event: answer`和`data: `前缀，例如示例中的`event: answer\ndata: {"id":"","object":"","created":0,"model":"","choices":[{"delta":{"role":"assistant","content":"就"},"index":0,"finish_reason":null}]}`，最终结束标记为`data: [DONE]`，与预期的纯JSON流式格式不符。

## 可能原因
该现象大概率是因为FastGPT的流式输出默认采用SSE（服务器发送事件）协议规范，该协议要求每条消息携带`event:`和`data:`前缀，以区分不同类型的事件和消息内容，最终以`data: [DONE]`标记流式传输结束。若业务侧期望直接获取纯JSON格式的流式内容，会出现格式不符的情况。

## 排查步骤
1. 确认调用FastGPT时是否正确配置了`stream: true`参数，检查请求体中的参数设置。
2. 抓取原始的API响应内容，对比issue中提供的示例格式，确认是否带有`event: `和`data: `前缀。
3. 查阅FastGPT官方文档中关于流式输出的协议说明，确认默认的响应格式类型。
4. 检查业务侧的响应解析逻辑，确认是否需要适配SSE格式的响应内容。

## 解决与验证
如果业务侧需要纯JSON格式的流式数据，可在接收响应时先剥离`event: answer\n`和`data: `前缀，再对剩余内容进行JSON解析；对于结束标记`data: [DONE]`，可直接忽略。验证方式为：调整响应解析逻辑后，重新发起带`stream: true`的请求，确认返回的每条内容可被正常解析为JSON格式，无额外前缀干扰。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4287)
