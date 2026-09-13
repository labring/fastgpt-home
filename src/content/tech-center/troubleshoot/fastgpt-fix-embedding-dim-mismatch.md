---
title: 解决FastGPT中嵌入模型维度超出预设限制的问题
slug: /zh/troubleshoot/fastgpt-fix-embedding-dim-mismatch
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/622
source_type: GitHub issue
---

# 解决FastGPT中嵌入模型维度超出预设限制的问题

## 现象
在FastGPT中使用Qwen-7B-chat模型的嵌入功能时，该模型的嵌入输出维度为4096，超出FastGPT预设的1536维度限制，导致嵌入服务无法正常运行。此类问题会直接影响基于嵌入功能的相关业务流程，无法正常生成或返回嵌入结果。

## 可能原因
FastGPT对嵌入维度存在固定的预设限制，当所选嵌入模型的实际输出维度与该预设限制不匹配时，会出现维度不兼容的异常，无法正常调用嵌入服务。该问题的核心为模型输出维度与系统配置的维度要求不一致，导致系统无法正常处理嵌入请求。

## 排查步骤
1. 确认当前正在使用的嵌入模型的官方公开输出维度参数，获取具体的维度数值。
2. 核对FastGPT系统中配置的嵌入维度上限值，明确系统允许的最大嵌入维度。
3. 对比模型输出维度与系统配置的维度上限，检查两者是否存在不一致的情况，确认维度超出限制的具体问题。

## 解决与验证
可更换为Alibaba-NLP/gte-Qwen2-1.5B-instruct模型，该模型的嵌入维度可匹配FastGPT的预设限制。更换模型后，启动嵌入服务并发起测试请求，验证嵌入结果能否正常生成，确认维度参数与FastGPT配置一致。

> 来源: [FastGPT GitHub issue #622](https://github.com/labring/FastGPT/issues/622)
