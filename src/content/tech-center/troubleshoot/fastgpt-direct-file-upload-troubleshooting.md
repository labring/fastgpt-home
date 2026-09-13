---
title: FastGPT直接选择文件上传失败的排查与解决方法
slug: /zh/troubleshoot/fastgpt-direct-file-upload-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3794
source_type: GitHub issue
---

# FastGPT直接选择文件上传失败的排查与解决方法

## 现象
在FastGPT的对话交互界面中，直接通过文件选择按钮上传文件时操作失败，将目标文件粘贴至输入框后可正常完成上传流程。

## 可能原因
目前未明确具体根因，仅观察到直接选择文件与粘贴文件到输入框两种上传方式的行为存在明确差异，直接选择文件的上传流程存在异常。

## 排查步骤
1. 打开FastGPT的对话交互界面，将目标文件粘贴至输入框，观察上传功能是否可正常触发并完成。
2. 点击输入框旁的文件选择按钮，选择与第一步相同的目标文件，观察上传操作是否失败。

## 解决与验证
目前可通过将文件粘贴至输入框的方式完成上传。验证时，将目标文件粘贴至FastGPT对话界面的输入框，确认上传流程可正常触发并完成即可。

> 来源: [FastGPT GitHub issue #3794](https://github.com/labring/FastGPT/issues/3794)
