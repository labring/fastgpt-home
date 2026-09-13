---
title: 解决FastGPT私有部署版iPhone端TTS语音播放报错问题
slug: /zh/troubleshoot/fastgpt-iphone-tts-playback-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1216
source_type: GitHub issue
---

# 解决FastGPT私有部署版iPhone端TTS语音播放报错问题

## 现象
在FastGPT V4.7.1私有部署版本中，iPhone手机的微信内浏览器、Safari浏览器、Chrome浏览器访问分享链接时，点击语音阅读按钮会报错，提示错误文本为Can't find variable: MediaSource。PC浏览器、安卓设备、iPad均可正常播放语音，仅iPhone端出现该问题。当语音配置为gpt-tts-1时触发报错，切换为浏览器自带免费TTS则可正常播放。

## 可能原因
报错提示缺少MediaSource变量，结合配置差异可知，gpt-tts-1的语音播放实现依赖MediaSource API，而iPhone端相关浏览器环境中该API未被正确识别或加载，导致运行时出错；浏览器自带免费TTS未使用该API，因此可正常播放。

## 排查步骤
1. 确认当前FastGPT部署版本为V4.7.1私有部署版。
2. 检查语音播放配置，确认当前使用的是gpt-tts-1类型的TTS服务。
3. 在iPhone端的微信内浏览器、Safari浏览器、Chrome浏览器中打开FastGPT分享链接，点击语音阅读按钮，确认报错提示为Can't find variable: MediaSource。
4. 对比PC、安卓、iPad端的语音播放表现，确认仅iPhone端出现该报错。

## 解决与验证
若仅需临时恢复播放功能，可将语音配置切换为浏览器自带免费TTS。若需使用gpt-tts-1实现语音播放，需排查FastGPT中该TTS服务的播放逻辑，确认MediaSource API在iPhone端浏览器环境中的兼容性与加载时机，具体修复方案需按实际环境确认。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1216)
