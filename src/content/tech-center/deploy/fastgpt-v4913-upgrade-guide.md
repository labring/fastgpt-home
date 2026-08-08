---
title: FastGPT V4.9.13版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v4913-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4913
source_type: 官方文档
---

# FastGPT V4.9.13版本升级操作与更新内容说明

### 版本更新概述
本文面向FastGPT自部署用户，介绍V4.9.13版本的升级要求与更新内容。本次升级仅需更新FastGPT主镜像及商业版镜像，`mcp_server`、`Sandbox`、`AIProxy`组件无需执行更新操作。

### 更新内容详情
本次更新包含新增功能、体验优化与问题修复三部分：新增套餐缓存能力，可减少MongoDB查询次数；优化项包括调整所有NodeId为随机值生成，避免首字母以数字开头，同时支持知识库集合的嵌套搜索；修复的问题包括对话日志日期范围选择异常，API调用时传入的system提示词可能重复，AI对话或工具调用未选择文件链接时仍读取历史文件，以及手动更新知识库索引时错误删除旧索引导致索引失效的问题。

### 升级操作步骤
可按照以下步骤完成版本升级：1. 拉取FastGPT官方镜像，指定镜像tag为`v4.9.13`；2. 若部署了商业版，同步拉取商业版镜像并指定tag为`v4.9.13`；3. 无需对`mcp_server`、`Sandbox`、`AIProxy`组件进行更新；4. 重启部署的FastGPT服务，即可完成本次版本升级。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4913
