---
title: FastGPT v4.10.1-fix2版本升级修复内容与说明
slug: /zh/deploy/release-notes-4-10-1-fix2
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.10.1-fix2
source_type: 官方文档
---

# FastGPT v4.10.1-fix2版本升级修复内容与说明

## 这个版本改了什么
本次版本修复两项核心问题：自定义类型的全局变量更新后前端页面无法显示的问题；问题分类、内容提取节点默认模型未自动选择导致工作流无法运行的问题。同时新增多项功能与文档优化：支持signoz监控接入，添加Oceanbase部署的推荐配置，新增search字段，更新setFastGPTSem以在存储前验证输入内容，修复默认模型选择、变量初始化、节点变量更新渲染等问题，同步更新相关文档内容。

## 升级前要确认的事
确认当前部署的FastGPT版本早于v4.10.1-fix2。确认工作流中涉及自定义全局变量、问题分类节点、内容提取节点的配置。若使用Oceanbase作为存储，需提前了解本次新增的部署推荐配置。若需要接入监控，需确认signoz监控的接入配置。

## 升级步骤（照做）
拉取v4.10.1-fix2版本的部署资源，若使用Oceanbase存储，需参考本次新增的部署推荐配置更新部署文件，完成配置更新后重启FastGPT服务。

## 升级后怎么验证
1. 进入系统设置页面，更新自定义类型的全局变量，确认前端页面可正常显示更新后的变量内容。
2. 新建或编辑包含问题分类节点、内容提取节点的工作流，确认默认模型自动选中，工作流可正常启动运行。
3. 若接入signoz监控，确认监控数据可正常上报至监控平台。
4. 若使用Oceanbase存储，确认部署配置已生效，存储功能可正常使用。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.10.1-fix2)
