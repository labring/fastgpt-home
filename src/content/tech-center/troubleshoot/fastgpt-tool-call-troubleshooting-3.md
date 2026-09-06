---
title: FastGPT中模型工具调用异常的排查步骤与解决方法
slug: /zh/troubleshoot/fastgpt-tool-call-troubleshooting-3
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3139
source_type: GitHub issue
---

# FastGPT中模型工具调用异常的排查步骤与解决方法

## 现象
在FastGPT中执行需工具调用的任务（如生成电信收入分布折线图分析）时，模型无法正常输出工具调用所需的数据。使用清华质谱glm4模型时，该问题复现。

## 可能原因
1. 所选模型未配置为支持工具调用的openai格式渠道；
2. 渠道代理地址填写错误；
3. 在oneapi渠道中选择了不支持工具调用的模型。

## 排查步骤
1. 确认当前使用的模型是否属于支持openai格式工具调用的类型；
2. 检查模型渠道的配置类型，确认是否使用openai格式渠道；
3. 核对代理地址是否为对应厂商的官方地址；
4. 若使用oneapi渠道，确认未选择千问模型。

## 解决与验证
1. 对于智谱渠道，切换至openai渠道类型，代理地址填写对应厂商的地址；
2. 若使用oneapi渠道，避免选择千问模型；
3. 选择支持openai格式工具调用的模型（如智谱、qwen、deepseek、moonshot），完成配置后发起工具调用任务，验证模型可正常输出工具调用所需数据。

> 来源: [FastGPT GitHub issue #3139](https://github.com/labring/FastGPT/issues/3139)
