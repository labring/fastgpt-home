---
title: FastGPT对接阿里语音模型配置不生效的排查与解决方法
slug: /zh/troubleshoot/fastgpt-alibaba-voice-model-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2073
source_type: GitHub issue
---

# FastGPT对接阿里语音模型配置不生效的排查与解决方法

## 现象
在FastGPT中尝试对接阿里语音模型时，参照文本模型的配置方式修改配置文件与OneAPI配置后，对接操作不生效。本地部署的Whisper模型效果不佳，无法顺利完成阿里语音模型的对接，且未找到相关官方参考文档。

## 可能原因
对接语音模型与文本模型的配置逻辑存在差异，具体包括：未使用指定的模型名称进行对接；未编写适配的接口脚本对齐目标模型的接口规范；OneAPI存在适配相关的限制，导致自定义配置无法正常生效。

## 排查步骤
1. 了解OneAPI的工作原理，明确语音模型对接需额外适配接口；
2. 检查配置文件与OneAPI配置中的模型名称，确认是否设置为whisper-1；
3. 确认是否已编写用于对齐阿里语音模型接口的Python文件；
4. 查找官方参考文档，确认配置与对接的正确格式与步骤。

## 解决与验证
1. 编写Python文件对齐阿里语音模型的接口规范，完成接口适配；
2. 在FastGPT的配置文件与OneAPI配置中，将模型名称固定设置为whisper-1；
3. 完成配置修改与脚本编写后，重启相关服务以加载新配置；
4. 发起测试调用，验证阿里语音模型的对接效果是否正常；
5. 确认OneAPI是否已应用对应修复，若未应用需按实际环境确认适配方式。

> 来源: [FastGPT GitHub issue #2073](https://github.com/labring/FastGPT/issues/2073)
