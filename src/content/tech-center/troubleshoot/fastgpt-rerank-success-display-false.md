---
title: FastGPT重排模型调用成功后页面显示false的排错指南
slug: /zh/troubleshoot/fastgpt-rerank-success-display-false
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2820
source_type: GitHub issue
---

# FastGPT重排模型调用成功后页面显示false的排错指南

## 现象
FastGPT私有部署版本4.8.10中，重排模型显示调用成功，但页面仍展示为false状态，附带相关截图佐证该问题。

## 可能原因
暂无明确通用原因，需结合实际部署环境的日志与配置项进行确认。

## 排查步骤
1.  确认当前使用的FastGPT版本为4.8.10私有部署版本。
2.  验证已配置的模型Key可正常使用。
3.  查看重排模型调用的相关日志，确认接口实际返回结果。
4.  核对页面展示逻辑与接口返回数据的关联配置。

## 解决与验证
若模型Key无法正常使用，更换为正常可用的Key后验证页面显示状态。若模型Key正常，根据日志返回的实际结果修正页面关联配置，确认页面显示状态与接口调用结果保持一致。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2820)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
