---
title: 配置FastGPT的OpenAI JSON模式及解答相关配置使用疑问
slug: /zh/troubleshoot/fastgpt-openai-json-mode-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/871
source_type: GitHub issue
---

# 配置FastGPT的OpenAI JSON模式及解答相关配置使用疑问

## 现象
用户希望在AI对话节点添加OpenAI JSON模式开关，使用中发现无法直接启用该模式，同时对内容提取模块的调用逻辑存在疑问，不清楚其是否需要二次调用模型，且相关配置文档对必填提取文本的用途说明不够清晰。

## 可能原因
一是未在API请求中添加指定的响应格式参数，导致无法启用JSON模式；二是对内容提取模块的工作逻辑存在误解，误以为需要二次调用模型完成字段提取；三是相关配置文档的说明不够明确，导致对部分必填配置项的用途不清晰。

## 排查步骤
1. 检查AI对话节点的API请求参数，确认是否包含响应格式相关配置；
2. 查看内容提取模块的官方说明，确认其提取逻辑是否需要二次调用模型；
3. 核对项目文档中关于JSON模式和内容提取的相关内容，明确各配置项的具体用途。

## 解决与验证
在AI对话节点的API请求中加入`"response_format": { "type": "json_object" }`参数，即可启用JSON模式。内容提取模块可直接提取字段，无需二次调用模型，直接配置对应模型即可完成提取。若需验证配置效果，发起对话请求，确认返回结果为符合格式的JSON内容，且内容提取可正常完成。

> 来源: [FastGPT GitHub issue #871](https://github.com/labring/FastGPT/issues/871)
