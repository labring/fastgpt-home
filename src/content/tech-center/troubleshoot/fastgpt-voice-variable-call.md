---
title: FastGPT 语音播报开关与音色变量的历史需求
slug: /zh/troubleshoot/fastgpt-voice-variable-call
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3940
source_type: GitHub issue
---

# FastGPT 语音播报开关与音色变量的历史需求

## 适用场景与历史记录

原议题希望在工作流中根据用户选择开启语音播报并切换 TTS 音色，例如角色扮演中的角色声音。 原始讨论提交于 2025-03-01，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

当前应用配置中可见播报方式、模型和音色字段；这些字段的存在仅说明应用设置结构，工作流运行时动态覆盖能力仍需按入口验证。

## 排查与复测

1. 记录使用的播报模式、模型和音色，以及应用设置的实际值。
2. 明确用户是在会话开始前选择音色，还是同一会话内动态切换。
3. 用两组选择检查真实 TTS 请求和前台播放结果，保存变量进入播报环节的证据。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：请在流程中控制【开启语音播报】以及选择【语音角色】](https://github.com/labring/FastGPT/issues/3940)

> 来源: [FastGPT 应用配置数据结构](https://github.com/labring/FastGPT/blob/main/packages/global/core/app/type.ts)

> 来源: [FastGPT 语音输入](https://doc.fastgpt.io/en/guide/build/general/voiceInput)
