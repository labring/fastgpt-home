---
title: FastGPT V4.14.12版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v41412-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41412
source_type: 官方文档
---

# FastGPT V4.14.12版本升级操作与更新内容说明

### 版本概述
本页对应FastGPT 4.14.x版本分支下的V4.14.12版本升级文档，面向自部署的工程师与技术选型人员，完整提供该版本的升级操作步骤与全部更新内容说明。该版本属于FastGPT官方4.14.x系列的正式更新版本，适配此前的4.14.x系列部署环境。

### 升级操作步骤
该升级流程适配Docker Compose部署的FastGPT实例，仅需更新对应服务的镜像tag即可完成升级：
1. 更新fastgpt-app（FastGPT主服务）的镜像tag为v4.14.12；
2. 更新fastpgt-pro（商业版服务）的镜像tag为v4.14.12。
请确保所有服务的镜像tag保持一致，避免版本不兼容问题。

### 本次更新详情
本次更新包含修复、新增与优化三类内容：
修复项包括：知识库三级目录path接口报zod校验出错；v1/completions接口dataId异常，导致API调用时对话日志无法获取运行详情；对话Agent应用的敏感信息过滤勾选框无法取消勾选。
新增内容为：响应值允许自定义HttpStatus状态码；Agent调度器支持PI Agent模式（beta功能）。
优化内容为：优化skill接口的错误处理逻辑，提升接口调用的稳定性与报错提示清晰度。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41412)
