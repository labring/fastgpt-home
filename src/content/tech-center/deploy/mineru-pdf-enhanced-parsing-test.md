---
title: 配置Mineru自定义PDF增强解析与效果验证流程
slug: /zh/deploy/mineru-pdf-enhanced-parsing-test
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru
source_type: 官方文档
---

# 配置Mineru自定义PDF增强解析与效果验证流程

Mineru自定义PDF增强解析的效果验证可通过知识库上传与应用配置两类场景完成，用于确认自定义解析功能的运行状态，确保解析流程符合预期。

## 配置与效果验证步骤
知识库端验证步骤：上传PDF文件时，勾选`PDF 增强解析`选项。上传完成后，需将系统LOG_LEVEL设置为info或debug级别，方可观测到对应日志。成功解析时，日志中会出现两条关键记录：`[Info] 2024-12-05 15:04:42 Parsing files from an external service`，以及解析完成的日志`[Info] 2024-12-05 15:07:08 Custom file parsing is complete, time: 1316ms`。
应用端配置流程：进入应用的文件上传配置界面，勾选`PDF 增强解析`选项，即可完成应用侧的自定义PDF增强解析配置，使应用可调用Mineru的增强解析能力处理上传文件。

在两类场景中完成配置后，即可通过日志或应用运行状态确认Mineru自定义PDF增强解析功能是否正常启用，无需额外的复杂操作即可完成验证。

> [FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
