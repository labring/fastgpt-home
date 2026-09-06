---
title: 解决FastGPT工作流iOS浏览器语音输入适配问题
slug: /zh/troubleshoot/fastgpt-ios-browser-voice-input-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2714
source_type: GitHub issue
---

# 解决FastGPT工作流iOS浏览器语音输入适配问题

## 现象
私有部署版本4.8.10的FastGPT工作流配置语音输入后，Mac通过浏览器语音输入正常，iOS手机浏览器语音输入失败。iOS手机生成的音频文件可正常播放，但直接调用对应接口无法识别。经ffmpeg转码（命令为ffmpeg -i record.mp3 out.mp3）后，音频文件识别正常。

## 可能原因
暂未明确具体原因，推测可能与iOS浏览器生成的音频文件编码格式不符合接口识别标准相关，需按实际环境进一步确认。

## 排查步骤
1. 验证iOS浏览器生成的音频文件是否可正常播放。
2. 直接调用对应接口，测试iOS生成的原始音频文件的识别结果。
3. 使用ffmpeg工具对原始音频文件执行转码操作，转码命令为ffmpeg -i record.mp3 out.mp3，再次测试转码后音频文件的识别结果。

## 解决与验证
当前可通过ffmpeg转码处理iOS生成的音频文件，转码命令为ffmpeg -i record.mp3 out.mp3，转码后提交识别即可正常完成流程。后续可等待官方适配更新。验证方式为使用iOS浏览器完成语音输入，转码后提交识别，确认识别流程正常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2714)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
