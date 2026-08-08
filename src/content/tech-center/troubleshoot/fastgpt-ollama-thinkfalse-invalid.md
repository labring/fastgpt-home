---
title: 解决FastGPT调用ollama时qwen3.5模型think:false参数无效的问题
slug: /zh/troubleshoot/fastgpt-ollama-thinkfalse-invalid
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6670
source_type: GitHub issue
---

# 解决FastGPT调用ollama时qwen3.5模型think:false参数无效的问题

## 现象
使用FastGPT默认调用ollama服务的路径`/v1/chat/completions`时，qwen3.5系列模型的`think:false`参数无法生效，无法关闭思考过程；更换为`/api/chat`路径调用时，该参数可正常生效。

## 可能原因
FastGPT默认使用的ollama调用API路径与qwen3.5系列模型对`think:false`参数的处理逻辑不兼容，导致参数无法被正确识别并执行关闭思考的操作，而`/api/chat`路径适配该模型的参数处理规则。

## 排查步骤
1. 确认FastGPT当前配置的ollama服务调用API路径是否为默认的`/v1/chat/completions`；
2. 临时将调用路径修改为`/api/chat`，发起携带`think:false`参数的测试调用；
3. 需按实际环境确认是否存在其他配置干扰参数传递或路径调用。

## 解决与验证
### 解决方法
修改FastGPT中调用ollama服务的API路径为`/api/chat`，替换默认的`/v1/chat/completions`路径。
### 验证步骤
1. 完成调用路径的修改配置；
2. 发起包含`think:false`参数的qwen3.5系列模型调用；
3. 确认模型未输出思考过程，`think:false`参数生效。

> 来源：https://github.com/labring/FastGPT/issues/6670
