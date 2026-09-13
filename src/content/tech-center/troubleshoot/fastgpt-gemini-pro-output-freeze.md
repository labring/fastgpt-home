---
title: 解决FastGPT v4.7切换gemini-pro后聊天输出卡住的问题
slug: /zh/troubleshoot/fastgpt-gemini-pro-output-freeze
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/993
source_type: GitHub issue
---

# 解决FastGPT v4.7切换gemini-pro后聊天输出卡住的问题

## 现象
FastGPT v4.7版本中，将LLM切换为gemini-pro后，聊天界面输出内容至2~3行时即卡住，持续1分钟以上无新输出。使用其他LLM模型测试时无该问题，且对应LLM服务本身运行正常。

## 可能原因
暂未明确具体根因，该问题仅在FastGPT v4.7版本、切换至gemini-pro模型、配置最大回复为2000、提示词要求输出不少于1000字的场景下复现。

## 排查步骤
1. 确认FastGPT版本为v4.7。
2. 确认当前使用的LLM模型为gemini-pro。
3. 检查LLM最大回复参数是否设置为2000。
4. 确认当前对话的提示词是否要求输出不少于1000字。
5. 切换至其他LLM模型，验证是否出现相同卡住问题。
6. 确认对应LLM服务运行正常。

## 解决与验证
目前无官方公开的修复方案，可尝试以下验证操作：
1. 调整LLM最大回复参数，观察是否仍触发卡住问题。
2. 简化提示词的输出字数要求，验证聊天功能是否恢复正常。
3. 切换至其他LLM模型，确认业务流程正常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/993)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
