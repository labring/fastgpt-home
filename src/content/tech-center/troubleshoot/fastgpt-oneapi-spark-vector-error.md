---
title: 解决FastGPT集成OneAPI后星火模型向量操作报错问题
slug: /zh/troubleshoot/fastgpt-oneapi-spark-vector-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/433
source_type: GitHub issue
---

# 解决FastGPT集成OneAPI后星火模型向量操作报错问题

## 现象
FastGPT V4.5.0私有部署版本集成OneAPI后，星火模型对话功能可正常使用，但知识库录入和检索操作触发报错。完整报错信息包含：
```
error reading stream response: websocket: close 1000 (normal): close this ws conn
```
同时服务触发panic：`runtime error: index out of range [0] with length 0`，报错指向`relay-xunfei.go:234`文件位置。

## 可能原因
结合报错信息与场景，核心原因为处理星火向量模型的流式响应时，代码尝试访问空数组的索引0，触发数组越界panic。同时websocket连接异常关闭，可能与星火向量模型的接口返回格式不符合FastGPT的处理预期有关。

## 排查步骤
1. 核对OneAPI中星火向量模型的配置参数，确认接口地址、认证密钥等信息与官方调用要求一致。
2. 查看FastGPT服务的完整运行日志，定位websocket连接关闭的具体上下文与调用链路。
3. 检查星火向量模型的实际调用返回结果，确认是否存在空数组或不符合预期的响应格式。

## 解决与验证
1. 修复FastGPT中处理星火向量模型响应的代码逻辑，在访问数组索引0前增加空值判断，避免触发数组越界panic。
2. 重新配置OneAPI中的星火向量模型参数，确保匹配官方接口的调用规范。
3. 重启FastGPT服务，测试知识库录入与检索功能，确认不再出现之前的报错信息，对话与向量操作均正常运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/433)
