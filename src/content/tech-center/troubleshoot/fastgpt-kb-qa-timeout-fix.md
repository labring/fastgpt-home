---
title: 解决FastGPT连续知识库问答请求超时60秒断开问题
slug: /zh/troubleshoot/fastgpt-kb-qa-timeout-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/955
source_type: GitHub issue
---

# 解决FastGPT连续知识库问答请求超时60秒断开问题

## 现象
用户连续进行FastGPT知识库问答时，请求时长超过60秒就会出现连接断开。FastGPT容器日志显示报错信息`message: 'Premature close'`，同时存在`[ERROR] 2024-03-08 09:35:03 sse error: Premature close`的记录，日志还记录了`completions running time: 63.616s`的运行时长。通过Java调用FastGPT时，会出现`sse连接异常`，报错信息为`org.apache.catalina.connector.ClientAbortException: java.io.IOException: Broken pipe`。

## 可能原因
该问题大概率由请求超时配置导致。当知识库问答的处理时长超过配置的超时阈值时，连接会被强制断开，从而触发`Premature close`和`Broken pipe`相关报错。

## 排查步骤
1.  查看FastGPT容器的运行日志，确认是否存在`Premature close`报错以及`completions running time`超过60秒的记录。
2.  检查调用FastGPT的服务（如Java服务）的SSE连接超时配置，确认是否存在60秒的超时限制。
3.  核对FastGPT部署中的请求超时相关配置项，确认是否有设置请求超时时长。
4.  测试单次知识库问答的处理时长，判断是否确实超过60秒触发连接断开。

## 解决与验证
需根据实际部署环境找到FastGPT或调用链路中的请求超时配置参数，将其调整为大于实际问答处理时长的数值。调整完成后，再次进行长时间的知识库问答测试，确认请求时长超过60秒时不再出现连接断开，且不再出现`Premature close`和`org.apache.catalina.connector.ClientAbortException: java.io.IOException: Broken pipe`相关报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/955)
