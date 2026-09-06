---
title: 解决FastGPT API调用的语音与图片输入输出支持问题
slug: /zh/troubleshoot/fastgpt-api-speech-image-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1318
source_type: GitHub issue
---

# 解决FastGPT API调用的语音与图片输入输出支持问题

## 现象
FastGPT网页分享链接可正常使用语音、图片输入输出功能，但API接口仅支持文本问答，无法直接实现语音、图片的输入输出。

## 可能原因
FastGPT的API接口与网页端功能逻辑分离，未直接集成语音、图片输入输出的原生处理逻辑，相关功能需通过组合现有接口实现。

## 排查步骤
1. 检查API调用的请求参数，确认未配置语音转文字输入、图片链接输入的相关字段；
2. 调用API接口，验证响应内容是否仅包含文本，无图片Markdown链接或语音相关返回字段；
3. 确认无原生API可直接实现语音、图片的完整输入输出流程。

## 解决与验证
语音输入需先将语音转换为文字，再将转换后的文本作为API调用的输入参数。图片输入需先存储图片资源，获取图片链接后将链接作为API调用的输入参数。API返回的图片相关内容将以Markdown链接格式呈现，可直接解析使用。相关功能无需新增原生API，仅通过组合现有接口即可实现。
验证步骤：1. 完成语音转文字后调用API，确认返回对应文本问答结果；2. 上传图片获取链接后调用API，确认返回包含图片Markdown链接的响应；3. 检查API响应的图片链接可正常访问。

> 来源: [FastGPT GitHub issue #1318](https://github.com/labring/FastGPT/issues/1318)
