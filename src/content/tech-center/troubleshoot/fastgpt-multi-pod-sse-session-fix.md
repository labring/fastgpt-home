---
title: 解决FastGPT多Pod部署场景下SSE会话不连贯问题
slug: /zh/troubleshoot/fastgpt-multi-pod-sse-session-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4662
source_type: GitHub issue
---

# 解决FastGPT多Pod部署场景下SSE会话不连贯问题

## 现象
在FastGPT 4.9.6私有部署多Pod的mcp_server场景中，使用SSEServerTransport时，当负载均衡将初始SSE请求与后续POST请求分发到不同Pod，会出现请求挂起直至超时的问题，会话连贯性被破坏。

## 可能原因
系统将会话状态存储在单个Pod的内存transportMap中，不同Pod无法共享该存储。当后续POST请求被路由到其他Pod时，无法在当前Pod的transportMap中找到对应的transport实例，导致请求无法正常处理并挂起超时，无法支持容器环境下的水平扩展。

## 排查步骤
1. 确认当前部署为私有部署多Pod的mcp_server服务，版本号为4.9.6；
2. 配置负载均衡分发请求，使用客户端发起首次SSE连接后，再发送POST请求；
3. 观察客户端是否出现请求挂起超时的情况；
4. 查看当前处理POST请求的Pod日志，确认日志中提示未找到对应sessionId的transport实例；
5. 通过Pod标识或请求日志确认两次请求被分发到了不同的Pod。

## 解决与验证
可通过引入分布式共享存储（如Redis）替代本地内存存储会话状态来解决问题。具体操作包括：
1. 使用Redis存储会话相关的transport信息，替换原有的本地transportMap；
2. 调整SSE端点与POST端点的逻辑，不再依赖本地内存缓存transport实例，改为从Redis获取会话数据；
3. 为每个请求创建新的transport实例，采用无状态模式处理请求；
4. 为Redis中的会话数据配置合理的TTL，定期清理过期会话。
验证方式：部署多Pod环境，通过负载均衡分发请求，确认初始SSE请求与后续POST请求路由到不同Pod时，不再出现挂起超时，会话可正常连贯工作。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4662)
