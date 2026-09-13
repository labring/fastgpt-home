---
title: 解决FastGPT测试模型配置时出现连接错误的问题
slug: /zh/troubleshoot/fastgpt-model-connection-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4180
source_type: GitHub issue
---

# 解决FastGPT测试模型配置时出现连接错误的问题

## 现象
用户在私有部署的FastGPT v4.9.0-fix2版本中，通过OneAPI配置好模型后，在FastGPT模型配置页面新建语言模型，选择“其他”作为模型提供商，填写模型ID为`gpt-4o-2024-05-13`，留空URL与访问密钥，点击测试时触发连接错误。系统日志显示报错信息为`[Error] 2025-03-15 21:36:37 Api response error: /api/core/ai/model/test?model=gpt-4o-2024-05-13, Connection error.`，堆栈信息包含相关API调用的错误链路。

## 可能原因
结合报错信息与配置场景，可能的触发因素包括：1. 模型配置时未正确填写请求URL与访问密钥；2. 容器环境内的网络链路无法正常访问目标模型接口；3. 模型ID与实际可用的第三方模型不匹配。

## 排查步骤
1.  查看FastGPT系统日志，确认报错文本包含`Connection error.`且请求路径为`/api/core/ai/model/test?model=gpt-4o-2024-05-13`。
2.  检查当前模型的配置项，确认模型提供商选择为“其他”，模型ID与OneAPI中配置的模型名称一致。
3.  进入FastGPT容器内部，执行网络连通性测试，确认可以正常访问配置的模型接口地址。
4.  验证第三方模型接口的可用性，确认访问密钥与模型ID的有效性。

## 解决与验证
根据排查结果进行对应修复：若为配置项遗漏，补全模型请求的URL与访问密钥；若为网络异常，调整容器网络配置以确保链路通畅；若为模型参数错误，修正模型ID与密钥的配置。修复完成后，重新进入模型配置页面点击测试按钮，确认不再出现连接错误的提示，接口返回正常结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4180)
