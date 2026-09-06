---
title: 解决FastGPT平台API调用stream=false时无法获取reasoning_content的问题
slug: /zh/troubleshoot/fastgpt-api-stream-reasoning-content
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5925
source_type: GitHub issue
---

# 解决FastGPT平台API调用stream=false时无法获取reasoning_content的问题

## 现象
API调用设置stream=false时，返回结果中无法看到reasoning_content字段。通过平台对话日志可查看到完整的思考过程内容。当API调用设置stream=true时，返回结果可正常看到reasoning_content字段。

## 可能原因
目前公开信息未明确标注该现象的具体触发原因，需结合实际部署环境、配置项与调用场景进一步确认。

## 排查步骤
1.  核对API调用的stream参数配置，确认是否设置为false。
2.  分别调用stream=true与stream=false两种场景的API，对比两次返回结果，查看reasoning_content字段的存在情况。
3.  查看平台对话日志，确认模型是否已正常生成思考过程内容。

## 解决与验证
首先确认平台对话日志中已生成完整思考过程，确保模型推理内容正常输出。调用API时设置stream=true，验证返回结果包含reasoning_content字段。调整API调用参数为stream=false，再次调用并检查返回结果是否包含reasoning_content字段。若仍未获取到该字段，需结合实际部署与配置环境进一步确认。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5925)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
