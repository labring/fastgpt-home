---
title: FastGPT团队成员身份认证与MongoDB报错排查指南
slug: /zh/glossary/fastgpt-member-auth-troubleshoot
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server
source_type: 官方文档
---

# FastGPT团队成员身份认证与MongoDB报错排查指南

## 一句话定义
FastGPT中的member包含两类场景，一是用于MCP服务身份认证的团队成员，二是MongoDB副本集或mongos路由节点的组成成员。

## 在 FastGPT 里怎么用
配置MCP服务时，需通过两种请求头完成身份认证：`x-fastgpt-auth-proxy-username`（推荐使用，通常为成员登录邮箱）或`x-fastgpt-auth-proxy-tmb-id`（FastGPT团队成员ID），二者任选其一，同时使用需指向同一团队成员。配置时可在MCP配置的`headers`字段添加对应请求头，例如使用Streamable HTTP地址的配置需包含对应请求头。SSE地址的身份认证需在建立连接时携带请求头，修改请求头后需断开并重新连接；Streamable HTTP模式会逐次读取请求头，无需重启连接。当出现报错"Transaction numbers are only allowed on a replica set member or mongos"时，需确认MongoDB部署为副本集或使用mongos路由节点。

## 容易搞错的地方
MCP身份认证的两个请求头不可同时使用非同一成员的信息，否则会导致身份验证失败。SSE模式下修改代理身份后必须断开重连，否则新的请求头不会生效。MongoDB单机部署无法支持事务操作，当通过URL导入知识库出现指定报错时，需调整MongoDB部署架构至副本集或mongos模式。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
