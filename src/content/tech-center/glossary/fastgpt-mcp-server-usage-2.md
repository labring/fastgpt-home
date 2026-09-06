---
title: 介绍FastGPT中MCP Server的定义与配置方法
slug: /zh/glossary/fastgpt-mcp-server-usage-2
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server
source_type: 官方文档
---

# 介绍FastGPT中MCP Server的定义与配置方法

## 一句话定义
FastGPT MCP Server是基于Model Context Protocol，可对外提供调用FastGPT已构建应用能力的服务，支持Streamable HTTP协议，私有化部署可通过独立服务兼容SSE协议。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
需配置两个核心参数：OPENAI_API_BASE_URL设为自身部署的FastGPT域名对应地址，格式为http://localhost:3000/api（替换为实际部署域名）；OPENAI_API_KEY推荐在请求体中传入appId，若第三方应用仅支持配置密钥，可使用apiKey-appId的兼容格式。FastGPT MCP Server默认支持Streamable HTTP协议，私有化部署场景可通过独立MCP Server服务兼容SSE协议。

## 容易搞错的地方
易混淆MCP协议的Client与Server角色，误将FastGPT MCP Server当作调用外部系统的Client端使用；易忽略私有化部署下的SSE协议兼容能力；配置密钥时未按要求使用apiKey-appId兼容格式，导致第三方应用无法正常发起调用。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
