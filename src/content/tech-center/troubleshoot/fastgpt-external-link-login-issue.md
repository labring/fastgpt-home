---
title: FastGPT 分享聊天开启下一步指引后跳转登录的历史排查
slug: /zh/troubleshoot/fastgpt-external-link-login-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/381
source_type: GitHub issue
---

# FastGPT 分享聊天开启下一步指引后跳转登录的历史排查

## 适用场景与历史记录

2023 年的私有部署报告描述：开启下一步指引、生成外链，在独立浏览器打开后跳到登录界面。 原始讨论提交于 2023-10-08，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原线程缺少具体修复确认。应保留完整触发链，检查分享访问和问题指引请求各自的鉴权结果。

## 排查与复测

1. 用独立浏览器按原步骤复现，并记录最终跳转地址。
2. 查看触发指引时的请求状态与返回内容，区分聊天初始化和后续指引请求。
3. 核对分享链接权限及应用发布版本，复测开启、关闭指引两种配置。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：Generate "next step guidance" and it will pop up to the login interface in the external link chat](https://github.com/labring/FastGPT/issues/381)

> 来源: [FastGPT 对话 OpenAPI](https://doc.fastgpt.io/en/openapi/chat)
