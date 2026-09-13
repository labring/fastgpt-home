---
title: FastGPT V4.1版本从旧版本升级的操作与验证说明
slug: /zh/deploy/upgrade-v4-1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/41
source_type: 官方文档
---

# FastGPT V4.1版本从旧版本升级的操作与验证说明

## 这个版本改了什么
V4.1版本优化了PostgreSQL和MongoDB的连接配置，仅需填写单个URL即可完成数据库连接。同时重新设置了对话存储结构，从旧版本升级至该版本时，需初始化原有存储内容。

## 升级前要确认的事
需确认原有MongoDB的数据库名称为fastgpt，PostgreSQL的数据库名称为postgres，需与后续配置的变量对应。需记录环境变量中的rootkey值，用于后续初始化请求的身份验证。若MongoDB连接失败，可尝试移除连接字符串中的`?authSource=admin`参数。

## 升级步骤（照做）
1. 更新环境变量，使用以下配置：
```bash
# mongo 配置，不需要改. 如果连不上，可能需要去掉 ?authSource=admin
- MONGODB_URI=mongodb://[REDACTED_CREDENTIAL]@mongo:27017/fastgpt?authSource=admin
# pg配置. 不需要改
- PG_URL=postgresql://[REDACTED_CREDENTIAL]@pg:5432/postgres
```
2. 部署新版FastGPT项目。
3. 发起携带`headers.rootkey`（值为环境变量中的rootkey）的HTTP请求，请求地址为`https://xxxxx/api/admin/initChatItem`。

## 升级后怎么验证
可通过发起普通对话请求，确认对话功能可正常加载与使用。同时可检查数据库中对话存储的结构是否已更新为V4.1的新格式，确保初始化操作已完成。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/41)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
