---
title: FastGPT多模态API传入base64图片报错的排查与解决方法
slug: /zh/troubleshoot/fastgpt-multimodal-api-base64-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1217
source_type: GitHub issue
---

# FastGPT多模态API传入base64图片报错的排查与解决方法

## 现象
使用FastGPT的多模态模型应用开放API访问时，传入base64格式图片发起请求，会返回如下报错：
```json
{
  "code": 500,
  "statusText": "",
  "message": "Invalid image URL. The URL must be a valid HTTP or HTTPS URL, or a data URL with base64 encoding. (request id: 202404160948162678857969870251)",
  "data": null
}
```

## 可能原因
根据报错信息，问题源于FastGPT识别传入的图片数据为无效URL。可能的原因包括：传入的base64图片未按照标准data URL格式拼接，或API请求的图片数据传递格式不符合FastGPT多模态API的要求。

## 排查步骤
1. 检查传入的base64图片字符串是否符合data URL格式，即是否以`data:image/[格式];base64,`开头，后跟实际的base64编码内容。
2. 确认API请求中图片数据的传递格式符合FastGPT多模态API的规范。
3. 确认所使用的应用配置的模型为多模态模型，支持图片输入。
4. 核对整体请求的格式是否符合FastGPT API的要求，避免出现格式错误。

## 解决与验证
将base64编码的图片内容拼接为标准data URL格式，例如`data:image/png;base64,{your_base64_content}`，将拼接后的完整data URL传入FastGPT多模态API的请求中。发起请求后，若返回正常的`result`内容，则问题解决。若仍出现报错，需按实际环境进一步核对请求参数与应用配置。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1217)
