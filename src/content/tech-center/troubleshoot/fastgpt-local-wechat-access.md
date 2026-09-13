---
title: 本地部署FastGPT接入微信及企业微信的相关说明
slug: /zh/troubleshoot/fastgpt-local-wechat-access
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1501
source_type: GitHub issue
---

# 本地部署FastGPT接入微信及企业微信的相关说明

##现象
本地部署FastGPT时，无法明确接入微信或企业微信的两种方式的区别，同时对智能微秘书方式能否结合本地FastGPT使用、是否支持多账号接入存在疑问。

##可能原因
未明确两种接入方式的配置逻辑与本地部署的适配规则，缺乏对多账号接入前提的认知。

##排查步骤
1. 确认当前FastGPT的部署类型为本地部署。
2. 整理现有接入方式的截图与官方文档信息。
3. 核对智能微秘书方式的部署要求与本地环境的匹配性。
4. 确认多账号接入的相关配置前提。

##解决与验证
两种接入方式分别为截图展示的方式与官方文档提及的智能微秘书方式。智能微秘书方式可部署本地并结合本地FastGPT使用。两种方式均支持微信及企业微信接入。多账号接入的支持情况需按实际环境确认。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1501)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
