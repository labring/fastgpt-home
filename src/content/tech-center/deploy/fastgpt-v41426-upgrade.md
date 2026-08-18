---
title: FastGPT V4.14.26版本升级操作与变更说明
slug: /zh/deploy/fastgpt-v41426-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41426
source_type: 官方文档
---

# FastGPT V4.14.26版本升级操作与变更说明

本页面为FastGPT自部署版本的升级文档，聚焦V4.14.26版本的升级操作与变更说明，属于4.14.x版本升级系列内容。该系列包含多个迭代版本，其中V4.14.25版本已被官方弃用，用户可通过本页面完成V4.14.26版本的部署或升级适配。

### 标准升级操作步骤
完成该版本升级仅需执行镜像标签更新操作：
1. 调整FastGPT主服务镜像：将fastgpt-app的镜像tag设置为v4.14.26；
2. 调整FastGPT商业版服务镜像：将fastgpt-pro的镜像tag设置为v4.14.26。
请在执行镜像更新前完成系统数据备份，以防止升级过程中出现不可预期的数据问题。

### 版本变更详情
V4.14.26版本的核心优化为锁定Node.js版本，该调整可有效避免使用最新版本Node.js引发的流式响应接收异常问题。该版本属于4.14.x系列的稳定迭代版本，用户可根据自身部署需求选择是否升级。若需查看其他同系列版本的升级说明，可参考页面内的版本导航列表获取对应内容。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41426)
