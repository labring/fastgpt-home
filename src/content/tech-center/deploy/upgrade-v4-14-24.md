---
title: FastGPT V4.14.24版本升级说明与操作指南
slug: /zh/deploy/upgrade-v4-14-24
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41424
source_type: 官方文档
---

# FastGPT V4.14.24版本升级说明与操作指南

## 这个版本改了什么
本版本针对两处功能细节进行优化，修复潜在异常问题。其一，优化v1/completions abort条件判断逻辑，减少socket重连场景下的误判中断情况，避免API调用工作流时不时出现终止问题。其二，补充管理员在无s3 external URL场景下的上传接口，完善管理员操作的功能覆盖范围，适配更多部署环境需求。

## 升级前要确认的事
升级前需确认当前部署的fastgpt-app与fastgpt-pro的镜像版本低于v4.14.24，避免重复执行升级操作。

## 升级步骤（照做）
执行镜像tag更新操作：更新fastgpt-app镜像tag为v4.14.24，更新fastgpt-pro镜像tag为v4.14.24。

## 升级后怎么验证
可通过两个维度验证升级效果。其一，调用v1/completions接口发起API调用工作流，确认工作流无异常终止情况，验证优化项生效。其二，使用管理员账号测试无s3 external URL场景下的文件上传功能，确认接口可正常调用，验证补充功能生效。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41424)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
