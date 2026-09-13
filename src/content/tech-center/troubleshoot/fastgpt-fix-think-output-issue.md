---
title: 解决FastGPT 4.8.22中think标签思考过程输出不稳定的问题
slug: /zh/troubleshoot/fastgpt-fix-think-output-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3831
source_type: GitHub issue
---

# 解决FastGPT 4.8.22中think标签思考过程输出不稳定的问题

## 现象
在FastGPT 4.8.22版本中，设置提示词要求模型输出思考过程后，首次提问可正常返回思考过程与结果，后续提问出现异常。部分场景下，提示词要求先回答再输出思考过程时，也无法正常输出思考过程。部分情况下仅返回最终答案，无思考过程内容。

## 可能原因
无法直接确定具体原因，存在两种可能性：一是模型未按提示输出《think》标签内容；二是FastGPT代码层处理了think相关内容，导致未展示思考过程。此外不同模型的think格式可能存在差异，例如无think标签但存在\think的情况。

## 排查步骤
1. 进入对话记录的详情页面，查看模型返回的原始完整信息。
2. 检查原始返回内容中是否包含《think》标签，或是否存在\think等变体格式。
3. 调整提示词表述，使用规范格式，例如“以输出思考过程，然后回复”。

## 解决与验证
可自定义parser处理reasoning_content，匹配think相关格式，根据实际情况进行对应处理。调整提示词为规范表述，可降低输出异常概率。如需跟踪排错，可通过查看对话详情获取模型原始返回信息，辅助定位问题。

> 来源: [FastGPT GitHub issue #3831](https://github.com/labring/FastGPT/issues/3831)
