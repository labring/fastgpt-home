---
title: 解决FastGPT接入第三方语音模型识别异常与配置不生效问题
slug: /zh/troubleshoot/fastgpt-third-party-voice-model-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2047
source_type: GitHub issue
---

# 解决FastGPT接入第三方语音模型识别异常与配置不生效问题

## 现象
用户本地部署了whisper与oneapi，FastGPT语音测试功能正常但识别效果较差。同时存在两个异常表现：
1.  直接通过curl调用whisper的3003端口或oneapi的3001端口时，无论`model`参数填写何种内容，均返回whisper-1的识别结果。例如传入`paraformer-realtime-v1-XXXXXX`时，实际调用的仍是whisper-1。
2.  已在config.json中配置阿里语音模型，并在oneapi的原有阿里渠道中添加了该模型，但运行日志显示语音请求始终调用whisper-1，配置未生效。

## 可能原因
结合异常表现，推测核心原因为：
1.  oneapi的请求转发逻辑未正确解析或传递`model`参数，强制使用了默认的whisper-1模型。
2.  FastGPT或oneapi的语音模型配置未正确绑定指定的第三方语音模型，导致 fallback 到默认的whisper-1。
3.  配置文件中的语音模型参数未被正确加载，或渠道配置存在遗漏。

## 排查步骤
1.  直接通过curl命令测试第三方语音服务端口，验证`model`参数是否被正确识别。例如执行：`curl http://127.0.0.1:3003/v1/audio/transcriptions -H "Authorization: Bearer sk-tarzan" -H "Content-Type: multipart/form-data" -F model="paraformer-realtime-v1-XXXXXX" -F file="@/home/ftpzjp/1.mp3" -F response_format=text`，观察返回结果是否匹配传入的模型参数。
2.  检查oneapi中配置的语音模型渠道，确认已正确添加阿里语音模型，且渠道的认证、接口地址等参数配置完整无误。
3.  查看oneapi的运行日志，确认语音请求的`model`参数是否被正确传递到后端语音服务，未被替换为默认值。
4.  检查FastGPT的config.json配置文件，确认语音模型的配置项已正确修改为阿里语音模型，重启FastGPT服务后查看运行日志。

## 解决与验证
1.  修正oneapi的语音模型配置，确保指定的第三方语音模型参数正确，渠道配置无遗漏。
2.  重新通过curl调用oneapi的3001端口，传入配置的阿里语音模型参数，验证返回结果是否符合预期。例如执行：`curl http://127.0.0.1:3001/v1/audio/transcriptions -H "Authorization: Bearer sk-fastgpt" -H "Content-Type: multipart/form-data" -F model="paraformer-realtime-v1-XXXXXX" -F file="@/home/ftpzjp/1.mp3" -F response_format=text`。
3.  在FastGPT中重新确认语音模型配置，重启服务后进行语音测试，查看识别效果是否符合预期，运行日志中是否正确调用配置的阿里语音模型。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2047)
