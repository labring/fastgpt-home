---
title: FastGPT V4.14.26版本升级操作与变更说明
slug: /zh/deploy/fastgpt-v41426-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41426
source_type: 官方文档
---

# FastGPT V4.14.26版本升级操作与变更说明

本页为FastGPT V4.14.26版本的官方升级说明文档，面向使用该工具的工程师与技术选型人员，提供标准化的升级操作步骤与本次版本的核心变更内容。本次V4.14.26版本属于V4.14.x系列的维护更新，核心变更为锁定Node.js版本，可有效避免因使用最新Node.js版本导致的流式响应接收异常问题。

### 标准化升级操作步骤
本次升级仅需完成镜像tag更新即可完成，无需额外复杂配置：
1. 更新FastGPT主服务镜像：将`fastgpt-app`（FastGPT官方主服务）的镜像tag修改为`v4.14.26`；
2. 更新FastGPT商业版镜像：将`fastgpt-pro`（FastGPT商业版服务）的镜像tag修改为`v4.14.26`。
若你通过容器化方式部署的FastGPT，只需在对应的部署配置文件中修改上述镜像tag参数，重启相关容器即可完成升级操作。执行该步骤前，需确认当前运行的FastGPT版本属于V4.14.x系列，避免跨大版本升级引发兼容异常。

需要注意的是，本升级仅适用于V4.14.x分支的现有版本，其中V4.14.25版本已被官方弃用，请勿使用该版本进行部署或升级。若你当前运行的是更早的V4.14.x版本（如带有环境变量变更、升级脚本要求的版本），需先参考对应版本的官方升级说明完成前置适配后，再执行本次V4.14.26版本的升级操作。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41426)
