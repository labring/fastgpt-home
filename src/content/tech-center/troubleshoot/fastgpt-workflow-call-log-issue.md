---
title: 解决FastGPT工作流调用其他工作流时日志不显示输出结果问题
slug: /zh/troubleshoot/fastgpt-workflow-call-log-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2966
source_type: GitHub issue
---

# 解决FastGPT工作流调用其他工作流时日志不显示输出结果问题

## 现象
FastGPT私有部署版本4.8.11-fox中，当工作流调用其他工作流时，日志显示界面无法直接展示该调用的生成结果。

## 可能原因
当前无明确关联的已知原因，需结合实际运行环境与配置进一步排查确认。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.8.11-fox私有部署版本。
2. 执行包含调用其他工作流的工作流流程，查看对应的日志显示界面。
3. 核对日志界面是否未展示该子工作流调用的生成结果。

## 解决与验证
目前暂无公开的通用修复方案，需结合实际部署环境排查相关配置或版本问题。验证方式为重新执行目标工作流，确认日志界面可正常显示调用其他工作流的生成结果。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2966)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
