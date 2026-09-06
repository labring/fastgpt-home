---
title: 解决FastGPT出现Redis连接拒绝与请求重试超限报错的问题
slug: /zh/troubleshoot/fastgpt-redis-retry-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4770
source_type: GitHub issue
---

# 解决FastGPT出现Redis连接拒绝与请求重试超限报错的问题

## 现象
2025年5月8日07:43:58起，系统先后出现两类报错：首先是SSE错误，提示`"Reached the max retries per request limit (which is 20). Refer to \"maxRetriesPerRequest\" option for details"`；随后出现多次Redis连接错误，报错信息为`"connect ECONNREFUSED 127.0.0.1:6379"`。同时，接口`/api/core/chat/chatTest`的请求耗时6533ms后完成，后续还出现队列执行完成的日志。

## 可能原因
1.  本地Redis服务未正常启动，导致无法连接到127.0.0.1:6379端口，触发连接拒绝报错。
2.  FastGPT的Redis连接配置存在错误，指向的地址或端口与实际运行的Redis服务不匹配。
3.  由于Redis连接持续失败，系统触发了请求重试机制，当重试次数达到配置的`maxRetriesPerRequest`上限（20次）后，触发SSE报错。

## 排查步骤
1.  检查本地Redis服务的运行状态，确认服务是否正常启动。
2.  核对FastGPT的Redis连接配置参数，确认配置的地址和端口是否为`127.0.0.1:6379`，且与实际部署的Redis服务一致。
3.  查看系统完整日志，定位报错出现的上下文，确认报错与`/api/core/chat/chatTest`接口调用的关联关系。
4.  检查服务器的本地连接限制，确认6379端口未被阻止访问。

## 解决与验证
首先解决Redis连接问题：若Redis服务未启动，启动Redis服务；若配置参数有误，修改为与实际Redis服务匹配的地址和端口。其次，根据报错提示，调整`maxRetriesPerRequest`参数的阈值，避免因频繁重试触发报错。完成配置修改后，重启FastGPT服务，调用`/api/core/chat/chatTest`接口，查看日志是否不再出现Redis连接拒绝和请求重试超限的报错，确认接口调用正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4770)
