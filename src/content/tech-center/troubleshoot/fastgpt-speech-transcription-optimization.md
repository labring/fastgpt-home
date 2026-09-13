---
title: 解决FastGPT语音转录效果差与延迟高的优化方案
slug: /zh/troubleshoot/fastgpt-speech-transcription-optimization
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2183
source_type: GitHub issue
---

# 解决FastGPT语音转录效果差与延迟高的优化方案

## 现象
当前FastGPT使用Whisper进行离线语音转录，存在中文转录效果一般、延迟较大的问题，无法满足实时性业务的使用需求。

## 可能原因
原语音转录方案采用Whisper离线模式，未针对实时场景做针对性优化，导致整体延迟偏高，同时中文转录效果存在不足。

## 排查步骤
1. 确认当前FastGPT部署的语音转录模块为Whisper离线方案。
2. 检查当前业务场景是否需要实时语音转录功能。
3. 核对现有部署环境是否支持FunASR相关容器服务的部署。
4. 需按实际环境确认FunASR服务端的部署地址与端口配置。

## 解决与验证
可通过替换为FunASR实时语音转录方案优化体验，具体操作如下：
1. 部署打包为容器的FunASR实时语音转录API服务，获取服务对应的WebSocket访问地址。
2. 参考给定的客户端配置参数调整FastGPT的语音转录逻辑，配置参数包括`chunk_size: [5, 10, 5]`、`wav_name: "h5"`、`is_speaking: True`、`wav_format: "pcm"`、`chunk_interval: 10`、`itn: True`、`mode: "2pass"`、`hotwords: ""`。
3. 运行客户端脚本，将麦克风输入的语音数据通过WebSocket发送至FunASR服务端，测试实时转录效果。
4. 验证转录结果的延迟与准确率是否符合业务需求，确认功能正常运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2183)
