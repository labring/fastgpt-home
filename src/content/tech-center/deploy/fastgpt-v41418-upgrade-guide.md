---
title: FastGPT V4.14.18版本的升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v41418-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41418
source_type: 官方文档
---

# FastGPT V4.14.18版本的升级操作与更新内容说明

FastGPT V4.14.18是4.14.x版本系列的迭代更新，面向自部署FastGPT的技术人员，提供该版本的升级操作步骤与更新内容说明。该版本适用于已部署4.14.x系列版本的实例升级，无需执行额外的迁移脚本或修改复杂配置，仅需按照官方指引完成对应操作即可。

## 升级操作步骤
升级的核心操作仅需更新对应服务的镜像tag，具体步骤如下：
1. 将fastgpt-app（FastGPT主服务）的镜像tag更新为v4.14.18；
2. 将fastgpt-pro（FastGPT商业版）的镜像tag更新为v4.14.18。

## 新增功能与问题修复
本次更新包含一项新增功能与两处问题修复：
新增功能为支持管理员在后台关闭个人微信发布渠道，管理员可通过系统后台配置该选项，以调整个人微信发布渠道的可用性。
问题修复方面，一是修复了部分工作流工具、用户表单节点无法正确根据文件类型过滤并上传文件的问题；二是修复了在对话页频繁切换未结束对话时，导致流恢复顺序异常的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41418)
