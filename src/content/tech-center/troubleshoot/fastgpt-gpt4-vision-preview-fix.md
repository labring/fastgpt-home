---
title: 解决FastGPT调用gpt-4-vision-preview模型的请求体绑定失败问题
slug: /zh/troubleshoot/fastgpt-gpt4-vision-preview-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/639
source_type: GitHub issue
---

# 解决FastGPT调用gpt-4-vision-preview模型的请求体绑定失败问题

## 现象
在使用FastGPT调用`gpt-4-vision-preview`模型时，触发请求绑定失败报错，完整报错信息为：`bind_request_body_failed json: cannot unmarshal array into Go struct field Message.messages.content of type string`，附带请求ID示例`20231221170013440826620UJmYbqu8`。

## 可能原因
该报错的核心原因为所依赖的One-Api版本过低，未适配`gpt-4-vision-preview`模型的接口格式要求。

## 排查步骤
1. 复现报错场景，确认触发操作与调用`gpt-4-vision-preview`模型直接相关
2. 查看系统报错日志，提取完整的报错文本与对应的请求ID，用于精准定位问题
3. 确认当前部署的One-Api服务版本，确认是否为最新可用版本

## 解决与验证
1. 升级One-Api至支持`gpt-4-vision-preview`的版本
2. 重新执行调用`gpt-4-vision-preview`模型的操作，确认报错不再触发
3. 核对模型返回的结果，确认符合业务预期

> 来源: [FastGPT GitHub issue #639](https://github.com/labring/FastGPT/issues/639)
