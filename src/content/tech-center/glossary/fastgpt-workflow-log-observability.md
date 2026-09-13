---
title: FastGPT工作流运行日志收集与可观测性配置说明
slug: /zh/glossary/fastgpt-workflow-log-observability
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/4728
source_type: 官方文档
---

# FastGPT工作流运行日志收集与可观测性配置说明

## 一句话定义
工作流运行日志收集与可观测功能，用于记录FastGPT编排工作流的全节点运行日志并提供可视化观测能力，辅助排查生产环境下的节点异常问题。

## 在 FastGPT 里怎么用
目前FastGPT支持编排包含20余个节点的工作流应用，正常调试阶段无报错。生产环境运行时，仅正常对话流程生成日志，当工作流节点出现异常时，无法获取对应节点的运行日志，也无可视化观测入口，排查问题难度较高。

## 容易搞错的地方
容易将工作流的正常对话日志等同于全节点运行日志，节点异常时无法通过现有对话日志定位具体异常节点与问题原因。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4728)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
