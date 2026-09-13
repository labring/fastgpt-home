---
title: FastGPT V4.6.1版本升级内容与操作说明
slug: /zh/deploy/upgrade-v4-6-1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/461
source_type: 官方文档
---

# FastGPT V4.6.1版本升级内容与操作说明

## 这个版本改了什么
本次V4.6.1版本包含两项新增功能与两项体验优化内容。新增GPT4-v模型支持，可调用该模型处理视觉相关的输入任务，拓展了模型的应用场景。新增whisper语音输入功能，支持将语音内容转换为文本输入，简化了操作流程。优化TTS流传输流程，提升了音频数据的传输稳定性与连贯性。优化TTS缓存机制，减少了重复生成相同音频的资源消耗，提升了响应速度。

## 升级前要确认的事
升级前需确认当前运行的FastGPT版本低于V4.6.1。

## 升级步骤（照做）
升级步骤未在本次文档中提及。

## 升级后怎么验证
验证新增功能是否正常运行。可调用GPT4-v模型测试视觉相关任务的处理效果，测试whisper语音输入功能的识别准确性，检查TTS流传输的连贯性与缓存机制的生效情况。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/461)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
