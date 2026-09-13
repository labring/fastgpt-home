---
title: FastGPT 音频文件输入与语音识别工作流的历史需求
slug: /zh/troubleshoot/fastgpt-workflow-upload-type-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4599
source_type: GitHub issue
---

# FastGPT 音频文件输入与语音识别工作流的历史需求

## 适用场景与历史记录

原议题于 2025 年请求允许上传语音文件，并在流程中使用语音识别模型处理录音。 原始讨论提交于 2025-04-19，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

当前文件输入文档已区分音频、视频、图片与普通文档。音频存储成功与模型识别成功需要分别验证。

## 排查与复测

1. 在应用文件输入设置中选择相应媒体类型，上传一段短录音。
2. 将音频交给支持该能力的模型，或接入受控转写服务；普通文档解析节点处理文档文件。
3. 检查转写内容和下游总结结果，并记录文件大小、格式与模型限制。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：增加语音文件上传并可以结合语音模型进行流程编排](https://github.com/labring/FastGPT/issues/4599)

> 来源: [FastGPT 文件输入与 4.8.13 行为说明](https://doc.fastgpt.io/en/guide/build/general/fileInput)

> 来源: [FastGPT 语音输入](https://doc.fastgpt.io/en/guide/build/general/voiceInput)
