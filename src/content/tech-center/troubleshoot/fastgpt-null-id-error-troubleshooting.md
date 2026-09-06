---
title: 解决FastGPT新建知识库后对话出现Cannot read properties of null (reading 'id')报错
slug: /zh/troubleshoot/fastgpt-null-id-error-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/893
source_type: GitHub issue
---

# 解决FastGPT新建知识库后对话出现Cannot read properties of null (reading 'id')报错

## 现象
新建知识库，导入文本数据集并完成问答拆分，将新知识库加入应用后，开启新对话时出现Cannot read properties of null (reading 'id')报错。该报错并非每次出现，已出现两次。

## 可能原因
需按实际环境确认，可能与知识库数据处理流程、应用与知识库的关联配置存在异常有关。

## 排查步骤
1. 重新执行知识库的问答拆分流程，确认数据集处理无异常中断或缺失。
2. 移除当前关联至应用的知识库，重新添加后测试对话功能。
3. 复现报错场景，记录每次出现报错的操作流程与环境信息。
4. 核对系统运行日志，定位报错触发的具体源头。

## 解决与验证
若排查后确认数据集或关联配置存在异常，修正对应内容后重新测试对话。若报错仍出现，需结合系统运行日志进一步定位问题。验证方式为重新开启新对话，确认无Cannot read properties of null (reading 'id')报错出现。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/893)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
