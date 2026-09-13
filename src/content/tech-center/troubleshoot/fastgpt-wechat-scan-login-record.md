---
title: 企业微信扫码访问 FastGPT 分享页与身份传入的历史需求
slug: /zh/troubleshoot/fastgpt-wechat-scan-login-record
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1619
source_type: GitHub issue
---

# 企业微信扫码访问 FastGPT 分享页与身份传入的历史需求

## 适用场景与历史记录

原议题希望通过企业微信扫码打开免登录分享页，并记录访问用户信息。 原始讨论提交于 2024-05-28，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

扫描分享链接、企业身份认证和工作流变量传入是独立环节。原线程缺少完整官方接入方案，身份应由授权业务系统验证后传入。

## 排查与复测

1. 确定二维码承载的目标地址及企业微信授权回调流程。
2. 在业务服务端验证用户身份，再通过受控会话接口传入所需变量。
3. 用不同账号验证身份映射、权限范围和日志归属，并只记录业务所需字段。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：企业微信扫码访问免登录发布链接](https://github.com/labring/FastGPT/issues/1619)

> 来源: [FastGPT 对话 OpenAPI](https://doc.fastgpt.io/en/openapi/chat)
