---
title: FastGPT官网对话接口发送图片或附件的问题排查方法
slug: /zh/troubleshoot/fastgpt-chat-api-attachment-send
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2720
source_type: GitHub issue
---

# FastGPT官网对话接口发送图片或附件的问题排查方法

## 现象
用户尝试调用FastGPT官网对话接口发送图片或附件，使用的请求包含chatId、stream、detail、variables、messages字段，variables内配置了uid和name参数，messages数组内仅包含content为"导演是谁"、role为"user"的文本消息，未配置与图片或附件相关的参数，执行请求后未实现预期的多媒体内容发送效果。

## 可能原因
请求体未包含用于标识和传递图片或附件的对应参数，接口无法识别待发送的多媒体内容，导致无法完成图片或附件的发送流程。

## 排查步骤
1. 核对当前提交的API请求体内容，确认已配置的所有字段，包括chatId、stream、detail、variables、messages等。
2. 检查请求体中是否存在与图片或附件传递相关的参数项。
3. 确认请求头的Content-Type为application/json，符合当前请求的格式要求。

## 解决与验证
在API请求体中补充用于传递图片或附件的对应参数，完善请求配置。需按实际环境确认补充的参数格式与取值是否符合接口规范。使用调整后的请求重新调用接口，验证是否可以成功发送图片或附件。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2720)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
