---
title: 解决FastGPT接入One-API后调用星火模型返回10013错误的问题
slug: /zh/troubleshoot/fastgpt-spark-10013-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1092
source_type: GitHub issue
---

# 解决FastGPT接入One-API后调用星火模型返回10013错误的问题

## 现象
使用私有部署v4.7版本的FastGPT，接入One-API后调用SparkDesk-v3.5模型时，无论输入内容或知识库是否为空，均返回10013错误。在One-API内进行渠道测试可正常通过，且该模型通过One-API接入其他工具时可正常使用。

## 可能原因
根据现有信息，可能的原因包括FastGPT的模型配置参数与One-API的接口要求不匹配，或FastGPT在转发请求时未正确适配星火模型的特定请求格式。此外，配置文件中的部分参数设置也可能不符合当前FastGPT版本的要求。

## 排查步骤
1. 核对FastGPT中配置的模型名称与One-API内配置的模型名称是否完全一致，即`SparkDesk-v3.5`。
2. 检查`config.json`中的各项参数，包括`maxContext`、`maxResponse`、`quoteMaxToken`、`maxTemperature`等数值是否符合One-API对该模型的限制要求。
3. 查看FastGPT的请求日志，确认转发至One-API的请求参数是否完整且格式正确。
4. 临时关闭配置中的`datasetProcess`、`usedInClassify`等非必要功能开关，测试是否仍返回10013错误。
5. 对比其他正常接入工具的配置参数，排查与当前配置的差异项。

## 解决与验证
根据排查结果调整对应配置项，确保模型名称、参数数值与One-API的要求匹配。若为参数不匹配问题，修改`config.json`中的对应参数值。调整完成后，在FastGPT中重新调用星火模型，确认不再返回10013错误。同时验证One-API内的渠道测试仍正常，且其他工具的接入状态不受影响。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1092)
