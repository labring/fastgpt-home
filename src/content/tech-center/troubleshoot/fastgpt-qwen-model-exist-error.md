---
title: 解决FastGPT接入Qwen1.5-110B-Chat的Model not exist报错
slug: /zh/troubleshoot/fastgpt-qwen-model-exist-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1618
source_type: GitHub issue
---

# 解决FastGPT接入Qwen1.5-110B-Chat的Model not exist报错

## 现象
FastGPT在接入通义千问Qwen1.5-110B-Chat模型发起调用时，返回固定报错信息：`bad_response_status_code Model not exist. (request id: 2024052809001967802006448504393)`，该报错直接指向模型相关的识别或可用性异常。

## 可能原因
暂无明确预设的单一原因，需结合实际部署与配置环境逐一确认，关联排查方向包括模型标识配置匹配度、模型上线部署状态、访问权限配置正确性三个核心维度。

## 排查步骤
1. 核对FastGPT平台内配置的模型标识，与通义千问Qwen1.5-110B-Chat的官方标准标识是否完全一致，避免因标识拼写或格式差异导致识别失败。
2. 登录对应模型的部署控制台，检查目标模型是否已完成部署并处于正常可用的运行状态。
3. 确认当前使用的访问密钥具备对应模型的调用权限，无权限限制或配置错误。
4. 检查接口请求参数中的模型名称配置项，确保与平台内配置的模型标识保持一致。

## 解决与验证
根据排查得到的具体问题，调整对应配置项完成修复。验证流程为重新发起模型调用请求，确认不再返回`bad_response_status_code Model not exist`报错，且能正常获取模型生成的响应内容。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1618)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
