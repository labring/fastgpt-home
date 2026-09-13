---
title: FastGPT V4.4.2版本升级操作及验证说明
slug: /zh/deploy/upgrade-v4-4-2
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/442
source_type: 官方文档
---

# FastGPT V4.4.2版本升级操作及验证说明

## 这个版本改了什么
V4.4.2版本修复了Mongo数据库中Bill表的索引过期时间错误问题，需通过指定初始化API完成该修复配置。

## 升级前要确认的事
升级前需要确认已获取rootkey环境变量值，以及FastGPT服务的访问地址{{host}}，这两个参数将用于后续发起初始化请求。

## 升级步骤（照做）
发起1个HTTP POST请求，需携带`headers.rootkey`（值为环境变量中的rootkey）和`Content-Type: application/json`请求头。具体请求地址为`https://{{host}}/api/admin/initv442`，对应的curl命令如下：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv442' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```

## 升级后怎么验证
升级完成后，可通过检查Mongo数据库中Bill表的索引配置，确认过期时间已修正完成，即完成本次升级验证。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/442)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
