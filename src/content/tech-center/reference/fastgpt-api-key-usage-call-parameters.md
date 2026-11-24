---
title: 说明FastGPT应用API访问的APIKey配置与调用参数使用方法
slug: /zh/reference/fastgpt-api-key-usage-call-parameters
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/publish/openapi
source_type: 官方文档小节
---

# 说明FastGPT应用API访问的APIKey配置与调用参数使用方法

## 结论
FastGPT API访问的调用凭证为团队成员的APIKey。调用目标应用的chat/completions接口时，推荐在请求体传入appId参数，也支持apiKey-appId兼容格式。

## 具体怎么做
1. 登录FastGPT，进入目标应用的发布渠道API入口，获取当前登录成员可用的APIKey。
2. 调用chat/completions接口时，在请求体中传入appId参数。
3. 若第三方应用仅支持OpenAI SDK风格的密钥，使用apiKey-appId兼容格式配置密钥。

## 注意事项
1. APIKey为团队成员的开放接口调用凭证，不再按应用创建专属密钥。
2. 仅当第三方应用仅支持OpenAI SDK风格的密钥时，可使用apiKey-appId兼容格式。
3. 完整的接口说明可查看OpenAPI介绍。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/publish/openapi)
