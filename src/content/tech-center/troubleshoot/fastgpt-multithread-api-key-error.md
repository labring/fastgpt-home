---
title: 解决FastGPT多线程使用同一API key访问应用报错问题
slug: /zh/troubleshoot/fastgpt-multithread-api-key-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1632
source_type: GitHub issue
---

# 解决FastGPT多线程使用同一API key访问应用报错问题

## 现象
多线程使用同一个API key同时访问FastGPT应用时，应用出现报错。直接使用相同程序访问大模型原生接口，返回结果正常。FastGPT服务日志中会出现`[ERROR] sse error: Premature close`报错，错误栈信息包含`Error: Premature close`，关联请求路径为`/api/v1/chat/completions`，该请求耗时2779ms后结束。

## 可能原因
目前该问题仅在多线程复用同一API key并发访问FastGPT应用的场景下出现，结合报错信息推测，可能与并发请求下的SSE连接处理异常有关，具体根因需结合实际部署环境进一步确认。

## 排查步骤
1. 确认当前使用的FastGPT私有部署版本为v4.8.2及以上，该版本及之前版本均存在该复现问题。
2. 检查并发请求是否使用了完全相同的API key，未对请求做并发隔离处理。
3. 查看FastGPT服务日志，确认是否存在`[ERROR] sse error: Premature close`报错，以及对应请求路径为`/api/v1/chat/completions`。
4. 单独直接调用大模型原生接口，验证接口本身无异常，排除大模型侧问题。
5. 调整并发请求的数量或请求间隔，观察报错是否不再出现。

## 解决与验证
可通过两种方式尝试解决该问题：一是为每个并发线程分配独立的API key，避免并发复用同一API key；二是在业务层对同一API key的并发请求做限流排队处理。
验证方式为：使用独立API key发起多线程并发请求，确认不再出现`[ERROR] sse error: Premature close`报错，且所有请求均能正常返回结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1632)
