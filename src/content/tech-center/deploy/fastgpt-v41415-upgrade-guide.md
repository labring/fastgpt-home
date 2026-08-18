---
title: FastGPT V4.14.15版本升级操作与更新说明
slug: /zh/deploy/fastgpt-v41415-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41415
source_type: 官方文档
---

# FastGPT V4.14.15版本升级操作与更新说明

### 版本更新概述
本页面为FastGPT V4.14.15版本的官方升级说明，面向自部署的技术人员，用于指导完成该版本的升级操作，并介绍本次版本的更新细节。该版本属于4.14.x系列的小版本更新，是官方发布的稳定修复版本，仅需简单的镜像更新即可完成升级。

### 本次更新详情
本次V4.14.15版本包含两类更新内容：
1. 修复项：修复兼容旧版系统工具的异常问题，解决了系统工具与旧版运行环境不兼容的情况；同时修复选中系统组件为系统工具时的异常情况，提升了系统组件选择功能的稳定性与可用性。
2. 优化项：新增支持在GitHub平台上编辑相关文档内容，方便社区用户参与文档的完善与更新。

### 升级操作步骤
若您使用Docker Compose方式部署FastGPT，本次升级仅需修改配置文件中的镜像tag即可完成：
1. 打开部署使用的配置文件，找到fastgpt-app（FastGPT主服务）的配置项，将其镜像tag设置为`v4.14.15`。
2. 找到fastgpt-pro（FastGPT商业版）的配置项，将其镜像tag设置为`v4.14.15`。
3. 保存配置文件后，重新启动对应服务即可完成升级。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41415)
