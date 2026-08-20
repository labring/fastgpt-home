---
title: FastGPT V4.8.14版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v4814-update-notes
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4814
source_type: 官方文档
---

# FastGPT V4.8.14版本升级操作与更新内容说明

本文档面向FastGPT自部署用户，提供V4.8.14版本的官方升级指南与完整更新说明，涵盖操作步骤、新增功能与修复内容。

## 升级操作步骤
1. 做好业务数据备份，避免升级过程中数据丢失；
2. 更新对应镜像：普通版FastGPT镜像的tag设置为`v4.8.14-fix`；商业版（fastgpt-pro）镜像tag设置为`v4.8.14`；若使用Milvus版本的Sandbox镜像，可更新至`v4.8.14-milvus-fix`，Sandbox镜像非强制更新项。

## 版本更新详情
### 新增功能
支持配置用户加载对话时自动触发一轮工作流，可用于快速引导用户使用；重写chatContext模块，对话测试新增日志且刷新后不丢失对话；分享链接支持配置是否允许查看原文；新增doc2x插件与繁体中文语言包；分析链接和chat API支持传入自定义uid；商业版新增微软oauth登录功能。
### 优化与修复
优化工作流UI细节、应用编辑记录采用diff存储避免浏览器溢出；新增register入口，无需等待首次访问即可执行；工作流检查增加更多缺失值检查；新增知识库训练最大重试次数限制；修复图片路径与示意图任务问题、Milvus description问题；修复四级标题丢失问题并新增五级标题支持；修复MongoDB知识库集合唯一索引异常；修复反选知识库引用后报错问题；修复简易模式转工作流未使用最新编辑记录的问题；修复表单输入说明文字不显示问题；修复API无法使用base64图片的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4814)
