---
title: 介绍FastGPT中APIKey的定义与配置使用方法
slug: /zh/glossary/fastgpt-apikey-usage-guide
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi
source_type: 官方文档
---

# 介绍FastGPT中APIKey的定义与配置使用方法

## 一句话定义
APIKey是FastGPT用于身份验证的密钥凭证，可用于openapi接口调用及团队资源权限管理。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
openapi接口调用场景下，需配置两个核心参数：OPENAI_API_BASE_URL需替换为自身部署的FastGPT域名，OPENAI_API_KEY为获取到的APIKey。请求体可直接传入appId完成身份验证；若第三方应用仅支持配置密钥，可使用apiKey-appId的兼容格式进行配置。团队资源管理场景下，可通过团队权限管理功能创建、删除团队APIKey，该操作属于团队的基础管理权限范畴。

## 容易搞错的地方
一是配置openapi调用时，未将OPENAI_API_BASE_URL替换为自身部署的域名，导致接口请求无法正常连通。二是当第三方应用仅支持配置密钥时，未使用apiKey-appId的兼容格式，仅传入纯APIKey导致身份验证失败。三是混淆普通APIKey与团队APIKey的使用场景，团队APIKey仅可用于团队资源相关的管理操作，不可直接用于普通对话接口调用。

> [FastGPT OpenAPI 发布文档](https://doc.fastgpt.cn/zh-CN/guide/build/publish/openapi), [FastGPT 团队权限文档](https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
