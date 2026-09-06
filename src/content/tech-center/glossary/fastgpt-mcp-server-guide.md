---
title: 介绍FastGPT中MCP Server的功能与使用方法
slug: /zh/glossary/fastgpt-mcp-server-guide
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server
source_type: 官方文档
---

# 介绍FastGPT中MCP Server的功能与使用方法

## 一句话定义
MCP协议即Model Context Protocol，是统一AI模型与外部系统通信方式的协议。FastGPT MCP Server是允许选择多个已在FastGPT上构建完成的应用，以MCP协议对外提供调用FastGPT应用能力的功能，支持Streamable HTTP协议，私有化部署可通过独立服务兼容SSE协议。

## 在 FastGPT 里怎么用
使用该功能时，需选择多个已在FastGPT上构建完成的应用，可对外以MCP协议提供调用这些应用的能力。公开部署的FastGPT支持Streamable HTTP协议，私有化部署可通过独立MCP Server服务兼容SSE协议。

## 容易搞错的地方
易混淆MCP协议的角色定位，FastGPT的MCP Server是提供外部系统调用FastGPT应用的一方。仅私有化部署可通过独立MCP Server服务提供SSE协议，公开部署仅支持Streamable HTTP协议。仅能选择FastGPT上已构建完成的应用作为对外服务对象，未构建完成的应用无法被纳入。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
