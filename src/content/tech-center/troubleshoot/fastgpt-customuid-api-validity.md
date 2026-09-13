---
title: FastGPT customUid参数在多对话相关接口的有效性说明
slug: /zh/troubleshoot/fastgpt-customuid-api-validity
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4602
source_type: GitHub issue
---

# FastGPT customUid参数在多对话相关接口的有效性说明

## 现象
用户在使用FastGPT的API调用实现不同用户独立对话历史时，注意到customUid参数，仅在发消息接口的示例中被提及，希望确认该参数在获取对话历史、删除所有对话等其他API接口中是否同样有效。此前相关issue未得到解答。

## 可能原因
仅从现有公开文档来看，customUid参数的适用范围未被明确说明，仅在发消息接口的示例中被提及，未覆盖获取对话历史、删除所有对话等其他接口的相关说明，导致无法直接确认其有效性。

## 排查步骤
1.  查阅FastGPT官方公开文档，确认customUid参数的提及位置与适用范围。
2.  搜索过往已提交的相关issue，查看是否有已解答的相关问题。
3.  若需确认参数有效性，可在对应API接口中携带customUid参数进行测试，需按实际环境确认测试结果。

## 解决与验证
目前公开的官方自动回复未明确说明customUid参数在获取对话历史、删除所有对话等接口的有效性。若该问题仍需解决，可重新打开对应issue并补充相关信息，以便进一步排查。

> 来源: [FastGPT GitHub issue #4602](https://github.com/labring/FastGPT/issues/4602)
