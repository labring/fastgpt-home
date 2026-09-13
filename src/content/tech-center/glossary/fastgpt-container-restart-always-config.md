---
title: FastGPT容器restart: always自动重启参数配置速查
slug: /zh/glossary/fastgpt-container-restart-always-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/admin/sso
source_type: 官方文档
---

# FastGPT容器restart: always自动重启参数配置速查

## 一句话定义
restart: always是FastGPT相关容器部署时用于配置容器自动重启的参数，可在docker-compose配置中设置，确保容器异常退出后自动恢复运行。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在docker-compose.yml文件的服务配置块中添加restart: always字段。部署SSO服务时，需在fastgpt-sso服务配置中添加该参数，同时配置镜像地址为registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sso-service:v4.14.16，设置container_name为fastgpt-sso，加入fastgpt网络，并配置SSO_PROVIDER、AUTH_TOKEN等环境变量。部署MCP server服务时，可在fastgpt-mcp-server服务配置中添加该参数，配置镜像地址为ghcr.io/labring/fastgpt-mcp_server:v4.9.6，设置container_name为fastgpt-mcp-server，映射端口3005:3000，加入fastgpt网络，并配置FASTGPT_ENDPOINT环境变量。

## 容易搞错的地方
需确保docker-compose.yml的语法格式正确，环境变量的配置需严格符合对应服务的要求。例如SSO服务的AUTH_TOKEN为鉴权信息，不可随意填写；MCP server服务的FASTGPT_ENDPOINT需填写FastGPT的正确访问地址。该参数仅适用于docker-compose部署的FastGPT相关容器，不适用于其他部署方式。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/admin/sso)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
