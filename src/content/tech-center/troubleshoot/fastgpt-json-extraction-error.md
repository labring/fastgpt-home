---
title: 解决FastGPT 4.7.1私有部署版JSON提取结果异常问题
slug: /zh/troubleshoot/fastgpt-json-extraction-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1200
source_type: GitHub issue
---

# 解决FastGPT 4.7.1私有部署版JSON提取结果异常问题

## 现象
在FastGPT 4.7.1私有部署版本中，调用qwen-1.8b-chat模型时，发送包含提取要求和JSON Schema的提示词后，模型返回结果未符合预期：
1.  首次请求使用**<对话记录></对话记录>**标签包裹对话内容，模型返回了额外的自然语言解释文本，且未生成符合要求的searchKey字段，错误返回了完整的Schema定义。
2.  调整提示词移除标签后，模型返回的JSON包含了Schema中未要求的description字段，且使用单引号包裹键值，不符合标准JSON格式要求。

## 可能原因
目前未明确具体根因，可观察到的关联因素包括：提示词中使用的自定义标签格式可能干扰模型对提取规则的理解，模型未严格遵循给定的JSON Schema定义生成结果。具体根因需结合实际部署环境和模型配置进一步确认。

## 排查步骤
1.  完整记录当前的请求参数，包括model、temperature、messages内容以及返回的完整响应结果。
2.  检查提示词中的自定义标签、JSON Schema的语法是否正确，比如是否存在未闭合的标签、引号使用错误等问题。
3.  移除提示词中可能干扰模型的额外格式标签，仅保留核心的提取规则、Schema定义和对话记录内容。
4.  调整temperature参数至0或0.1，降低模型的随机性，提升结果的一致性。
5.  确认当前使用的模型版本与FastGPT版本的兼容性，若有更新版本可尝试升级。

## 解决与验证
根据测试调整，移除提示词中的**<对话记录></对话记录>**自定义标签，调整提示词仅保留核心内容后，可有效改善结果。验证步骤如下：
1.  重新构造提示词，仅使用“对话记录”作为标识，不使用自定义标签包裹。
2.  确保提示词中的JSON Schema使用双引号，且仅定义需要提取的字段。
3.  发送请求后，观察模型返回结果是否仅为符合Schema的纯JSON字符串，无额外自然语言解释，且字段仅包含searchKey。例如调整后的请求应返回类似{"searchKey": "今日股票"}的标准JSON内容。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1200)
