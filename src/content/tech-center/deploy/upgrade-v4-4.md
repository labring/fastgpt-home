---
title: FastGPT V4.4版本升级初始化操作说明
slug: /zh/deploy/upgrade-v4-4
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/44
source_type: 官方文档
---

# FastGPT V4.4版本升级初始化操作说明

## 这个版本改了什么
V4.4版本的升级流程新增了专属初始化操作，需通过调用指定的HTTP接口完成Mongo数据库部分字段的初始化，以此适配新版本的业务数据结构要求，保障系统功能正常运行。

## 升级前要确认的事
升级前需明确FastGPT服务的部署主机地址，同时确认已获取环境变量中配置的rootkey值。该rootkey值是初始化请求的必填身份验证头参数，需正确携带在请求中。

## 升级步骤（照做）
需发起符合要求的HTTP POST请求，完整命令需保留所有占位符原样：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv44' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```

## 升级后怎么验证
升级操作执行完成后，可通过检查Mongo数据库中对应业务模块的字段是否已完成初始化，确认本次初始化操作是否成功。若对应字段已生成，则说明初始化流程已顺利完成。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/44)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
