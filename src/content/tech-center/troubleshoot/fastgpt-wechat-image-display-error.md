---
title: 解决FastGPT对接微信端后知识库图片显示异常问题
slug: /zh/troubleshoot/fastgpt-wechat-image-display-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2826
source_type: GitHub issue
---

# 解决FastGPT对接微信端后知识库图片显示异常问题

## 现象
FastGPT 4.8.11私有部署版本中，知识库检索出的图片在FastGPT平台内可正常展示。对接微信端后，微信端会直接显示`!{图片}(https://xxxxxxx)`格式的原始文本，无法正常渲染图片。

## 可能原因
需结合实际对接逻辑排查，常见触发场景为对接环节未对图片展示格式做适配转换，导致FastGPT返回的原始文本被直接传递至微信端。

## 排查步骤
1.  确认FastGPT平台内知识库检索结果的图片展示是否符合预期。
2.  检查对接微信端的代码逻辑，确认是否对返回的文本进行了格式转换处理。
3.  核对对接环节的配置，确认是否存在适配图片展示的相关设置，需按实际环境确认。
4.  查看对接日志，确认FastGPT返回的原始文本格式是否符合预期。

## 解决与验证
可在对接代码中添加适配逻辑，将FastGPT返回的图片相关文本转换为微信端支持的展示格式。完成配置后，重新发起知识库检索并通过微信端查看，确认图片可正常预览，且不再显示原始格式的文本。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2826)
