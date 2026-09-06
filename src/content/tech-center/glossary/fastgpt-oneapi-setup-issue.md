---
title: 说明FastGPT中OneAPI联动的配置规则与报错处理
slug: /zh/glossary/fastgpt-oneapi-setup-issue
page_type: 术语速查
source: https://github.com/labring/FastGPT/issues/113
source_type: GitHub issue
---

# 说明FastGPT中OneAPI联动的配置规则与报错处理

## 一句话定义
FastGPT中用于对接第三方API中转服务的环境配置与页面校验项。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
需通过环境变量配置ONEAPI_URL与ONEAPI_KEY。其中ONEAPI_URL为第三方API中转服务的完整地址，示例格式为https://xxxxx.cloud.sealos.io/v1；ONEAPI_KEY为对应服务的API密钥。完成配置后服务可正常运行。

## 容易搞错的地方
在账户信息页面，无法直接将ONEAPI_URL填写至openaiKey字段。填写该字段时会触发API密钥格式校验，返回报错文本：Incorrect API key provided: sk- ***************************************D75e. You can find your API key at https://platform.openai.com/account/api-keys.

> 来源: [FastGPT GitHub issue #113](https://github.com/labring/FastGPT/issues/113)
