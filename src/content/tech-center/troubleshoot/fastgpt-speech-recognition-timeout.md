---
title: 解决FastGPT接入第三方语音识别模型后识别超时的问题
slug: /zh/troubleshoot/fastgpt-speech-recognition-timeout
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2626
source_type: GitHub issue
---

# 解决FastGPT接入第三方语音识别模型后识别超时的问题

## 现象
用户使用fastgpt v4.8.9搭配oneapi 0.6.8部署第三方语音识别模型`iic/SenseVoiceSmall`时，最初出现渠道找不到的报错。通过在OneAPI渠道和令牌中添加`whisper-1`模型名解决了该问题。使用issue中提供的curl命令调用接口可正常返回识别结果，但在FastGPT中发起语音识别后，点击结束按钮，识别过程会持续到超时，无有效结果返回。FastGPT的whisperModel配置为：
```json
"whisperModel": {
  "model": "iic/SenseVoiceSmall",
  "name": "iic/SenseVoiceSmall",
  "charsPointsPrice": 0
}
```
测试用的curl命令如下：
```bash
curl --request POST \
     --url http://...:3001/v1/audio/transcriptions \
     --header 'accept: application/json' \
     --header 'authorization: Bearer sk-fastgpt' \
     --header 'content-type: multipart/form-data' \
     --form file='@bbj.mp3' \
     --form model='iic/SenseVoiceSmall'
```

## 可能原因
1. 第三方语音模型的接口要求与FastGPT默认的语音识别请求封装存在差异，虽然curl调用可正常工作，但FastGPT内部的请求参数未完全匹配第三方模型的接口规范。
2. FastGPT在调用语音识别接口时的请求格式或字段传递存在偏差，导致第三方接口无法正常响应，进而引发超时。

## 排查步骤
1. 检查FastGPT的whisperModel配置项，确认`model`和`name`字段的值与第三方语音模型的实际标识一致，本次场景中为`iic/SenseVoiceSmall`。
2. 使用issue中提供的curl命令测试第三方接口，确认接口可以正常返回识别结果，验证第三方服务与OneAPI的连通性。
3. 对比FastGPT发起语音识别时的请求参数与curl命令的参数，确认是否存在字段遗漏、格式错误等问题。
4. 确认OneAPI中已配置对应渠道的模型名为`whisper-1`，确保渠道可以被正常识别。

## 解决与验证
针对本次场景，已通过在OneAPI渠道和令牌中添加`whisper-1`模型名解决了渠道找不到的问题。若仍存在识别超时的情况，需确保FastGPT的语音识别请求参数与第三方接口要求完全匹配，可参考curl命令的参数格式调整相关调用逻辑。验证方式为在FastGPT中发起语音识别任务，点击结束按钮后等待识别完成，确认不再超时并返回正确的识别文本。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2626)
