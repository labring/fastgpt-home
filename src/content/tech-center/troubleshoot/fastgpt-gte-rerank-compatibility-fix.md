---
title: 解决FastGPT调用gte-rerank-v2排序模型的兼容问题
slug: /zh/troubleshoot/fastgpt-gte-rerank-compatibility-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5290
source_type: GitHub issue
---

# 解决FastGPT调用gte-rerank-v2排序模型的兼容问题

## 现象
在FastGPT私有部署版本中配置排序模型时，使用gte-rerank-v2模型发起调用会出现异常。该模型仅支持纯字符串数组格式的输入内容，但FastGPT当前传入的documents参数为对象数组，无法匹配模型的输入要求，导致调用失败。用户提供的多张日志截图展示了调用过程中参数传递异常的具体情况，可辅助确认该格式不匹配的问题。

## 可能原因
FastGPT当前的排序模型调用逻辑中，对documents参数的传递格式为对象数组，而gte-rerank-v2模型要求输入为仅包含字符串的数组，两者的参数格式不匹配，无法完成正常的模型调用流程。这种格式差异会导致模型无法正确解析传入的输入内容，进而触发调用失败的结果。

## 排查步骤
1. 确认当前使用的排序模型为gte-rerank-v2。
2. 查看排序模型调用时的传入参数，确认documents字段的具体格式。
3. 对比gte-rerank-v2模型的输入要求，确认是否为纯字符串数组格式。
4. 需按实际环境确认当前FastGPT版本的排序模型调用实现细节。

## 解决与验证
当前需要对FastGPT的排序模型调用逻辑进行适应性调整，将传入的对象数组转换为gte-rerank-v2模型要求的字符串数组格式。完成调整后，可重新配置排序模型并发起调用测试，确认模型可以正常接收输入参数并返回预期的排序结果，以此验证问题是否解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5290)
