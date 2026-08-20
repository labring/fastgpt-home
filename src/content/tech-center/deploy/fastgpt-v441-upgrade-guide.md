---
title: FastGPT从旧版本升级到V4.4.1的操作指南
slug: /zh/deploy/fastgpt-v441-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/441
source_type: 官方文档
---

# FastGPT从旧版本升级到V4.4.1的操作指南

本页为FastGPT自部署场景下，从旧版本升级到V4.4.1版本的操作说明文档，适用于通过Docker Compose等方式部署的用户。升级的核心操作是通过指定的初始化API完成数据集文件的状态适配，确保系统兼容V4.4.1版本的存储逻辑。

**执行升级初始化操作**
该升级的核心步骤为发起指定的HTTP POST请求，具体配置如下：
- 请求地址：`https://{{host}}/api/admin/initv441`，其中`{{host}}`需替换为你部署的FastGPT服务的实际访问地址。
- 请求头要求：必须携带两个请求头，分别是`rootkey: {{rootkey}}`，其中`{{rootkey}}`为你在FastGPT环境变量中配置的rootkey值；另一个为`Content-Type: application/json`，用于指定请求体的格式。
- 快速执行示例：可以通过curl命令发起该请求，示例代码如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv441 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该请求执行成功后，会自动初始化Mongo数据库中的`dataset.files`集合，将其中的所有数据设置为可用状态，完成V4.4.1版本的核心数据适配工作。

**升级相关补充说明**
本页面同时收录了FastGPT多个历史版本的升级指引，包括V4.4、V4.4.2等版本的升级操作，用户可根据自身当前部署的版本选择对应的升级步骤。需要注意的是，所有升级操作均需确保FastGPT服务处于正常运行状态，且rootkey配置与环境变量中的取值完全一致，否则可能无法完成初始化操作。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/441)
