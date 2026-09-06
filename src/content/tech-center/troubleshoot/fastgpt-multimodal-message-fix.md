---
title: 解决FastGPT多模态API图文关联丢失与assistant消息过滤问题
slug: /zh/troubleshoot/fastgpt-multimodal-message-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1251
source_type: GitHub issue
---

# 解决FastGPT多模态API图文关联丢失与assistant消息过滤问题

## 现象
用户调用FastGPT多模态API时，若通过`content`有序数组格式传输图文混合消息，FastGPT内部会自动将所有图片资源前置，并将数组内所有文本内容合并为单一段落，导致图文关联丢失。同时，消息体中的`assistant`角色消息会被自动过滤。
例如原请求的messages结构为：
```json
[
  {
    "role": "user",
    "content": [
      { "text": "小明: 你最近怎么样，去哪玩了 \n", "type": "text" },
      { "text": "小红：我去三亚玩了一周 \n", "type": "text" },
      { "text": "小红发了一张图片\n", "type": "text" },
      {
        "type": "image_url",
        "image_url": { "url": "data:image/webp;base64,xxxxx" }
      },
      { "text": "小明：真漂亮，我也去大理玩了几天 \n", "type": "text" },
      { "text": "小明发了一张图片\n", "type": "text" },
      {
        "type": "image_url",
        "image_url": { "url": "data:image/webp;base64,xxxxx" }
      },
      { "text": "总结一下小红发的图片内容", "type":"text"}
    ]
  }
]
```
FastGPT处理后会变为：
```json
[
  {
    "role": "user",
    "content": [
      { "type": "image_url", "image_url": { "url": "data:image/webp;base64,image1111" } },
      { "type": "image_url", "image_url": { "url": "data:image/webp;base64,image222" } },
      { "text": "小明: 你最近怎么样，去哪玩了 \n小红：我去三亚玩了一周 \n小红发了一张图片\n小明：真漂亮，我也大理玩了几天 \n小明发了一张图片\n总结一下小红发的图片内容", "type": "text" }
    ]
  }
]
```

## 可能原因
当前FastGPT内部对多模态API消息的处理逻辑，将数组内的图片资源统一前置重组，合并所有文本内容；同时按照系统设计过滤了`assistant`角色的消息内容。

## 排查步骤
1.  检查API请求的`messages`参数结构，确认是否使用`content`为有序数组的图文混合格式
2.  查看请求中是否包含`assistant`角色的消息内容
3.  对比原请求与FastGPT处理后的消息格式，观察图片顺序、文本完整性与`assistant`消息是否存在
4.  确认当前场景为工作流中首次直接调用大模型的场景

## 解决与验证
在工作流中首次直接调用大模型的场景下，保留原始的`messages`消息体结构，不进行图片前置合并与文本合并操作，同时保留`assistant`角色的消息内容。验证步骤如下：
1.  发送包含图文交替数组的user消息，确认处理后图片与文本的顺序与原请求一致，文本未被合并为单一段落
2.  发送包含`assistant`角色的消息，确认该消息未被过滤，可正常传入大模型
3.  发起对话请求，确认大模型可根据图文的原始顺序关联内容生成回复

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1251)
