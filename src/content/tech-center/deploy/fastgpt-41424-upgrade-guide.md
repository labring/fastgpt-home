---
title: FastGPT V4.14.24版本升级操作及变更说明
slug: /zh/deploy/fastgpt-41424-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41424
source_type: 官方文档
---

# FastGPT V4.14.24版本升级操作及变更说明

本页面针对FastGPT V4.14.24版本，提供官方的升级操作指引与版本变更说明，面向自部署FastGPT的工程师与技术选型人员，帮助完成版本升级并了解本次更新的优化内容。

### 升级操作步骤
本次升级仅需更新对应服务的镜像标签即可完成：
1.  修改`fastgpt-app`（FastGPT主服务）的镜像tag为`v4.14.24`
2.  修改`fastgpt-pro`（FastGPT商业版服务）的镜像tag为`v4.14.24`
完成镜像tag更新后，重启对应服务即可加载新版本，完成本次升级。

### 版本更新变更内容
本次V4.14.24版本包含两处核心优化与补充：
1.  优化`v1/completions`接口的abort条件判断逻辑，减少因socket重连导致的误判中断问题，避免API调用工作流出现不定期终止的情况，提升接口调用的稳定性。
2.  补充管理员端上传接口的适配逻辑，当未配置S3 external URL时，管理员上传功能可正常生效，完善了无外部对象存储场景下的后台操作能力。

### 版本使用注意事项
需注意，官方已弃用V4.14.25版本，请勿使用该版本进行FastGPT的部署或升级操作，建议优先选择本次介绍的V4.14.24版本。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41424
