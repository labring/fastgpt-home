---
title: FastGPT私有部署时MCP getTools调用失败的排错指南
slug: /zh/troubleshoot/fastgpt-mcp-gettools-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/7047
source_type: GitHub issue
---

# FastGPT私有部署时MCP getTools调用失败的排错指南

## 现象
在FastGPT V4.14.9私有部署环境中，接入Streamable HTTP MCP endpoint时，`runTool`可正常执行并返回200状态码，但`getTools`调用失败。后端日志显示：`getTools`阶段先尝试StreamableHTTP连接，失败后回退到SSE请求；由于目标MCP endpoint不支持SSE GET请求，最终返回405错误，同时`/api/core/app/mcpTools/getTools`接口返回500。单独测试该MCP endpoint可知：POST initialize、POST tools/list请求均可成功，GET和SSE GET请求返回405状态码。

## 可能原因
FastGPT的`getTools`调用链路在执行时，会先尝试StreamableHTTP连接，当连接失败后自动回退到SSE请求。而本次的MCP endpoint仅支持POST类请求，不支持SSE GET请求，因此触发405错误，最终导致`getTools`接口返回500。而`runTool`调用未触发SSE回退逻辑，因此可以正常执行。

## 排查步骤
1. 确认当前使用的FastGPT版本为私有部署V4.14.9，明确接入的MCP endpoint类型为Streamable HTTP。
2. 查看FastGPT后端日志，检查是否存在`StreamableHTTP connect failed, falling back to SSE`、`SSE error: Non-200 status code (405)`以及`/api/core/app/mcpTools/getTools - 500`的报错内容。
3. 单独向目标MCP endpoint发送各类请求：包括POST initialize、POST tools/list、GET请求、SSE GET请求，确认各请求的返回状态码与结果。
4. 核对目标MCP endpoint支持的请求方法，确认是否仅支持POST请求，不支持GET或SSE GET请求。

## 解决与验证
解决方面，需按实际环境确认可行方案：一是调整目标MCP endpoint，使其支持SSE GET请求；二是修改FastGPT的`getTools`调用逻辑，禁用SSE回退机制（具体配置需按实际环境确认）。验证时，重新调用`getTools`接口，查看后端日志是否不再出现SSE相关报错，且接口返回200状态码并正确获取工具列表，同时确认`runTool`调用仍可正常执行。

> 来源：https://github.com/labring/FastGPT/issues/7047
