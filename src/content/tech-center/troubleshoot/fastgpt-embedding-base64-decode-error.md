---
title: 修复FastGPT embedding任务base64响应解码异常问题
slug: /zh/troubleshoot/fastgpt-embedding-base64-decode-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6769
source_type: GitHub issue
---

# 修复FastGPT embedding任务base64响应解码异常问题

## 现象
在FastGPT的Embedding模型配置的“额外Body参数”中设置`{"encoding_format": "base64"}`后，执行向量化操作（如重建知识库、上传文档），请求侧可成功向服务端发送请求，但FastGPT后端在处理embedding响应阶段会抛出`TypeError: a.reduce is not a function`的运行时错误，导致任务崩溃。

## 可能原因
查看`packages/service/core/ai/embedding/index.ts`源码可知，当前FastGPT的embedding响应处理逻辑硬编码将返回结果视为`number[]`浮点数数组，会执行`reduce`方法进行归一化等操作。当用户配置`encoding_format: "base64"`时，向量模型返回的`embedding`字段为Base64字符串而非浮点数数组，此时执行`reduce`方法会触发`TypeError: a.reduce is not a function`异常。

## 排查步骤
1. 检查Embedding模型配置的“额外Body参数”是否设置为`{"encoding_format": "base64"}`；
2. 执行向量化操作（如重建知识库、上传文档），查看FastGPT后端日志是否出现`TypeError: a.reduce is not a function`报错；
3. 确认向量模型返回的embedding数据格式是否为Base64字符串（需按实际环境确认）。

## 解决与验证
目前该问题的修复需分两步：
1.  请求侧已通过PR #6751实现支持覆盖`encoding_format`参数；
2.  响应侧需增加数据格式嗅探逻辑：当检测到返回的`embedding`为Base64编码时，先将其解码为`number[]`浮点数向量，再进入后续的`normalization`、`truncate`、`vector store`逻辑。
验证方式：重新配置Embedding模型的“额外Body参数”为`{"encoding_format": "base64"}`，执行向量化操作，确认后端无`TypeError`报错，向量生成与存储流程正常。

> 来源：[FastGPT GitHub Issue #6769](https://github.com/labring/FastGPT/issues/6769)
