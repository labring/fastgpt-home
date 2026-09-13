---
title: FastGPT苹果手机语音输入效果差、文件不全问题排查
slug: /zh/troubleshoot/fastgpt-ios-voice-issue-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1392
source_type: GitHub issue
---

# FastGPT苹果手机语音输入效果差、文件不全问题排查

## 现象
苹果手机语音输入效果差、语音文件不全，安卓手机无此问题。Safari浏览器下mac端语音输入失效，谷歌浏览器正常。部分场景下whisper模型识别结果为繁体字，准确率低。ios生成的音频文件可直接手机播放，但whisper模型无法识别；mac生成的音频文件手机无法播放，但whisper模型可正常识别。

## 可能原因
1. Safari浏览器存在兼容性问题；
2. 不同设备生成的语音文件格式与whisper模型识别要求不匹配；
3. whisper模型本身存在识别准确率不足、繁体识别错误的问题。

## 排查步骤
1. 确认部署环境已开启HTTPS；
2. 分别使用安卓设备、mac端谷歌浏览器、Safari浏览器测试语音输入，对比各场景下的表现；
3. 检查whisper模型配置，查看识别结果是否存在繁体或准确率低的情况；
4. 录制语音文件，对比不同设备生成的音频，验证文件可播放性与识别适配性。

## 解决与验证
针对Safari兼容性问题，可参考opus-media-recorder相关方案。针对繁体识别问题，可使用openCC工具处理识别结果。针对准确率低的问题，可更换为Belle-whisper-large-v3-zh模型，该模型显存占用4-5G，兼容oneapi定向whisper-1特性。也可对接阿里新模型，效果与性能表现较好。验证时，更换模型或调整配置后，重新测试各设备的语音输入效果，确认文件完整性与识别准确率。

> 来源: [FastGPT GitHub issue #1392](https://github.com/labring/FastGPT/issues/1392)
