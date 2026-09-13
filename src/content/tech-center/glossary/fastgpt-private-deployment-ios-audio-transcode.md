---
title: FastGPT私有部署版本iOS语音输入音频转码适配说明
slug: /zh/glossary/fastgpt-private-deployment-ios-audio-transcode
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/2714
source_type: 官方文档
---

# FastGPT私有部署版本iOS语音输入音频转码适配说明

## 一句话定义
ffmpeg -i是FastGPT私有部署版本中用于转码iOS语音输入生成的音频文件，使其可被正常识别的命令行参数组合，可解决iOS浏览器语音输入生成的音频无法被识别的问题。

## 在 FastGPT 里怎么用
在FastGPT私有部署版本4.8.10中，当工作流配置语音输入功能后，Mac设备通过浏览器使用语音输入可正常完成识别，但iOS设备浏览器生成的音频文件无法被识别。该音频文件本身可正常播放，但直接调用接口时无法被识别。此时需使用ffmpeg命令行工具，执行ffmpeg -i [原音频文件路径] [输出音频文件路径]命令完成转码，例如输入ffmpeg -i record.mp3 out.mp3，即可将原音频文件转码为可正常识别的格式，转码后的音频文件可正常完成识别流程。该操作仅针对iOS设备浏览器生成的语音音频，Mac设备生成的音频无需转码即可正常使用。

## 容易搞错的地方
该问题仅出现在私有部署版本中，未在公有云版本中被验证，不可直接推广到所有FastGPT部署场景。iOS端生成的语音音频无法直接被识别，必须通过转码处理，不可忽略该步骤。需使用ffmpeg -i格式的转码命令，其他转码方式未被该场景验证有效。不可将该问题等同于通用的音频格式兼容问题，需结合FastGPT工作流语音输入的具体配置场景判断。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2714)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
