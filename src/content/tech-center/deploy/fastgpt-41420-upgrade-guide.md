---
title: FastGPT V4.14.20版本升级操作与更新说明
slug: /zh/deploy/fastgpt-41420-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41420
source_type: 官方文档
---

# FastGPT V4.14.20版本升级操作与更新说明

本页内容为FastGPT V4.14.20版本的升级与更新说明，该版本属于4.14.x系列的正式更新版本，本次更新主要聚焦于修复已知的系统适配问题，优化配置兼容性，提升系统运行的稳定性。

### 升级操作步骤
本次升级仅需更新对应服务的镜像标签即可完成，具体操作如下：
1.  更新fastgpt-app（FastGPT主服务）的镜像tag为`v4.14.20`；
2.  更新fastgpt-pro（FastGPT商业版）的镜像tag为`v4.14.20`；
3.  更新fastgpt-plugin的镜像tag为`v0.6.2`。
完成镜像tag更新后，重启对应部署服务即可生效。本次升级无需执行额外的数据库迁移或升级脚本，仅需替换镜像标签即可完成版本升级，操作流程相对简洁。

本次更新修复了两个核心问题：一是增强工作流的zod数据类型适配性，解决了相关流程在数据校验环节的异常问题；二是修复了模型配置无法完全覆盖defaultConfig的问题，优化了模型配置的灵活性与完整性，让用户可以更灵活地配置模型相关参数。该版本的升级操作属于轻量修复更新，适合当前使用4.14.x系列其他版本的用户进行更新，若需了解其他4.14.x系列版本的更新说明，可参考对应版本的官方文档内容。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41420)
