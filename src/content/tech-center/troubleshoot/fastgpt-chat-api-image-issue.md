---
title: 解决FastGPT调用聊天接口无法正确处理图片输入的问题
slug: /zh/troubleshoot/fastgpt-chat-api-image-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2354
source_type: GitHub issue
---

# 解决FastGPT调用聊天接口无法正确处理图片输入的问题

## 现象
调用FastGPT的`/api/v1/chat/completions`接口时，按照多模态聊天格式传入图片URL，接口未正确识别图片内容。返回的回复为"你可以把图片的内容描述给我，我就能帮你分析或者回答相关问题！如果需要具体的意见，也可以告诉我你关注的重点哦。"，且接口返回的`usage`字段中`prompt_tokens`仅为1，未正确统计图片相关的token消耗。

## 可能原因
当前线程未明确说明调用失败的具体根因，需结合实际部署环境与配置项排查。

## 排查步骤
1.  确认请求路径为`/api/v1/chat/completions`，检查请求头是否包含`Content-Type: application/json`与`Authorization: Bearer {fastgpt-token}`。
2.  校验请求体格式，确保`messages`数组内的`content`为数组类型，包含`type`为`text`和`type`为`image_url`的对象，且`image_url`字段正确填写图片URL。
3.  确认请求中指定的`model`参数是否支持视觉能力，需按实际环境确认。
4.  查看接口返回的`usage`与`choices`字段，判断是否未正确识别图片输入。

## 解决与验证
按照多模态聊天接口的标准格式构造请求，确保参数符合规范。验证步骤：
1.  构造包含`text`与`image_url`类型内容的请求体，正确填写图片URL。
2.  发起调用后，检查接口返回的回复是否正确分析图片内容，且`usage`字段的token统计符合实际输入的消耗。
3.  需按实际环境确认模型与配置是否支持图片处理能力。

> 来源: [FastGPT GitHub issue #2354](https://github.com/labring/FastGPT/issues/2354)
