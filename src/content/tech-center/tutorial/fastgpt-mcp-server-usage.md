---
title: FastGPT MCP Server 功能的配置与调用说明
slug: /zh/tutorial/fastgpt-mcp-server-usage
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server
source_type: 官方文档
---

# FastGPT MCP Server 功能的配置与调用说明

MCP 协议（Model Context Protocol）由 Anthropic 在 2024 年 11 月初发布，其核心目的是统一 AI 模型与外部系统之间的通信方式，简化跨系统通信流程。随着 OpenAI 官宣支持 MCP 协议，目前已有多家 AI 厂商加入该协议的支持阵营。MCP 协议主要包含 Client 与 Server 两个核心部分，Client 为使用 AI 模型的一方，可通过 MCP Client 为模型提供调用外部系统的能力；Server 为提供外部系统调用的一方，实际运行外部系统相关的服务。

## FastGPT MCP Server 功能说明
FastGPT MCP Server 功能允许选择多个在 FastGPT 上构建完成的应用，以 MCP 协议对外提供调用这些 FastGPT 应用的能力。用户可通过该功能，将已部署的 AI 应用以标准化的 MCP 协议接口形式对外暴露，适配不同的调用场景。

## 协议配置与支持
FastGPT 原生支持 Streamable HTTP 协议。针对私有化部署场景，可通过独立的 MCP Server 服务提供兼容的 SSE 协议。不同的协议类型可适配不同的调用需求，用户可根据实际部署环境选择合适的协议方案。

## 配置与启用流程
1. 选择FastGPT平台上已构建完成的多个应用
2. 开启FastGPT MCP Server功能
3. 根据部署环境选择对应协议：公有部署使用Streamable HTTP协议；私有化部署可通过独立MCP Server服务获取兼容的SSE协议支持

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
