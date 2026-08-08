---
title: FastGPT V4.14.24版本升级操作与变更说明
slug: /zh/deploy/fastgpt-v41424-upgrade-changes
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41424
source_type: 官方文档
---

# FastGPT V4.14.24版本升级操作与变更说明

本页面面向使用FastGPT自部署版本的技术人员，提供V4.14.24版本的升级操作指引与变更细节说明。该版本属于4.14.x系列更新，未涉及环境变量变更或额外升级脚本要求，仅需完成镜像更新即可完成升级流程。

## 版本核心变更
本次更新包含两项针对性优化：其一，优化了v1/completions接口的abort条件判断逻辑，减少因socket重连引发的误判中断问题，解决API调用工作流不定期终止的异常情况；其二，补充了管理员在未配置S3外部URL场景下的上传接口功能，完善了后台文件上传的适配能力，覆盖更多部署环境的使用需求。

## 升级操作步骤
请按照以下流程完成本次升级：
1. 登录你的FastGPT部署环境，找到fastgpt-app（FastGPT主服务）的镜像配置，将镜像标签更新为v4.14.24；
2. 同步更新fastgpt-pro（FastGPT商业版）的镜像标签为v4.14.24；
3. 完成镜像拉取后，重启对应服务即可生效。
需要注意的是，本次升级仅需更新镜像标签，无需执行额外的脚本或配置调整。若你未遇到API工作流中断或无S3外部URL的上传需求，可暂缓本次升级。同时，V4.14.25版本已被官方弃用，请勿选择该版本进行部署或升级。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41424
