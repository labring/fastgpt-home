---
title: FastGPT V4.14.31版本升级操作与安全修复说明
slug: /zh/deploy/upgrade-v4-14-31
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41431
source_type: 官方文档
---

# FastGPT V4.14.31版本升级操作与安全修复说明

## 这个版本改了什么
本版本包含一项安全修复内容，修复系统默认模型未进行敏感信息过滤的问题，可有效避免系统初始化接口响应返回模型API Key、请求地址及内部配置。同时更新fastgpt-app（FastGPT主服务）与fastgpt-pro（FastGPT商业版）的镜像tag至v4.14.31。

## 升级前要确认的事
升级前需确认当前部署环境可正常拉取v4.14.31版本的fastgpt-app与fastgpt-pro镜像，同时确认现有FastGPT服务的运行状态。

## 升级步骤（照做）
1. 更新fastgpt-app（FastGPT主服务）的镜像tag为v4.14.31
2. 更新fastgpt-pro（FastGPT商业版）的镜像tag为v4.14.31

## 升级后怎么验证
升级后可触发系统初始化接口，检查响应内容未包含模型API Key、请求地址及内部配置。同时确认fastgpt-app与fastgpt-pro服务的运行状态正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41431)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
