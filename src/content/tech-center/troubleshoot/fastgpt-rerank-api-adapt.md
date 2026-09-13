---
title: 解决FastGPT中Rerank模型API参数不兼容问题
slug: /zh/troubleshoot/fastgpt-rerank-api-adapt
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/708
source_type: GitHub issue
---

# 解决FastGPT中Rerank模型API参数不兼容问题

## 现象
当调用FastGPT内置的Rerank模型API时，若对接的外部Rerank接口参数格式与FastGPT现有定义不一致，会出现请求参数不匹配、返回结果解析失败的问题。FastGPT现有Rerank API输入要求为`{ query: string; inputs: { id: "string"; text: "string" }[] }`，输出为`{ id: "string"; score?: number }[]`；部分外部Rerank接口的输入包含`model`、`documents`字符串数组、`return_documents`参数，输出包含`id`、`results`数组，每个结果包含`index`、`relevance_score`、`document`字段。

## 可能原因
FastGPT内置的Rerank模型API输入输出参数定义，与当前对接的外部Rerank接口的参数规范不匹配，未适配外部接口的参数格式要求，导致请求无法正常发送或返回结果无法被正确解析。

## 排查步骤
1.  确认当前对接的Rerank接口的完整输入输出参数格式。
2.  对比FastGPT官方定义的`PostReRankProps`和`PostReRankResponse`类型，与目标接口的参数差异。
3.  检查实际发起的Rerank调用请求的参数，是否符合FastGPT现有定义或目标接口的要求。
4.  查看API调用返回的报错文本，定位参数不匹配的具体位置。

## 解决与验证
解决方法为调整FastGPT的Rerank模型API参数定义，使其与目标接口的参数规范对齐。具体需将输入参数调整为包含`model`、`query`、`documents`字符串数组、`return_documents`等字段，将输出格式调整为包含`id`、`results`数组，每个结果包含`index`、`relevance_score`、`document`字段。验证步骤如下：
1.  修改FastGPT中Rerank API的参数定义，使其匹配目标接口的格式。
2.  按照目标接口的参数规范构造Rerank调用请求。
3.  发起调用并检查返回结果的格式是否符合预期。
4.  确认调用成功且返回的排序结果正确可用。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/708)
