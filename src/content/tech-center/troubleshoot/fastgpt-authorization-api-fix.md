---
title: 解决FastGPT调用Authorization鉴权的API失败问题
slug: /zh/troubleshoot/fastgpt-authorization-api-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/180
source_type: GitHub issue
---

# 解决FastGPT调用Authorization鉴权的API失败问题

## 现象
使用FastGPT调用需Authorization鉴权的第三方API时，无法成功发起请求，无法提取对应内容。尝试配置自定义Authorization请求头后，调用仍未生效，无法通过第三方API的鉴权校验。

## 可能原因
当前FastGPT的API调用逻辑未支持自定义Authorization请求头的传递，无法将鉴权参数携带至第三方API，导致鉴权校验失败。部分场景下，若直接调用第三方鉴权API，现有配置未适配该类鉴权要求，需按实际环境确认是否存在其他配置限制。

## 排查步骤
1. 确认目标第三方API是否要求携带Authorization请求头进行鉴权。
2. 检查FastGPT的API调用配置项，确认是否已添加Authorization请求头参数。
3. 测试调用流程，确认请求是否能正常携带该请求头参数发起调用。

## 解决与验证
可通过两种方式解决该问题。第一种是通过自建中间API转发请求，将鉴权参数在自建API中处理，再调用目标第三方API，FastGPT仅需调用自建的简化接口。第二种是若目标接口为自建，可选择移除鉴权逻辑后直接调用。验证时，发起调用确认可成功获取对应内容，或确认接口调用无鉴权校验问题。

> 来源: [FastGPT GitHub issue #180](https://github.com/labring/FastGPT/issues/180)
