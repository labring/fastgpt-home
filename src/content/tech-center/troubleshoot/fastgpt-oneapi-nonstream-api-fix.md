---
title: 解决FastGPT对接OneAPI后非流式API调用无返回的问题
slug: /zh/troubleshoot/fastgpt-oneapi-nonstream-api-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5678
source_type: GitHub issue
---

# 解决FastGPT对接OneAPI后非流式API调用无返回的问题

## 现象
用户使用私有部署v4.8.13版本的FastGPT，将OneAPI更新至0.6.10并接入大模型API后，出现以下情况：UI对话可正常响应；API测试时，stream参数设为false时无输出，stream参数设为true时可正常返回结果。OneAPI日志显示报错信息：relay error (channel id 41, user id: 1): parameter.enable_thinking must be set to false for non-streaming calls。

## 可能原因
根据报错信息，问题源于非流式调用时，请求中携带了enable_thinking参数且未将其设为false。OneAPI 0.6.10版本对该参数的校验规则更新，要求非流式调用必须关闭enable_thinking。

## 排查步骤
1.  查看FastGPT调用该渠道的API请求配置，确认是否传入了enable_thinking参数。
2.  检查OneAPI的渠道配置，确认是否存在参数强制覆盖或默认启用enable_thinking的情况。
3.  查看OneAPI的运行日志，定位对应渠道的报错信息，确认报错文本与issue中描述一致。
4.  对比stream为true和false时的请求参数差异，确认enable_thinking参数的状态变化。

## 解决与验证
解决方法分为两种：一是在FastGPT发起的API请求中，为非流式调用显式设置enable_thinking参数为false；二是在OneAPI的渠道配置中，添加参数覆盖规则，将非流式调用的enable_thinking强制设为false。
验证步骤：1.  修改配置后，重新发起stream为false的API测试，确认返回结果正常。2.  查看OneAPI日志，确认不再出现指定报错信息。3.  再次进行UI对话测试，确认功能不受影响。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5678)
