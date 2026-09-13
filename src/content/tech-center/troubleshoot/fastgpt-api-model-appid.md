---
title: 解决FastGPT API调用中通过参数指定目标应用的需求
slug: /zh/troubleshoot/fastgpt-api-model-appid
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4482
source_type: GitHub issue
---

# 解决FastGPT API调用中通过参数指定目标应用的需求

## 现象
使用apikey区分应用时，model参数无效，无法通过通用apikey配合model参数（传入appId）调用不同FastGPT应用。

## 可能原因
当前FastGPT的API调用逻辑中，apikey与单个应用绑定，model参数仅用于指定调用的大模型类型，未被设计为指定目标应用的参数，因此传入appId无法生效。

## 排查步骤
1. 确认API调用时model参数的使用场景，检查是否仅将其配置为模型参数，未用于指定目标应用。
2. 核对当前apikey的绑定范围，确认是否仅绑定单个应用。
3. 检查是否存在可调整应用识别逻辑的配置项，需按实际环境确认。

## 解决与验证
该需求可提交至aiproxy相关issue渠道。提交时需说明使用通用apikey时，希望通过model参数传入appId以调用不同应用的具体场景。后续按渠道反馈的方案执行即可完成验证。

> 来源: [FastGPT GitHub issue #4482](https://github.com/labring/FastGPT/issues/4482)
