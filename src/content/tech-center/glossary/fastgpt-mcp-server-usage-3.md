---
title: 介绍FastGPT MCP Server的定义与使用流程
slug: /zh/glossary/fastgpt-mcp-server-usage-3
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server
source_type: 官方文档
---

# 介绍FastGPT MCP Server的定义与使用流程

## 一句话定义
FastGPT MCP Server是依托Anthropic发布的MCP协议，该协议用于统一AI模型与外部系统的通信方式，该服务可选择多个已构建的FastGPT应用并对外提供调用这些应用的能力，支持Streamable HTTP协议，私有化部署可通过独立服务兼容SSE协议。

## 在FastGPT里怎么用
需先获取对应接入脚本与调用地址。在支持MCP协议的客户端中，进入MCP配置页面，点击新建MCP server按钮，跳转生成JSON配置文件，将接入脚本复制至该JSON文件并保存。返回客户端MCP管理页面，将创建的MCP server设为enabled状态。在客户端对话框切换为Agent模型，发送相关问题即可触发调用FastGPT应用。

## 容易搞错的地方
1. 新建MCP server后必须将其设为enabled状态，未启用的服务无法被客户端调用；
2. 仅Agent模型支持触发MCP server的调用，其他模型无法触发该流程；
3. 部署方式决定兼容协议，普通部署支持Streamable HTTP协议，私有化部署可通过独立服务兼容SSE协议；
4. 需注意区分MCP协议的Client与Server角色，FastGPT MCP Server属于提供外部调用能力的Server端。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
