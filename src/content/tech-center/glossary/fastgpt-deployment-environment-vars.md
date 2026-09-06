---
title: 介绍FastGPT部署中环境变量的配置规则与用法
slug: /zh/glossary/fastgpt-deployment-environment-vars
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/admin/sso
source_type: 官方文档
---

# 介绍FastGPT部署中环境变量的配置规则与用法

## 一句话定义
环境变量是FastGPT部署附属服务时，用于指定服务运行参数的配置项。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
部署FastGPT附属服务时，需在docker-compose.yml文件的对应服务模块中添加environment字段，并使用官方推荐的镜像版本，例如fastgpt-sso使用registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sso-service:v4.14.16，fastgpt-mcp-server使用ghcr.io/labring/fastgpt-mcp_server:v4.9.6。部署fastgpt-sso服务时，需配置SSO_PROVIDER、AUTH_TOKEN等参数，其中AUTH_TOKEN仅在fastgpt-pro版本中使用，需根据对接的SSO提供商配置对应专属环境变量，支持飞书、企业微信、钉钉、Saml2.0、Oauth2.0等协议，其中飞书与企业微信同时支持SSO与成员同步功能。部署fastgpt-mcp-server服务时，需配置FASTGPT_ENDPOINT参数，示例值为http://fastgpt:3000，用于指定FastGPT主服务的访问地址。

## 容易搞错的地方
部分环境变量仅适配特定FastGPT版本，例如AUTH_TOKEN仅支持fastgpt-pro版本。配置FASTGPT_ENDPOINT时需确保地址可被对应服务访问，且需与FastGPT主服务处于同一网络，避免服务间通信失败。不同附属服务的环境变量参数不可混用，例如fastgpt-sso的环境变量不可直接套用至fastgpt-mcp-server服务。使用非官方推荐的镜像版本可能导致环境变量配置失效，需严格遵循官方给出的镜像版本要求。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/admin/sso)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
