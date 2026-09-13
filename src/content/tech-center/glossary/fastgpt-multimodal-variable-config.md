---
title: 说明FastGPT中多模态模型调用报错与变量引用配置规则
slug: /zh/glossary/fastgpt-multimodal-variable-config
page_type: 术语速查
source: https://github.com/labring/FastGPT/issues/639
source_type: GitHub issue
---

# 说明FastGPT中多模态模型调用报错与变量引用配置规则

## 一句话定义
本规则说明FastGPT中调用多模态大模型时的请求体格式要求，以及通过变量引用调整模型参数的相关限制。

## 在 FastGPT 里怎么用
调用gpt-4-vision-preview模型时，需确保请求体中`Message.messages.content`字段的格式符合要求，避免出现`bind_request_body_failed json: cannot unmarshal array into Go struct field Message.messages.content of type string (request id: 20231221170013440826620UJmYbqu8)`的报错。无法通过变量引用调整temperature参数与模型选择，相关问题为无法通过变量引用调整temperature和模型选择。

## 容易搞错的地方
容易将多模态模型的`content`字段误用为字符串格式，触发指定的json解组失败报错，该报错的请求id示例为20231221170013440826620UJmYbqu8。误以为可以通过变量引用调整temperature参数与模型选择，实际无法实现该配置方式，该限制在对应issue中被明确记录。

> 来源: [FastGPT GitHub issue #639](https://github.com/labring/FastGPT/issues/639)
> 来源: [FastGPT GitHub issue #2842](https://github.com/labring/FastGPT/issues/2842)
