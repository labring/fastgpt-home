---
title: 解决FastGPT工作流嵌套调用时用户选择插件异常问题
slug: /zh/troubleshoot/fastgpt-workflow-nested-plugin-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2623
source_type: GitHub issue
---

# 解决FastGPT工作流嵌套调用时用户选择插件异常问题

## 现象
FastGPT v4.8.10-alpha私有部署版本中，在A工作流内调用B工作流时，B工作流内的用户选择插件无法正常运行。

## 可能原因
暂未明确具体触发因素，需结合实际部署环境与运行日志排查。

## 排查步骤
1. 确认当前FastGPT部署版本为v4.8.10-alpha私有部署版本。
2. 复现问题，记录B工作流中用户选择插件的配置内容与调用链路。
3. 查看工作流运行日志，提取相关异常信息。
4. 单独运行B工作流，验证用户选择插件是否可正常执行。

## 解决与验证
暂未提供明确修复方案，需根据排查得到的具体异常信息调整相关配置。验证方式为在A工作流中调用B工作流，确认B工作流内的用户选择插件可正常运行。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2623)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
