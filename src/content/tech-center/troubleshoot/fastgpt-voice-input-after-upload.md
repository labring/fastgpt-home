---
title: 修复FastGPT上传文件后语音输入按钮被隐藏的问题
slug: /zh/troubleshoot/fastgpt-voice-input-after-upload
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2705
source_type: GitHub issue
---

# 修复FastGPT上传文件后语音输入按钮被隐藏的问题

## 现象
在FastGPT的聊天框中完成文件上传后，语音输入按钮被隐藏，无法使用语音对话功能，与预期支持上传文件后使用语音对话的需求不符。

## 可能原因
当前代码逻辑中，语音输入按钮的显示条件包含`!havInput`状态判断。当上传文件后，该状态发生变更，导致按钮无法满足显示条件，进而被隐藏。相关代码位于FastGPT项目的`FastGPT/projects/app/src/components/core/chat/ChatContainer/ChatBox/Input/ChatInput.tsx`文件的第520行。

## 排查步骤
1. 打开FastGPT项目中路径为`FastGPT/projects/app/src/components/core/chat/ChatContainer/ChatBox/Input/ChatInput.tsx`的代码文件。
2. 定位到该文件的第520行，查看语音输入按钮的显示判断逻辑，该逻辑为`{whisperConfig.open && !havInput && !isChatting && !!whisperModel && (`。
3. 确认上传文件后的状态是否对`!havInput`这一判断条件产生影响。

## 解决与验证
修改指定代码文件第520行的判断逻辑，调整或移除与上传状态相关的限制，即可使上传文件后语音输入按钮仍可正常显示。验证时，在FastGPT聊天框上传文件后，查看语音输入按钮是否正常显示，确认可正常发起语音对话。

> 来源: [FastGPT GitHub issue #2705](https://github.com/labring/FastGPT/issues/2705)
