---
title: 解决FastGPT调用对话接口提示Key错误的问题
slug: /zh/troubleshoot/fastgpt-key-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/869
source_type: GitHub issue
---

# 解决FastGPT调用对话接口提示Key错误的问题

## 现象
调用FastGPT的`/api/v1/chat/completions`对话接口时，接口返回报错文本`Key is error. You need to use the app key rather than the account key.`，请求代码中通过`Authorization: Bearer`头携带了以`fastgpt-`开头的密钥。

## 可能原因
根据报错提示，问题根源在于调用接口时使用了账号密钥（account key），需要使用的是FastGPT要求的应用密钥（app key）。对话接口需要传入应用级别的专属密钥，才能完成身份验证。

## 排查步骤
1.  检查请求头中`Authorization`字段携带的密钥，确认是否以`fastgpt-`开头。
2.  确认该密钥是从FastGPT对应应用的页面获取的应用密钥，不是个人账号的通用密钥。
3.  核对请求的接口地址是否为`/api/v1/chat/completions`，避免调用了错误的接口路径。
4.  检查请求参数中的`model`、`chatId`、`messages`字段是否完整且格式正确。

## 解决与验证
将请求头`Authorization`字段中的密钥替换为对应FastGPT应用的app key，重新发起接口请求。若接口返回正常的对话响应内容，则验证问题已解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/869)
