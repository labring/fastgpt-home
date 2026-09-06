---
title: FastGPT中defaultSystemChatPrompt与图片生成API报错的说明
slug: /zh/glossary/fastgpt-api-error-troubleshooting-2
page_type: 术语速查
source: https://github.com/labring/FastGPT/issues/1158
source_type: GitHub issue
---

# FastGPT中defaultSystemChatPrompt与图片生成API报错的说明

## 一句话定义
本文说明FastGPT中两类API报错的具体表现与触发场景，包含defaultSystemChatPrompt配置引发的聊天API报错，以及4.8.19版本出现的图片生成相关API报错。

## 在FastGPT里怎么用（参数 / 位置 / 步骤）
FastGPT支持通过config配置defaultSystemChatPrompt参数，该参数关联聊天功能的系统提示词配置。调用/api/v1/chat/completions接口时，会触发与该参数相关的报错逻辑。4.8.19版本的FastGPT中，调用该接口可能出现图片生成相关的API报错，需关注对应报错提示。

## 容易搞错的地方
配置defaultSystemChatPrompt参数后，带有自定义prompt的应用会触发报错，报错信息为core.chat.Chat API is error or undefined，错误堆栈信息为undefined。当应用的prompt为空时，不会触发该报错。4.8.19版本中，调用/api/v1/chat/completions接口时，会出现Api response error: undefined, Image not found的报错，具体错误对象为{ message: "Image not found", stack: undefined }，同时伴随请求完成日志，请求耗时为5399ms。

> 来源: [FastGPT GitHub issue #1158](https://github.com/labring/FastGPT/issues/1158)
> 来源: [FastGPT GitHub issue #3673](https://github.com/labring/FastGPT/issues/3673)
