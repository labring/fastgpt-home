---
title: 解决FastGPT OpenAI TTS合成时读取Markdown语法字符的问题
slug: /zh/troubleshoot/fastgpt-openai-tts-markdown-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3005
source_type: GitHub issue
---

# 解决FastGPT OpenAI TTS合成时读取Markdown语法字符的问题

## 现象
使用FastGPT公有云版本4.8.12的OpenAI TTS语音合成功能时，输入文本包含Markdown语法格式，合成语音会读取这些Markdown格式字符。

## 可能原因
TTS合成流程未对输入文本执行Markdown语法预处理，导致输入中的Markdown语法标记被直接传入合成接口，最终被语音合成模块一并读取输出。

## 排查步骤
1. 确认当前使用的FastGPT版本为公有云版本4.8.12。
2. 查看触发TTS合成的原始输入文本，确认其中包含Markdown语法字符。
3. 回放生成的语音内容，确认语音中包含Markdown语法字符的读音。

## 解决与验证
解决方法为在TTS合成前对输入文本进行格式预处理，移除所有Markdown语法字符。验证步骤为：
1. 编辑输入文本，保留正常内容并添加Markdown语法标记。
2. 触发TTS合成功能。
3. 检查生成的语音内容，确认不再包含Markdown语法字符的读音。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3005)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
