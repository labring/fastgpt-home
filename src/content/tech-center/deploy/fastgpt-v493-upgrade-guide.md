---
title: FastGPT V4.9.3版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v493-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/493
source_type: 官方文档
---

# FastGPT V4.9.3版本升级步骤与更新内容说明

本文档为FastGPT V4.9.3版本的历史升级指南，适用于已部署FastGPT的自运维用户进行版本更新操作。该版本针对工作流与代码运行功能进行了优化更新：新增了工作流debug模式支持交互节点的功能，将代码运行模块的支持范围升级至Python3代码；同时修复了工作流格式转化异常的问题，提升了工作流的运行稳定性。

### 升级操作步骤
升级操作需严格按照以下步骤执行，避免出现异常问题：
1.  前置备份：升级前需完整备份当前部署的数据库，确保在升级过程中出现异常时可以恢复数据。
2.  镜像更新：根据你的部署方式（如Docker Compose），替换对应服务的镜像tag为指定版本：
    - FastGPT 基础镜像：`v4.9.3`
    - FastGPT 商业版镜像：`v4.9.3`
    - Sandbox 镜像：`v4.9.3`
    - AIProxy 镜像：`v0.1.5`
    替换完成后，重启所有相关的容器服务，即可完成版本升级。

本次V4.9.3版本升级无需额外修改环境变量或配置文件，仅需替换镜像版本即可生效。如果你的当前版本早于V4.9.3，需按照官方文档的历史版本升级列表，依次完成每个中间版本的升级操作，确保升级流程的正确性。升级完成后，即可正常使用本次版本新增的功能与修复后的问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/493
