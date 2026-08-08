---
title: FastGPT从旧版本升级至V4.4.1的操作指南
slug: /zh/deploy/fastgpt-v441-upgrade-guide-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/441
source_type: 官方文档
---

# FastGPT从旧版本升级至V4.4.1的操作指南

## 升级适用场景与前置准备
本文档仅适用于将FastGPT自部署版本从旧版本升级至V4.4.1的场景，仅面向已完成基础部署的工程师与技术选型人员。该升级操作仅针对Mongo数据库的dataset.files集合进行初始化，不会修改其他业务数据，但仍建议在升级前完成全量数据备份，避免意外情况。需提前获取环境变量中的rootkey值，该值为系统后台的关键验证密钥，需妥善保管，执行请求时必须携带该参数，否则会触发身份验证失败的报错。

## 执行升级初始化操作
该升级的核心步骤为发起指定的HTTP POST请求，具体流程如下：
1. 确认当前FastGPT服务已正常启动，且可通过指定域名或IP访问`/api/admin/initv441`接口。
2. 复制以下命令，替换其中的`{{host}}`为你的服务部署域名或IP地址，`{{rootkey}}`替换为环境变量中配置的rootkey值：
```bash
curl --location --request POST https://{{host}}/api/admin/initv441 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
3. 在终端执行修改后的命令，等待请求完成。该请求会自动将Mongo数据库中dataset.files集合的所有数据标记为可用状态，执行过程中请勿中断请求或关闭终端。

## 升级注意事项与边界
执行该升级操作前，需确认当前运行的FastGPT版本低于V4.4.1，若已升级至更高版本，执行该操作可能会引发数据异常。若请求返回`401 Unauthorized`报错，需检查rootkey值是否正确，或确认环境变量是否已正确配置。若请求超时，需检查网络连接是否正常，以及服务端口是否对外开放。该升级脚本仅适用于自部署场景，且仅针对V4.4.1版本的初始化需求，其他版本的升级需参考对应版本的操作文档。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/441
