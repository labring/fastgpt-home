---
title: FastGPT API调用停止回答与并发提问问题排查指南
slug: /zh/troubleshoot/fastgpt-api-stop-answer-concurrent
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/195
source_type: GitHub issue
---

# FastGPT API调用停止回答与并发提问问题排查指南

## 现象
FastGPT使用中出现两类问题：其一，页面内置停止回答功能可正常触发，但无公开接口说明，无法通过API调用该功能；其二，通过API调用对话接口时，使用不同chatId发起提问，返回的流式数据id为空，无法将不同提问的流式回答进行区分。同时存在API调用场景下停止回答的需求，相关请求示例包括页面停止功能的curl请求，以及API对话接口的curl请求。

## 可能原因
其一，停止回答功能仅在前端页面内置触发逻辑，未提供公开的API调用说明与接口；其二，模型API本身未提供主动终止的操作接口；其三，当使用不同chatId发起并发提问时，接口返回的流式数据未携带有效id标识，导致无法区分不同提问的回答内容。

## 排查步骤
1. 确认停止回答功能的调用方式，参考页面触发时的网络请求，提取对应的curl请求参数与地址；
2. 检查API调用时的chatId配置，确认是否在同一问答窗口使用了不同chatId；
3. 验证流式返回数据的id字段是否存在，确认是否为空值；
4. 尝试中断当前API请求，观察是否能终止模型服务的响应。

## 解决与验证
1. 停止回答的实现：通过中断当前API请求即可终止模型服务的响应，无需调用额外的终止接口。若需通过API调用页面的停止功能，可参考页面触发时的网络请求，提取对应的curl请求参数与地址，示例如下：
```
curl 'http://10.4.134.11:3020/_next/data/OLRnvyIpwtGgTD4p7MF0h/zh/chat.json?chatId=c91bj6l78lc4&appId=65efb0b8b12a789bea7777f7' -H \"Accept: /\" -H \"Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6\" -H \"Connection: keep-alive\" -H \"Referer: http://10.4.134.11:3020/chat?appId=65efb0b8b12a789bea7777f7\" -H \"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0\" -H \"x-nextjs-data: 1\" --insecure
```
2. 并发提问与数据区分：同一问答窗口默认chatId相同，若需发起并发提问，需按实际环境确认chatId的配置逻辑，同时注意流式数据的id标识需按实际返回内容进行适配。
3. 验证停止功能：中断API请求后，观察模型是否停止返回响应内容，验证终止效果。

> 来源: [FastGPT GitHub issue #195](https://github.com/labring/FastGPT/issues/195)
