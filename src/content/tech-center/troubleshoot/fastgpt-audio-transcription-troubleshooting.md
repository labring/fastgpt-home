---
title: 解决FastGPT音频转写格式报错与长音频异常问题
slug: /zh/troubleshoot/fastgpt-audio-transcription-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2723
source_type: GitHub issue
---

# 解决FastGPT音频转写格式报错与长音频异常问题

## 现象
调用音频转写接口时出现三类异常：1. 特定m4a音频文件调用后返回报错文本"choose a window size 400 that is [2, 0]"；2. 接入指定版本oneapi后调用接口返回422错误；3. 长音频文件转写无法正常完成或结果异常；4. 部分格式音频转写返回非完整或错误内容。

## 可能原因
结合异常场景，可能的触发因素包括：1. 音频文件时长超出默认处理范围且未启用音频分割；2. 接口参数配置与oneapi适配存在冲突；3. 特定音频文件的编码或参数不符合前端处理要求；4. 未配置VAD模型处理长音频内容。

## 排查步骤
1.  检查调用的音频文件格式，确认是否为mp3、wav、m4a等支持的格式；
2.  核对接口调用参数，确保使用multipart/form-data格式，包含file和model字段；
3.  针对长音频文件，尝试添加VAD模型配置以启用音频分割处理；
4.  排查oneapi版本兼容性，确认使用的oneapi版本是否与当前部署环境匹配；
5.  查看接口返回的详细报错日志，定位具体异常点。

## 解决与验证
1.  对于特定格式报错，可参考开源项目SenseVoice-OneApi调整接口实现；
2.  长音频转写异常时，指定VAD模型进行音频分割处理；
3.  接入oneapi出现422错误时，检查请求头、参数格式是否符合要求，确认oneapi版本适配性；
4.  接口支持mp3、wav、m4a等常见音频格式，非流式转写可直接使用；
5.  验证方式：使用本地curl命令测试接口，确认返回正常转写结果后再接入上层服务。

> 来源: [FastGPT GitHub issue #2723](https://github.com/labring/FastGPT/issues/2723)
