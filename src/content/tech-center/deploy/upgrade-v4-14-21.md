---
title: FastGPT V4.14.21版本升级内容与操作说明
slug: /zh/deploy/upgrade-v4-14-21
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41421
source_type: 官方文档
---

# FastGPT V4.14.21版本升级内容与操作说明

## 这个版本改了什么
本版本包含两项变更：completions API的文件类型参数中，name变为可选参数；修复了OSS初始化异常的问题。

## 升级前要确认的事
升级前需确认当前部署的fastgpt-app与fastgpt-pro服务的现有版本低于v4.14.21，同时确认OSS相关配置信息无误，避免升级后出现初始化异常。

## 升级步骤（照做）
执行以下镜像更新操作：更新fastgpt-app镜像tag为v4.14.21；更新fastgpt-pro镜像tag为v4.14.21。

## 升级后怎么验证
升级完成后，可通过以下方式验证：确认fastgpt-app与fastgpt-pro服务正常启动；调用completions API的文件类型接口，验证不传name参数时接口可正常响应；检查OSS初始化相关日志，确认无异常报错。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41421)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
