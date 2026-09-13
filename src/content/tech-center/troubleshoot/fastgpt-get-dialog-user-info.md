---
title: FastGPT 对话人身份传入：历史需求与鉴权边界
slug: /zh/troubleshoot/fastgpt-get-dialog-user-info
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5252
source_type: GitHub issue
---

# FastGPT 对话人身份传入：历史需求与鉴权边界

## 适用场景与历史记录

原议题希望 Agent 知道当前对话人的账号或姓名，用于查询值班表等个人化数据。 原始讨论提交于 2025-07-18，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

当前对话 API 提供 variables 传值能力。变量传入和可信身份认证需分别处理；页面应说明由业务系统验证身份后提供必要字段。

## 排查与复测

1. 在业务服务端完成登录态核验，并确定最少需要传给工作流的身份字段。
2. 通过受控请求传入应用变量，在测试日志中核对变量被正确接收。
3. 使用两个测试账号检查查询权限隔离，服务端对每次数据访问执行授权校验。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：获取当前对话人的账号id](https://github.com/labring/FastGPT/issues/5252)

> 来源: [FastGPT 对话 OpenAPI](https://doc.fastgpt.io/en/openapi/chat)
