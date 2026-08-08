---
title: FastGPT旧版本升级至V4.4.2的具体操作指南
slug: /zh/deploy/fastgpt-upgrade-v442
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/442
source_type: 官方文档
---

# FastGPT旧版本升级至V4.4.2的具体操作指南

本页面向自部署FastGPT并需要升级到V4.4.2版本的用户，该版本存在Mongo数据库Bill表索引过期时间配置错误的问题，需通过官方提供的初始化API完成修复，确保升级后系统正常运行。该操作仅针对V4.4.2版本的升级流程，不适用于其他版本的版本更新或常规数据库维护。

## 执行升级初始化API
该操作需发起1个HTTP POST请求，请求地址为`https://{{host}}/api/admin/initv442`，请求时必须携带两个请求头：1. `rootkey: {{rootkey}}`，其中`{{rootkey}}`为部署时配置的环境变量值；2. `Content-Type: application/json`。你可以通过以下curl命令快速发起请求：
```bash
curl --location --request POST https://{{host}}/api/admin/initv442 \
--header "rootkey: {{rootkey}}" \
--header "Content-Type: application/json"
```
该请求执行后会自动初始化Mongo的Bill表索引，修复此前过期时间有误的问题，无需额外手动操作数据库。

## 操作注意事项
该初始化API仅可用于升级到V4.4.2版本的场景，请勿在其他版本的FastGPT中执行该请求，否则可能导致数据库异常。发起请求前需确认`{{host}}`为你的FastGPT部署服务的实际访问地址，`{{rootkey}}`为正确的环境变量值，若请求返回错误，需检查这两个参数是否配置正确，以及网络是否可以正常访问该API端点。此外，该操作不会直接修改业务数据，但建议在执行前完成系统备份以规避潜在风险。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/442
