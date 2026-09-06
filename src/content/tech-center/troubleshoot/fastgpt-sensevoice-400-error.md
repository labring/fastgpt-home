---
title: 解决FastGPT私有部署中SenseVoiceSmall模型测试返回400报错问题
slug: /zh/troubleshoot/fastgpt-sensevoice-400-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4538
source_type: GitHub issue
---

# 解决FastGPT私有部署中SenseVoiceSmall模型测试返回400报错问题

## 现象
用户使用FastGPT 4.9.4私有部署版本，配置阿里千问的SenseVoiceSmall模型，自定义请求地址为`https://dashscope.aliyuncs.com/api/v1/services/audio/asr/transcription`。测试模型时，后台返回报错日志：`[Error] 2025-04-14 23:48:25 Api response error: /api/core/ai/model/test?model=SenseVoiceSmall, Bad Request`，同时伴随包含AxiosError堆栈的报错信息，提示`Request failed with status code 400`。

## 可能原因
该报错为HTTP 400 Bad Request状态码，表明客户端发送的请求不符合服务器的要求。结合语音ASR接口的场景，可能的原因包括请求参数格式错误、必填字段缺失、请求路径配置与官方要求不匹配，或API Key权限不足，需结合实际配置进一步确认。

## 排查步骤
1.  检查自定义请求地址是否与模型官方文档指定的接口路径完全一致，确认无拼写错误或路径遗漏。
2.  核对模型测试时的请求参数，确保包含官方要求的必填项，如音频文件、模型名称等。
3.  确认当前使用的API Key已开通对应语音ASR接口的调用权限。
4.  查看完整的报错堆栈日志，提取请求的具体参数内容，定位异常细节。

## 解决与验证
根据排查到的具体问题进行修正：若请求地址错误，修正为官方指定的完整接口路径；若参数缺失，补充必填的请求字段；若权限不足，在API Key管理页面开通对应接口权限。修正完成后，重新测试模型，确认后台不再返回400 Bad Request报错，且接口调用成功。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4538)
