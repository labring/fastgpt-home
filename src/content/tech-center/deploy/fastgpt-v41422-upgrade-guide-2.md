---
title: FastGPT V4.14.22版本升级指南与修复内容说明
slug: /zh/deploy/fastgpt-v41422-upgrade-guide-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41422
source_type: 官方文档
---

# FastGPT V4.14.22版本升级指南与修复内容说明

### 版本概述与修复内容
FastGPT V4.14.22是4.14.x版本分支的迭代更新，本次更新聚焦修复生产环境中高频出现的功能异常，具体修复内容包括四类问题：一是工作流默认选中模型未回传表单值，导致前端显示的模型与实际运行时调用的模型不一致；二是工作流在自动保存过程中存在连接线丢失的风险；三是管理员修改系统通知弹窗配置时会触发报错；四是工作流混用思考模型与非思考模型时，可能因独立reason字段的上下文异常导致模型调用报错。

### 升级操作步骤
本次升级的唯一操作步骤为更新对应镜像的tag：
1.  更新fastgpt-app（FastGPT主服务）的镜像tag为`v4.14.22`
2.  更新fastgpt-pro（FastGPT商业版）的镜像tag为`v4.14.22`
完成镜像拉取与服务重启后，即可完成本次版本升级。

### 注意事项与边界说明
本次升级仅适用于FastGPT 4.14.x系列的现有部署，请勿跨大版本直接升级。升级过程中需确保fastgpt-app与fastgpt-pro的镜像tag保持一致，避免出现版本不匹配引发的功能异常。若升级后仍存在工作流相关异常，可先核对两个服务的镜像tag是否均正确更新为`v4.14.22`。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41422)
