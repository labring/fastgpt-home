---
title: FastGPT 旧版 QA maxContext 调整后导入无分块的排查
slug: /zh/troubleshoot/fastgpt-maxcontext-import-fragment
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/767
source_type: GitHub issue
---

# FastGPT 旧版 QA maxContext 调整后导入无分块的排查

## 适用场景与历史记录

2024 年的报告描述将旧 config.json 中 maxContext 设为 32000 后导入很快结束却没有分块，改回 16000 时出现队列。 原始讨论提交于 2024-01-22，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

该结果来自报告者的环境，原文触发值为 32000，后续也承认可能有其他变量。它支持一个对照实验，适用范围应限定于原环境。

## 排查与复测

1. 在测试副本记录模型真实上下文限制、导入文件和 QA 拆分参数。
2. 用相同文件对比 16000 与 32000 设置下的队列、模型请求和失败日志。
3. 检查最终分块数量与内容后再判断导入结果；当前版本按对应模型配置入口设置。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：When the context length of the QA model is set to more than 32k, a bug is suspected.](https://github.com/labring/FastGPT/issues/767)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/767#issuecomment-1906364866)

> 来源: [FastGPT 模型配置](https://doc.fastgpt.io/en/self-host/config/model/intro)
