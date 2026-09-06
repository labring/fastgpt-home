---
title: 解决FastGPT调用TTS模型时出现500状态码报错的问题
slug: /zh/troubleshoot/fastgpt-tts-500-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3760
source_type: GitHub issue
---

# 解决FastGPT调用TTS模型时出现500状态码报错的问题

## 现象
用户在FastGPT V4.8.17私有部署版本中，搭配oneapi与xinference部署Kokoro TTS模型后，调用TTS功能时出现报错。FastGPT日志显示错误信息为`Api response error: undefined, bad response status code 500 (request id: 2025021202043455918785017681811)`，同时附带了完整的调用堆栈日志。

## 可能原因
结合报错信息与部署链路，可能的触发因素包括：
1.  下游服务返回了500状态码的异常响应；
2.  FastGPT中配置的TTS模型接口地址、密钥等参数存在填写错误；
3.  部署环境的网络策略限制了FastGPT与相关服务之间的通信；
4.  模型部署链路中存在其他未明确的服务异常。

## 排查步骤
1.  查看FastGPT的报错日志，提取`bad response status code 500`与对应请求ID，确认错误为上游服务调用下游接口时返回的异常响应。
2.  核对FastGPT配置页面中的TTS模型接口地址、访问密钥等参数，确保与实际部署的服务配置完全一致。
3.  使用API调试工具直接调用对应接口，验证下游服务是否能正常返回语音生成结果，排查服务本身是否存在异常。
4.  检查部署环境的网络防火墙、安全组等策略，确认FastGPT所在节点可以正常访问下游服务地址。

## 解决与验证
针对排查出的问题分别处理：
如果是配置参数错误，修正FastGPT中的接口地址、密钥等配置项后重启FastGPT服务；如果是下游服务异常，排查相关服务的运行状态，修复服务问题后重新发起调用；如果是网络访问受限，调整网络策略开放对应通信权限。
验证方式为重新发起TTS语音生成请求，确认FastGPT不再返回500状态码的报错，且能正常获取到语音结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3760)
