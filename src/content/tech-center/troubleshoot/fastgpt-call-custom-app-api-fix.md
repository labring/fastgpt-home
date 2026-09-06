---
title: 解决FastGPT对话接口调用自定义应用失败的问题
slug: /zh/troubleshoot/fastgpt-call-custom-app-api-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2006
source_type: GitHub issue
---

# 解决FastGPT对话接口调用自定义应用失败的问题

## 现象
业务系统调用在FastGPT中开发的、已接入知识库并完成工作流编排的应用时，无法正常获取对话响应结果。

## 可能原因
对话接口的请求体未包含用于指定目标应用的标识参数，导致接口无法定位到对应的自定义应用。

## 排查步骤
1. 查看对话接口的请求body参数，确认是否包含appId字段。
2. 提取目标FastGPT应用的appId值，确保与实际应用的标识一致。
3. 检查其他接口必填参数是否符合文档要求，需按实际环境确认。

## 解决与验证
在对话接口的请求body中添加appId参数，参数值为目标应用的唯一标识，示例格式为`appId: "668cc90c59b636d88c3e2fd3"`。完成参数添加后重新发起接口请求，验证是否可正常调用目标应用并获取预期的对话响应。该参数的配置可能未在官方文档中明确说明。

> 来源: [FastGPT GitHub issue #2006](https://github.com/labring/FastGPT/issues/2006)
