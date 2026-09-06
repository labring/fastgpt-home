---
title: FastGPT MP3 录音总结：历史需求与音频处理路径
slug: /zh/troubleshoot/fastgpt-mp3-voice-summary
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2486
source_type: GitHub issue
---

# FastGPT MP3 录音总结：历史需求与音频处理路径

## 适用场景与历史记录

原议题于 2024 年询问在聊天框上传 MP3 对话并总结内容，社区当时建议二次开发。 原始讨论提交于 2024-08-23，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

当前文件输入文档已包含音频类型与多模态处理说明。录音上传、语音转文字和总结应逐环节验证，并核对所用模型的音频能力。

## 排查与复测

1. 选取已获授权的一段短 MP3，确认应用文件输入允许音频。
2. 将音频交给支持相应能力的模型，或先经受控语音识别服务转成文本。
3. 比对转写文本与录音，再核对摘要中的人物、时间和结论。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：我想从fastgpt对话框上传一段语音对话比如MP3，然后让他直接总结出对话内容，可行吗？](https://github.com/labring/FastGPT/issues/2486)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)

> 来源: [FastGPT 语音输入](https://doc.fastgpt.io/en/guide/build/general/voiceInput)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/2486#issuecomment-2308363554)
