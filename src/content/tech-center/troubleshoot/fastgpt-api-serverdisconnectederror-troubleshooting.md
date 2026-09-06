---
title: 解决FastGPT API调用出现ServerDisconnectedError并发报错问题
slug: /zh/troubleshoot/fastgpt-api-serverdisconnectederror-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4076
source_type: GitHub issue
---

# 解决FastGPT API调用出现ServerDisconnectedError并发报错问题

## 现象
Docker 4.9版本环境下，在2核4G、4核16G配置的宝塔面板服务器中，FastGPT API调用出现`Server disconnected (类型: ServerDisconnectedError)`报错。当并发数设置为15，并发量达到10时即触发该错误。使用FastGPT云端服务API时，也出现了相同的报错。

## 可能原因
FastGPT API本身的并发限制被排除，因云端服务经50并发测试无报错。剩余可能的原因包括本地调用代码的请求配置或逻辑缺陷、服务器端网络连接或资源限制。

## 排查步骤
1.  测试FastGPT云端服务的并发调用表现，确认是否为FastGPT API本身的问题。
2.  检查本地异步调用代码的请求超时配置、并发控制逻辑。
3.  核对服务器的网络连接状态与资源使用情况。
4.  整理完整的调用代码、测试环境参数，提交至指定渠道协助排查。

## 解决与验证
若验证云端服务无并发问题，则需调整本地调用配置：检查异步请求的超时设置、补全重试逻辑的实现；逐步降低并发请求数量，测试并发阈值。调整后重新发起并发请求，确认`Server disconnected`错误不再出现，即为验证通过。

> 来源: [FastGPT GitHub issue #4076](https://github.com/labring/FastGPT/issues/4076)
