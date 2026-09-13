---
title: 解决FastGPT API并发调用时的对话历史干扰问题
slug: /zh/troubleshoot/fastgpt-api-concurrent-chat-interference
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6103
source_type: GitHub issue
---

# 解决FastGPT API并发调用时的对话历史干扰问题

## 现象
使用FastGPT 4.14.4私有部署版本时，程序通过API访问FastGPT发起并发请求，对话之间出现历史干扰。批量运行对话时，手动删除对话历史后再发起下一个问题请求，执行效果与预期存在差异。

## 可能原因
未为每个独立对话分配唯一的chatId参数，导致不同请求共享同一对话上下文，引发历史干扰。该问题仅在未正确使用chatId的场景下出现。

## 排查步骤
1. 确认使用的FastGPT版本为4.14.4私有部署版本，检查API请求参数是否携带chatId字段
2. 核对批量请求中chatId的生成逻辑，确认是否存在重复使用同一chatId的情况
3. 单独发起单个对话请求并使用独立chatId，验证对话历史是否可正常隔离，无跨请求干扰

## 解决与验证
为每个独立对话生成唯一的chatId，在API请求中携带该唯一chatId参数。发起并发请求测试，确认各对话无历史干扰。在批量运行场景中，无需手动删除对话历史即可正常执行各独立对话。使用同一chatId的请求会出现历史干扰，使用不同chatId的请求可正常隔离对话历史。

> 来源: [FastGPT GitHub issue #6103](https://github.com/labring/FastGPT/issues/6103)
