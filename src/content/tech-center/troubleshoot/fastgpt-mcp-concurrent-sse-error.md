---
title: FastGPT并发调用MCP工具时SSE 400报错的排错方案
slug: /zh/troubleshoot/fastgpt-mcp-concurrent-sse-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6393
source_type: GitHub issue
---

# FastGPT并发调用MCP工具时SSE 400报错的排错方案

## 现象
在FastGPT v4.14.6私有部署环境中，成功连通远端MCP服务且单个工具串行调用正常，但在工作流编排时，若从同一节点连接该MCP服务的两个及以上工具并发调用，会出现SSE报错。报错信息为`message: 'SSE error: Non-200 status code (400)'`，配套堆栈日志显示错误源自`@modelcontextprotocol/sdk@1.25.2`的SSE客户端代码。

## 可能原因
结合报错场景与日志信息，推测可能为并发调用时MCP客户端的SSE连接资源竞争或复用异常，导致远端MCP服务端返回400状态码，具体根因需按实际环境确认。

## 排查步骤
1.  确认当前FastGPT版本为v4.14.6，且使用的MCP依赖版本为`"@modelcontextprotocol/sdk": "^1.25.2"`。
2.  复现问题：在工作流中配置从同一节点连接MCP的多个工具，触发并发调用，观察是否出现指定报错。
3.  对比测试：将并发调用改为串行调用，确认是否不再报错，验证问题与并发场景强相关。
4.  查看MCP服务端日志，确认是否接收到并发请求及返回400的具体原因（需按实际环境确认）。

## 解决与验证
目前可通过临时规避方案缓解问题：将MCP工具节点调整为串行调用，避免并发请求。若需支持并发调用，需排查MCP服务端的并发请求限制、FastGPT的MCP客户端配置，或等待官方修复。验证方式为：修改工作流为串行调用后，再次触发多工具调用，确认无SSE 400报错；或排查修复并发请求的根因后，验证并发调用正常。

> 来源：[FastGPT GitHub Issue #6393](https://github.com/labring/FastGPT/issues/6393)
