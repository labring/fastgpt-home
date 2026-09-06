---
title: 解决FastGPT调用OpenAPI对话接口未使用知识库的问题
slug: /zh/troubleshoot/fastgpt-openapi-kb-not-loaded
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6106
source_type: GitHub issue
---

# 解决FastGPT调用OpenAPI对话接口未使用知识库的问题

## 现象
用户调用FastGPT的OpenAPI对话接口时，返回结果未使用应用绑定的知识库。在私有化部署的FastGPT后台直接提问相同问题时，结果正常，两者返回内容存在明显差异。用户的请求路径为`/api/v1/chat/completions`，请求payload包含`messages`、`stream`、`chatId`、`appId`参数。

## 可能原因
结合问题现象，可能的原因包括：请求未携带触发知识库检索的必要参数，传参格式不符合接口要求，或者应用配置与请求参数不匹配。部分信息需按实际环境确认。

## 排查步骤
1. 核对请求的传参内容，对照官方文档检查是否遗漏了触发知识库检索的必要参数。
2. 对比后台直接提问与OpenAPI调用的完整请求参数，确认两者的参数差异。
3. 检查appId对应的FastGPT应用是否正确关联了目标知识库，确认应用配置无误。
4. 验证请求的接口路径是否为正确的对话接口路径。

## 解决与验证
根据排查结果补充缺失的必要参数，确保传参格式符合接口要求。重新发起OpenAPI调用，对比返回结果与后台直接提问的结果是否一致，确认调用结果已正确使用应用知识库。若问题仍未解决，需结合实际部署环境进一步排查。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/6106)
