---
title: 解决FastGPT接入兼容OpenAI API的私有模型配置问题
slug: /zh/troubleshoot/fastgpt-custom-model-access
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/520
source_type: GitHub issue
---

# 解决FastGPT接入兼容OpenAI API的私有模型配置问题

## 现象
未明确描述具体异常表现，仅完成了确认无类似功能、已升级至最新版本、已查看项目README等例行检查项。需按实际环境确认具体问题，如无法正常接入私有模型、调用模型无响应等。

## 可能原因
根据相关配置逻辑，可能的原因包括：私有模型未部署为兼容OpenAI API的接口；未配置模型注册中心作为模型对接的中间层；未完成FastGPT的相关接入配置参数。

## 排查步骤
1. 确认私有模型是否已部署为兼容OpenAI API的接口，确保接口符合规范。
2. 确认是否已配置模型注册中心作为模型对接的中间层，完成模型的注册配置。
3. 检查FastGPT的相关配置参数是否匹配模型接口要求，需按实际环境确认具体参数内容。

## 解决与验证
按照以下步骤完成配置：1. 将私有模型部署为兼容OpenAI API的接口。2. 配置模型注册中心作为模型的注册中心，完成模型的注册。3. 在FastGPT中完成对应模型的接入配置。理论上可接入符合要求的任意私有模型。验证方式：调用FastGPT中的该模型，确认可正常生成内容，无报错或异常响应。

> 来源: [FastGPT GitHub issue #520](https://github.com/labring/FastGPT/issues/520)
