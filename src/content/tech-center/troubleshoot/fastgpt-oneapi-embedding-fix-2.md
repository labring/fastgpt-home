---
title: 解决FastGPT 4.8版本OneAPI嵌入模型调用失败问题
slug: /zh/troubleshoot/fastgpt-oneapi-embedding-fix-2
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3603
source_type: GitHub issue
---

# 解决FastGPT 4.8版本OneAPI嵌入模型调用失败问题

## 现象
用户使用FastGPT 4.8版本，通过OneAPI接入模型，配置的嵌入模型为m3e。LLM对话功能可正常使用，但嵌入模型调用失败。在FastGPT创建知识库并输入文本时触发报错，OneAPI日志显示嵌入模型调用异常。用户提供了OneAPI配置截图、OneAPI内嵌入模型测试截图、FastGPT报错截图、OneAPI报错日志截图，以及compose和json配置文件截图。

## 可能原因
结合报错场景，可能的原因包括OneAPI中嵌入模型的配置参数不符合FastGPT的调用要求、FastGPT与OneAPI的嵌入模型接口交互格式不匹配，以及配置文件中的嵌入模型相关配置项存在错误。

## 排查步骤
1.  核对OneAPI内嵌入模型的配置参数，对照用户提供的配置截图，确认模型名称、接口地址、访问密钥等信息无误，排查拼写或格式错误。
2.  在OneAPI平台内单独测试嵌入模型的调用，确认模型可以正常返回嵌入结果，排除OneAPI本身的模型接入故障。
3.  检查FastGPT的compose或json配置文件，确认嵌入模型的相关配置项与OneAPI内的配置保持一致。
4.  查看FastGPT和OneAPI的运行日志，提取具体的报错文本，定位调用失败的具体环节。

## 解决与验证
根据排查结果修正对应的配置参数，确保FastGPT与OneAPI的嵌入模型接口调用格式匹配。修正完成后，先在OneAPI中重新测试嵌入模型调用，确认功能正常。再回到FastGPT，重新创建知识库并输入文本，验证嵌入模型调用不再触发报错，同时确认LLM对话功能仍可正常运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3603)
