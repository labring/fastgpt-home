---
title: 解决FastGPT上传图片无文字输入时提示输入为空的问题
slug: /zh/troubleshoot/fastgpt-fix-empty-input-image-upload
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2346
source_type: GitHub issue
---

# 解决FastGPT上传图片无文字输入时提示输入为空的问题

## 现象
使用多模态模型时，仅上传图片且未输入文字提问，系统会提示输入为空，影响使用体验。

## 可能原因
系统未针对仅上传图片且无文字输入的场景做适配，直接触发了输入为空的校验逻辑，导致报错。

## 排查步骤
1. 确认当前使用的是多模态模型，且仅上传图片未输入文字提问。
2. 观察系统返回的报错信息，确认报错内容为“输入为空”。
3. 检查系统的输入处理流程，确认是否未覆盖无文字输入仅上传图片的场景。

## 解决与验证
添加输入为空的判断逻辑。当检测到仅上传图片且无文字输入时，接入文本加工环节。在文本加工环节配置提示词为"请分析图片内容"。验证时，仅上传图片且不输入文字，系统不再提示输入为空，自动生成针对图片内容的分析请求。

> 来源: [FastGPT GitHub issue #2346](https://github.com/labring/FastGPT/issues/2346)
