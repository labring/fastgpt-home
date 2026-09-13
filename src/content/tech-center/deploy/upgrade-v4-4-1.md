---
title: FastGPT V4.4.1版本升级初始化操作与验证说明
slug: /zh/deploy/upgrade-v4-4-1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/441
source_type: 官方文档
---

# FastGPT V4.4.1版本升级初始化操作与验证说明

## 这个版本改了什么
本版本升级需执行专属初始化操作，调用指定API完成Mongo数据库的dataset.files集合初始化，将集合内所有数据设置为可用状态，完成版本适配的基础数据配置。

## 升级前要确认的事
升级前需确认已获取正确的rootkey环境变量值，该值将作为请求的身份验证凭证。同时需明确FastGPT服务的部署域名或IP地址，用于构造初始化请求的目标地址。

## 升级步骤（照做）
通过终端执行以下HTTP POST请求，需严格保留参数格式：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv441' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
其中{{host}}替换为FastGPT服务的实际部署地址，{{rootkey}}替换为环境变量中获取的rootkey值。

## 升级后怎么验证
执行初始化请求后，可通过查看Mongo数据库的dataset.files集合，确认所有数据已被设置为可用状态，完成本次升级初始化操作的验证。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/441)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
