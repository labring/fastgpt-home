---
title: 解决FastGPT不支持/v1/completions接口的集成问题
slug: /zh/troubleshoot/fastgpt-support-completions-api
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4620
source_type: GitHub issue
---

# 解决FastGPT不支持/v1/completions接口的集成问题

## 现象
使用LangChain或其他固定调用OpenAI标准`/v1/completions`接口的第三方工具时，对接FastGPT会出现集成失败的问题。当发起POST请求至`http://localhost:3000/api/v1/completions`，携带`Authorization`、`Content-Type`请求头与指定的`model`、`prompt`、`max_tokens`、`temperature`等参数时，无法获得正常响应。

## 可能原因
FastGPT当前仅支持`/v1/chat/completions`接口，未添加对`/v1/completions`路由的支持，无法处理该接口的请求。

## 排查步骤
1. 确认调用方使用的接口路径为`/v1/completions`，检查工具或代码的配置参数。
2. 核对请求参数是否符合OpenAI标准`/v1/completions`接口格式，包含`model`、`prompt`、`max_tokens`、`temperature`等字段。
3. 确认已将FastGPT升级至最新版本。
4. 查看FastGPT运行日志，确认是否存在路由未匹配的相关报错，需按实际环境确认具体报错内容。

## 解决与验证
按照需求为FastGPT添加`/v1/completions`路由支持，将该接口的请求参数转换为`/v1/chat/completions`所需的格式，再返回兼容的响应结果。完成配置后，可使用以下示例命令测试：
```bash
curl --location --request POST 'http://localhost:3000/api/v1/completions' \
--header 'Authorization: Bearer fastgpt-xxxxxx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "model": "gpt-3.5-turbo",
    "prompt": "请介绍一下 FastGPT 的主要功能。",
    "max_tokens": 100,
    "temperature": 0.7
}'
```
替换其中的FastGPT地址与API密钥后发起请求，验证是否能正常获取符合预期的响应内容。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4620)
