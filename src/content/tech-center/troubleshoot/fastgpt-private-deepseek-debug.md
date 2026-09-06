---
title: 解决FastGPT私有部署版配置deepseek-chat模型调用异常问题
slug: /zh/troubleshoot/fastgpt-private-deepseek-debug
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2420
source_type: GitHub issue
---

# 解决FastGPT私有部署版配置deepseek-chat模型调用异常问题

## 现象
FastGPT私有部署v4.8.9版本中，用户配置deepseek-chat模型后调用出现异常，更换为gpt-4o-mini模型可正常使用，且线上版本可正常调用deepseek-chat模型。本次配置的deepseek-chat模型参数包含vision设为true，多个usedIn相关字段设为true，toolChoice与functionCall设为false，具体报错文本需按实际环境确认。

## 可能原因
结合现有信息，可能的原因包括私有部署环境与线上环境的模型接入配置存在差异，当前配置的deepseek-chat模型参数与模型实际支持的能力不匹配，私有部署的模型调用链路存在异常。

## 排查步骤
1. 确认当前FastGPT私有部署版本为v4.8.9，收集线上可正常运行deepseek-chat模型的配置参数，与本地配置进行逐项对比。
2. 检查模型配置JSON中的参数，重点核对vision、toolChoice、functionCall、maxContext、quoteMaxToken等与模型适配相关的字段是否符合模型官方要求。
3. 排查私有部署环境中模型调用的网络连通性、密钥有效性、接入渠道配置是否与线上环境一致。
4. 临时替换为其他已验证可正常使用的模型，验证FastGPT私有部署的整体调用链路是否正常。

## 解决与验证
若需临时恢复调用，可先更换为gpt-4o-mini模型，确认业务正常运行。若需使用deepseek-chat模型，需调整模型配置参数，确保参数与模型实际支持的能力匹配，例如确认toolChoice、functionCall的设置是否符合模型的工具调用能力，调整maxContext、quoteMaxToken等参数至模型允许的限额范围内。完成配置修改后，保存并发起模型调用测试，验证异常是否解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2420)
