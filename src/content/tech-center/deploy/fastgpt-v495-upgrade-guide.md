---
title: FastGPT V4.9.5版本升级操作说明与更新内容
slug: /zh/deploy/fastgpt-v495-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/495
source_type: 官方文档
---

# FastGPT V4.9.5版本升级操作说明与更新内容

## 升级操作步骤
升级前需先完成数据备份，防止升级过程中出现数据丢失。完成备份后，更新对应镜像的tag：将FastGPT官方镜像的tag设置为`v4.9.5`，商业版镜像同样更新为`v4.9.5`，Sandbox与AIProxy无需进行版本更新。

## 新增功能
本次更新新增四项功能：一是团队成员权限细分，可分别控制是否可创建根目录应用、知识库以及生成API Key；二是交互节点支持在嵌套工作流中使用；三是新增团队成员操作日志功能；四是用户输入节点支持多选框配置。

## 优化与问题修复
本次更新优化了繁体中文翻译内容，并完成了Arm镜像的打包适配。同时修复了多个问题：包括password检测规则错误、分享链接无法隐藏知识库检索结果、IOS低版本正则兼容异常、问答提取队列错误后计数器未清零导致队列失效、Debug模式下交互节点下一步可能触发死循环的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/495)
