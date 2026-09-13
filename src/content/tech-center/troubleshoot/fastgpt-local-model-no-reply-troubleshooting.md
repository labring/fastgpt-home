---
title: 解决FastGPT调用本地部署模型无回复的排错方法
slug: /zh/troubleshoot/fastgpt-local-model-no-reply-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3166
source_type: GitHub issue
---

# 解决FastGPT调用本地部署模型无回复的排错方法

## 现象
用户在FastGPT v4.8.12私有部署版本中，使用xinference部署的qwen2-instruct本地模型时，发送消息无回复。该模型在oneapi上可正常访问，调用oneapi的openai接口也能正常工作，FastGPT存在对应报错日志，同时用户提供了config.json的配置截图。

## 可能原因
结合该场景，可能的问题包括FastGPT的模型配置参数与oneapi的对接要求不匹配，config.json中的配置项存在错误，或者FastGPT调用模型的接口格式与oneapi的实际配置不一致。

## 排查步骤
1.  核对FastGPT私有部署版本为v4.8.12，对照用户提供的config.json截图，检查其中的模型相关配置项是否正确。
2.  再次验证oneapi的openai接口调用正常，确认使用的密钥、接口地址、模型名称等参数与FastGPT中的配置保持一致。
3.  查看FastGPT的报错日志，提取具体的错误信息，定位问题点。
4.  确认xinference中部署的qwen2-instruct模型服务运行正常。

## 解决与验证
根据排查结果修正对应的配置项。如果是配置参数不匹配，调整FastGPT中的模型名称、接口地址、密钥等参数，使其与oneapi的配置一致。重启FastGPT服务后，再次向模型发送测试消息，验证是否能正常获得回复。同时可查看oneapi的日志，确认是否收到来自FastGPT的调用请求，确保调用链路完整。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3166)
