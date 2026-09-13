---
title: FastGPT API调用返回异常的排查与解决方法
slug: /zh/troubleshoot/fastgpt-api-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/410
source_type: GitHub issue
---

# FastGPT API调用返回异常的排查与解决方法

## 现象
使用Python代码调用FastGPT公有云API时返回异常内容。用户的请求代码中，请求地址为`https://fastgpt.run/api/v1/chat/completions`，使用的API密钥为`YOUR_API_KEY`，请求体包含`chatId`、`stream`、`detail`、`variables`和`messages`字段。该问题更换VPN无法解决，在Colab环境运行也出现相同结果，附带两张异常响应截图。

## 可能原因
最常见的原因为请求头的Authorization字段未添加标准Bearer前缀，导致API密钥无法通过验证。此外，请求地址错误、API密钥无效也可能引发该问题。

## 排查步骤
1.  查看API返回的具体错误文本，初步定位问题类型。
2.  检查请求头的Authorization字段格式，确认是否为`Bearer {your_apikey}`的标准格式。
3.  核对请求地址是否与官方文档中给出的API路径一致。
4.  确认传入的API密钥是否正确，无拼写或格式错误。
5.  在本地或Colab环境中重新发起请求，排除网络环境的额外限制。

## 解决与验证
如果是Authorization字段缺少Bearer前缀，修改请求头为`{"Authorization": "Bearer YOUR_API_KEY", "Content-Type": "application/json"}`，重新发送请求。如果是请求地址错误，替换为官方推荐的正确API路径。如果是API密钥无效，更换为有效的密钥后重试。修改后重新运行代码，验证是否返回正常的聊天响应内容。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/410)
