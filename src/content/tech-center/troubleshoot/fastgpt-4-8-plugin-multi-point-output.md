---
title: FastGPT 4.8版本自定义插件多点输出功能排障指南
slug: /zh/troubleshoot/fastgpt-4-8-plugin-multi-point-output
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1505
source_type: GitHub issue
---

# FastGPT 4.8版本自定义插件多点输出功能排障指南

## 现象
升级FastGPT 4.8版本后，在多状态业务流程设计中，需在主应用添加多个判断器以实现不同参数下的分支流程。用户希望在自定义插件的设计中支持类似判断器的多点输出功能，直接在插件内部完成多分支逻辑，避免在主应用中额外添加判断器，但当前版本无法满足该需求。

## 可能原因
当前使用的FastGPT 4.8版本未内置自定义插件多点输出功能，该功能未在当前版本的功能列表中上线，需等待后续版本更新。

## 排查步骤
1. 登录FastGPT管理后台，确认当前部署运行的FastGPT版本是否为4.8.x系列；
2. 查阅官方发布的功能更新计划，核对自定义插件多点输出功能的支持版本与升级时间信息。

## 解决与验证
自定义插件多点输出功能计划在FastGPT 4.8.2版本正式推出，官方预计该版本的升级时间为5月底。如需使用该功能，需等待对应版本发布后，按照官方升级流程完成FastGPT的升级操作。

> 来源: [FastGPT GitHub issue #1505](https://github.com/labring/FastGPT/issues/1505)
