---
title: FastGPT V4.14.20版本升级内容与操作验证说明
slug: /zh/deploy/upgrade-v4-14-20
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41420
source_type: 官方文档
---

# FastGPT V4.14.20版本升级内容与操作验证说明

## 这个版本改了什么
本次V4.14.20版本包含两项官方修复内容。第一，增强工作流 zod 数据类型适配性。第二，修复模型配置无法完全覆盖 defaultConfig 的问题。

## 升级前要确认的事
升级前需确认当前部署的服务包含fastgpt-app、fastgpt-pro、fastgpt-plugin三类镜像实例，确保可正常执行后续的镜像更新操作。

## 升级步骤（照做）
需依次更新对应服务的镜像标签，具体操作如下：
1. 更新 fastgpt-app（fastgpt 主服务）镜像 tag 为 v4.14.20。
2. 更新 fastgpt-pro（fastgpt 商业版）镜像 tag 为 v4.14.20。
3. 更新 fastgpt-plugin 镜像 tag 为 v0.6.2。

## 升级后怎么验证
可通过运行工作流验证其数据类型适配正常，同时配置模型参数确认可正常覆盖 defaultConfig，以此确认本次升级已生效。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41420)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
