---
title: 解决FastGPT工作流中MCP工具调用连接超时报错问题
slug: /zh/troubleshoot/fastgpt-mcp-call-timeout-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5920
source_type: GitHub issue
---

# 解决FastGPT工作流中MCP工具调用连接超时报错问题

## 现象
在FastGPT 4.14.1私有部署版本的工作流中，使用“工具调用”节点连接MCP工具时，出现如下报错：
```
[Error] 2025-11-14 02:40:01 [MCP Client] Failed to call tool demandclarification:
{
  message: 'SSE error: TypeError: fetch failed: Connect Timeout Error',
  stack: 'Error: SSE error: TypeError: fetch failed: Connect Timeout Error\n' +
    '    at _eventSource.onerror (file:///app/node_modules/.pnpm/@modelcontextprotocol+sdk@1.12.2/node_modules/@modelcontextprotocol/sdk/dist/esm/client/sse.js:71:31)\n' +
    '    at EventSource.scheduleReconnect_fn (file:///app/node_modules/.pnpm/eventsource@3.0.6/node_modules/eventsource/dist/index.js:248:53)\n' +
    '    at file:///app/node_modules/.pnpm/eventsource@3.0.6/node_modules/eventsource/dist/index.js:98:174\n' +
    '    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)'
}
```
同时可以正常在MCP工具集中添加MCP工具。

## 可能原因
1.  FastGPT容器与MCP服务器容器之间的网络无法正常连通
2.  配置的MCP服务连接地址或端口参数存在错误
3.  宿主机防火墙或网络策略限制了跨容器的通信端口
4.  连接超时阈值设置过低，导致正常请求被判定为超时

## 排查步骤
1.  确认MCP服务容器运行状态：执行`docker ps`命令，检查fastgpt-mcp-server容器是否处于Up状态。
2.  检查容器网络配置：确认FastGPT容器与MCP容器处于同一fastgpt网络中，可通过`docker network inspect fastgpt`命令查看已连接的容器列表。
3.  验证网络连通性：进入FastGPT容器内部，执行`curl http://fastgpt-mcp-server:3000`，检查是否能正常访问MCP服务。
4.  核对配置参数：检查docker-compose.yml中fastgpt-mcp-server的FASTGPT_ENDPOINT配置，确认其指向正确的FastGPT服务地址；同时检查FastGPT中配置的MCP工具连接地址与实际服务地址一致。
5.  检查端口映射：确认docker-compose中fastgpt-mcp-server的端口映射（3005:3000）配置正确，且宿主机防火墙未拦截相关端口。
6.  调整超时配置：根据实际环境调整MCP客户端的连接超时参数，具体配置位置需按实际环境确认。

## 解决与验证
根据排查结果修复对应问题：若为网络连通问题，修复容器网络配置，确保两个服务可互相访问；若为地址配置错误，修正FASTGPT_ENDPOINT或MCP工具的连接地址；若为端口限制问题，开放对应端口或调整网络策略。验证方式为：在FastGPT的工作流中重新调用MCP工具，确认不再出现连接超时报错，同时可再次测试MCP工具的添加与调用流程是否正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5920)
