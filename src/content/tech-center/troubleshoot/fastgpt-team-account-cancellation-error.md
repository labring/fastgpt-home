---
title: FastGPT team模块accountCancellationPending错误码说明
slug: /zh/troubleshoot/fastgpt-team-account-cancellation-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts
source_type: 官方文档
---

# FastGPT team模块accountCancellationPending错误码说明

## 这个错误是什么
该错误包含FastGPT team模块与user模块的accountCancellationPending错误枚举项，对应状态文本（statusText）均为accountCancellationPending，关联HTTP状态码为403。其中：
- team模块：属于FastGPT team模块的标准化错误，多语言文案键为common:code_error.team_error.account_cancellation_pending，用于标识团队操作相关的账号注销待处理异常。
- user模块：对应错误码为503008，关联的国际化文案键为common:code_error.account_cancellation_pending。

## 什么情况下会触发
触发前提为操作关联的账号处于注销待处理流程中，此时系统会拦截相关操作并返回该错误。具体触发场景：
- team模块：仅在执行团队相关操作时触发。
- user模块：执行需要正常账号权限的操作时触发。

## 怎么定位
1. 提取报错信息中的statusText字段，确认其值为accountCancellationPending。
2. 核查当前操作关联的账号状态，确认是否存在注销待处理的流程。
3. 针对team模块错误：确认归属team模块，匹配多语言文案键common:code_error.team_error.account_cancellation_pending，获取对应官方定义的报错详情。
4. 针对user模块错误：核对返回的错误码数值是否为503008，匹配对应国际化文案键common:code_error.account_cancellation_pending。

## 处理与验证
1. 针对team模块错误：暂停所有涉及该团队的相关操作，优先处理账号注销流程相关事宜；确认账号注销状态完成或取消后，重新执行原团队操作；验证操作是否正常完成，无该错误提示。
2. 针对user模块错误：提示当前操作关联的账号处于注销待处理流程，需等待注销流程完成或取消注销后再尝试操作；待账号状态恢复正常后，重新执行原操作，确认错误不再出现。

> 来源: [FastGPT 官方文档与源码](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/team.ts)
> 来源: [FastGPT 官方文档与源码](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/user.ts)
