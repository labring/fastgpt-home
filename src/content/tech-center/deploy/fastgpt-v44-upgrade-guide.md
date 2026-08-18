---
title: FastGPT自部署旧版本升级至V4.4系列版本的操作指南
slug: /zh/deploy/fastgpt-v44-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/44
source_type: 官方文档
---

# FastGPT自部署旧版本升级至V4.4系列版本的操作指南

本页面向FastGPT自部署的工程师与技术选型人员，提供V4.4及相关子版本的升级操作说明。不同版本的升级要求存在差异，部分版本标注了环境变量变更或需执行专用升级脚本，用户需先确认当前版本与目标版本的对应升级说明，避免遗漏必要的配置调整。本页涵盖的升级版本包括V4.4、V4.4.1、V4.3等，具体操作需严格遵循官方标注的版本要求执行。

### 版本升级核心执行步骤
以V4.4版本升级为例，需执行初始化API完成Mongo数据库的字段初始化。具体操作需发起1个POST请求，请求地址为`https://{{host}}/api/admin/initv44`，请求需携带两个请求头：`rootkey`（值来自部署时配置的环境变量）和`Content-Type: application/json`。可通过以下curl命令完成请求：
```bash
curl --location --request POST https://{{host}}/api/admin/initv44 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该请求会完成Mongo数据库部分字段的初始化，是V4.4版本升级的必要步骤。

升级过程中需注意多个易错点：未正确携带`rootkey`请求头会导致初始化请求失败，部分旧版本升级时不可直接跳过中间版本，需按版本顺序逐步完成升级。此外，仅适用于官方文档标注的对应版本升级场景，请勿用于未提及的版本升级，若涉及环境变量变更的版本，需提前完成环境变量的配置调整，避免升级后出现功能异常。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/44)
