---
title: 解决FastGPT绑定Postgre MCP查询数据报错的问题
slug: /zh/troubleshoot/fastgpt-postgre-mcp-connect-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6509
source_type: GitHub issue
---

# 解决FastGPT绑定Postgre MCP查询数据报错的问题

## 现象
使用FastGPT的Agent绑定Postgre MCP后，执行数据查询操作无法获取到数据，FastGPT后台会输出如下MCP工具调用失败的错误日志：
```
fastgpt             | 2026-03-05 11:11:39   ERR app:mcp-tools        MCP client tool call failed: {
fastgpt             |                                                  requestId: '4ba32580-e2e4-4e72-95fa-fab8d6674459',
fastgpt             |                                                  url: 'http://mcp-pg-pro:8000/sse',
fastgpt             |                                                  toolName: 'get_object_details',
fastgpt             |                                                  error: Error: Already connected to a transport. Call close() before connecting to a new transport, or use a separate Protocol instance per connection.
fastgpt             |                                                      at Client.connect (file:///app/node_modules/.pnpm/@modelcontextprotocol+sdk@1.26.0_zod@4.1.12/node_modules/@modelcontextprotocol/sdk/dist/esm/shared/protocol.js:217:19)
fastgpt             |                                                      at Client.connect (file:///app/node_modules/.pnpm/@modelcontextprotocol+sdk@1.26.0_zod@4.1.12/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js:286:21)
fastgpt             |                                                      at g.getConnection (/app/projects/app/.next/server/pages/api/core/app/mcpTools/runTool.js:4:2088)
fastgpt             |                                                      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
fastgpt             |                                                      at async g.toolCall (/app/projects/app/.next/server/pages/api/core/app/mcpTools/runTool.js:4:3432)
fastgpt             |                                                      at async Object.I [as tool] (/app/projects/app/.next/server/chunks/49869.js:2069:12737)
fastgpt             |                                                      at async /app/projects/app/.next/server/chunks/49869.js:2070:6335
fastgpt             |                                                      at async $.nodeRunWithActive (/app/projects/app/.next/server/chunks/49869.js:2070:6201)
fastgpt             |
```
核心报错文本为`Error: Already connected to a transport. Call close() before connecting to a new transport, or use a separate Protocol instance per connection.`。

## 可能原因
根据报错提示，该问题的根本原因是MCP客户端尝试重复连接同一个传输通道：要么是在建立新连接前没有关闭已存在的旧连接，要么是没有为每个独立的连接请求创建单独的Protocol实例。

## 排查步骤
1.  查看FastGPT后台的MCP工具调用错误日志，确认核心报错文本是否包含`Already connected to a transport`相关内容。
2.  检查MCP客户端的连接逻辑，确认是否存在未主动关闭旧连接就发起新连接的操作。
3.  核对MCP服务的部署与配置，确认是否存在连接复用或并发连接未正确隔离的情况（需按实际环境确认）。
4.  检查FastGPT中MCP工具的调用代码，确认是否为每个连接请求创建了独立的Protocol实例（需按实际代码逻辑确认）。

## 解决与验证
### 解决方法
可通过两种方式修复该问题：
1.  在发起新的MCP连接前，先调用已存在连接的`close()`方法关闭旧连接。
2.  为每个独立的连接请求创建单独的Protocol实例。
### 验证方法
修改完成后，重新发起Postgre MCP的数据查询操作，确认可以正常获取到数据，且FastGPT后台不再输出该重复连接的错误日志。

> 来源：[FastGPT GitHub Issue #6509](https://github.com/labring/FastGPT/issues/6509)
