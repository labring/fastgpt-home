---
title: 解决FastGPT私有部署后多轮对话图片上传报错问题
slug: /zh/troubleshoot/fastgpt-multi-turn-image-upload-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6256
source_type: GitHub issue
---

# 解决FastGPT私有部署后多轮对话图片上传报错问题

## 现象
FastGPT私有部署版本v4.14.4存在如下问题：首次对话上传图片可正常得到回复，但后续对话无论是否上传图片，系统均无法正常回复并触发报错。通过查看fastgpt-aiproxy日志，可发现如下错误信息：`handle failed: status code: 400, error: {{<nil> Invalid chat format. Unexpected keys in a message content image dict. invalid_request_error }}`，对应POST `/v1/chat/completions`接口返回400错误。

## 可能原因
该报错源于OpenAI兼容格式的聊天请求不符合接口校验规则：消息内容中的图片字典包含了未被允许的额外键，导致接口校验失败。结合多轮对话才出现异常的现象，推测可能是会话上下文处理逻辑在多轮传递中保留了错误的图片格式参数。

## 排查步骤
1.  登录服务器查看fastgpt-aiproxy的运行日志，确认是否存在`Invalid chat format. Unexpected keys in a message content image dict`相关的400报错。
2.  对比首次对话与后续对话的请求参数，检查图片消息的格式是否存在差异，确认是否存在额外未定义的键。
3.  检查FastGPT的会话存储逻辑，确认多轮对话中是否出现图片格式参数残留或错误拼接的情况。
4.  需按实际环境确认调用的模型接口对聊天消息格式的具体校验规则。

## 解决与验证
针对该问题的核心修复方向为修正聊天消息中图片内容的字典格式，移除所有未被接口允许的额外键。验证步骤如下：
1.  调整FastGPT中图片消息的生成逻辑，确保仅保留接口要求的必要键值。
2.  重新发起多轮对话，上传图片后检查是否能正常获取回复。
3.  再次查看fastgpt-aiproxy日志，确认不再出现该400报错。若首次对话正常、后续对话仍报错，则需进一步排查会话上下文的格式传递逻辑。

> 来源：https://github.com/labring/FastGPT/issues/6256
