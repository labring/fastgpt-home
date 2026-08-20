---
title: FastGPT从旧版本升级到V4.4.2的操作步骤说明
slug: /zh/deploy/fastgpt-v442-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/442
source_type: 官方文档
---

# FastGPT从旧版本升级到V4.4.2的操作步骤说明

FastGPT V4.4.2版本的升级需要执行专属的初始化API操作，用于修复Mongo数据库中Bill表的过期时间索引错误，该操作是从旧版本升级到V4.4.2的必要步骤。

### 升级操作步骤
需发起1个POST类型的HTTP请求，请求地址为`https://{{host}}/api/admin/initv442`，同时携带两个请求头：
1.  `rootkey: {{rootkey}}`，其中`{{rootkey}}`的值为部署环境中配置的rootkey环境变量；
2.  `Content-Type: application/json`。

可使用curl命令执行该请求，示例如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv442 \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
其中`{{host}}`为你部署的FastGPT服务的访问地址，`{{rootkey}}`需替换为实际的rootkey环境变量值。

该请求的作用是初始化Mongo的Bill表索引，修复此前过期时间设置有误的问题，执行完成后即完成V4.4.2版本升级的相关数据库配置工作。执行该请求前，请确保FastGPT服务处于正常运行状态，且能够正常访问该API接口。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/442)
