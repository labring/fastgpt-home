---
title: 解决FastGPT知识库图片内容调用效果不佳的问题
slug: /zh/troubleshoot/fastgpt-knowledge-image-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1640
source_type: GitHub issue
---

# 解决FastGPT知识库图片内容调用效果不佳的问题

## 现象
在FastGPT知识库中插入图片内容后，调用LLM生成回复时，无法稳定输出相关图片内容，无法满足智能客服回复带软件截图的需求。

## 可能原因
知识库中的图片以markdown链接形式存储，LLM仅能识别为代码片段，无法准确理解图片实际内容。LLM在不确定内容的情况下，不会主动输出相关图片，导致调用效果不稳定。

## 排查步骤
1. 确认知识库中图片的存储形式，是否为标准markdown图片链接格式。
2. 确认当前使用的LLM模型是否支持多模态内容识别。
3. 检查应用提示词配置，确认是否包含针对图片内容调用的引导规则。

## 解决与验证
为知识库中的每张图片链接添加详细的前置描述文本，说明图片的具体内容与使用场景。在应用的提示词中明确强调，要求LLM在匹配到相关知识时，调用知识库中的图片链接。发起测试请求，确认LLM可以稳定输出带有图片链接的回复内容，满足智能客服带截图回复的需求。

> 来源: [FastGPT GitHub issue #1640](https://github.com/labring/FastGPT/issues/1640)
