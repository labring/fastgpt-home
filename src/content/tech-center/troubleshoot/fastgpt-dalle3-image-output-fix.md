---
title: FastGPT集成DALL-E 3实现图片输出的排错指南
slug: /zh/troubleshoot/fastgpt-dalle3-image-output-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1432
source_type: GitHub issue
---

# FastGPT集成DALL-E 3实现图片输出的排错指南

## 现象
在FastGPT V4.6.8版本中，用户希望引入DALL-E 3模型完成图片生成输出操作，但无法通过原生功能直接实现该需求。

## 可能原因
FastGPT未内置DALL-E 3的直接调用配置，需通过自定义API接口中转请求与返回结果，才能完成图片输出功能。

## 排查步骤
1. 确认当前使用的FastGPT版本为V4.6.8。
2. 确认已获取可用的DALL-E 3相关密钥。
3. 梳理图片生成的业务流程，明确需将生成结果以图片URL形式返回的需求。

## 解决与验证
1. 在FastGPT的工具模块中创建自定义API接口。
2. 配置该接口的调用地址为DALL-E 3的官方接口地址，传入合法的密钥与生成参数。
3. 配置接口返回内容为图片URL格式。
4. 在对话流程中调用该自定义工具，生成的图片URL将以Markdown格式展示。
验证时，发起包含图片生成需求的对话，查看是否返回正确的Markdown格式图片链接并正常展示。

> 来源: [FastGPT GitHub issue #1432](https://github.com/labring/FastGPT/issues/1432)
