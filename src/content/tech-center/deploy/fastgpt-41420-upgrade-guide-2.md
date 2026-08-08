---
title: FastGPT 4.14.20自部署版本升级指南与更新说明
slug: /zh/deploy/fastgpt-41420-upgrade-guide-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41420
source_type: 官方文档
---

# FastGPT 4.14.20自部署版本升级指南与更新说明

本页面向FastGPT自部署用户，提供V4.14.20版本的升级操作与更新细节说明。该版本属于4.14.x迭代分支的正式更新，主要针对工作流与模型配置场景进行优化，解决两类已知问题，提升系统运行稳定性与配置完整性。

### 升级操作步骤
请按照以下步骤完成升级：
1. 更新各服务的镜像标签：
   - 更新fastgpt-app（FastGPT主服务）的镜像tag为v4.14.20
   - 更新fastgpt-pro（FastGPT商业版服务）的镜像tag为v4.14.20
   - 更新fastgpt-plugin的镜像tag为v0.6.2

### 修复内容与注意事项
本次V4.14.20版本的修复包含两处核心优化：一是增强了工作流的zod数据类型适配性，可解决工作流中涉及zod数据类型校验时的异常问题，确保工作流的配置校验逻辑正常运行；二是修复了模型配置无法完全覆盖defaultConfig的问题，可确保模型配置完整覆盖defaultConfig，避免出现配置项无法完整生效的情况。
需要注意，本次升级仅适用于FastGPT 4.14.x系列的自部署实例，请勿在其他版本分支的实例中直接执行该升级操作。若升级过程中遇到相关异常，可参考官方通用排查流程处理。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41420
