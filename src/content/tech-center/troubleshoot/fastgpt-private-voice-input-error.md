---
title: 解决FastGPT私有部署v4.6.7版本语音输入无法访问问题
slug: /zh/troubleshoot/fastgpt-private-voice-input-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1585
source_type: GitHub issue
---

# 解决FastGPT私有部署v4.6.7版本语音输入无法访问问题

## 现象
FastGPT私有部署v4.6.7版本中，语音输入功能无法正常访问，未得到预期的功能使用效果，附带多张报错相关截图。

## 可能原因
暂未明确具体原因，可能涉及部署配置、服务运行或密钥关联的异常，需结合实际部署环境与日志信息进一步排查。

## 排查步骤
1. 确认已使用可正常工作的密钥，且密钥配置符合FastGPT私有部署的相关要求
2. 检查FastGPT私有部署的所有相关服务运行状态，确认无异常退出或报错
3. 核对当前部署版本为v4.6.7，确认版本一致性
4. 查看部署日志中的相关内容，提取异常报错信息，定位具体异常点

## 解决与验证
根据排查得到的具体异常点进行针对性处理。处理完成后，尝试调用语音输入功能，确认功能可正常访问并返回预期结果。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1585)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
