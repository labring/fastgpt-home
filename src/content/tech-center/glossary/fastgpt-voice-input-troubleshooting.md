---
title: FastGPT语音输入功能的使用与常见问题排查
slug: /zh/glossary/fastgpt-voice-input-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/508
source_type: 官方文档
---

# FastGPT语音输入功能的使用与常见问题排查

## 一句话定义
FastGPT中的voice功能是集成语音输入与交互的模块，支持通过语音触发对话交互流程。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
私有部署版本需使用v4.6.1及以上镜像，需配置whisper-1、tts-1等支持的语音模型。可通过相关配置添加上述模型以适配voice功能。在对话界面点击Voice Input按钮，即可触发语音输入功能。

## 容易搞错的地方
当配置为GPT4-V模型时，Voice Input按钮可能无法正常响应。需确认已配置所需的语音模型，否则无法启用voice功能。私有部署版本从旧版本升级后，需验证功能可用性。若未正确配置语音模型，voice功能将无法正常触发。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/508)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
