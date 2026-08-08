---
title: 修复FastGPT v4.14.10+与Voyage嵌入API的兼容报错问题
slug: /zh/troubleshoot/fastgpt-voyage-embedding-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6820
source_type: GitHub issue
---

# 修复FastGPT v4.14.10+与Voyage嵌入API的兼容报错问题

## 现象
使用FastGPT对接Voyage嵌入API时，在v4.14.10及以上版本会出现两类报错：一是未修改参数时，FastGPT强制传入`encoding_format: 'float'`，触发Voyage API的400错误；二是通过额外Body参数覆盖为`{"encoding_format": "base64"}`后，系统会将base64格式的返回结果硬编码当作`number[]`处理，触发`TypeError: a.reduce is not a function`的崩溃错误。

## 可能原因
FastGPT从v4.14.10起，在嵌入请求中强制传入`encoding_format: 'float'`，而Voyage嵌入API仅允许该参数为`null`或`base64`，导致首次请求失败。后续虽通过#6751支持通过额外Body参数覆盖该配置，但响应端未同步更新处理逻辑，仍将返回值硬编码为`number[]`类型，无法解析base64格式的嵌入结果。

## 排查步骤
1. 确认当前使用的FastGPT版本是否为v4.14.10及以上；
2. 检查嵌入请求的配置，若对接Voyage API，查看是否已尝试添加额外Body参数`{"encoding_format": "base64"}`；
3. 若配置后出现`TypeError: a.reduce is not a function`报错，则可确认命中该兼容问题。

## 解决与验证
目前该问题已在main分支通过#6807修复，新增`decodeEmbedding()`函数将base64字符串解码为`number[]`，再执行后续的归一化、截断、向量存储流程。但截至v4.14.15最新正式版，该修复尚未被包含。临时解决方式可等待官方发布包含该修复的新版本，或自行基于#6807的修复代码进行本地编译部署。验证方式：配置嵌入请求为Voyage API并覆盖`encoding_format`为base64，发起请求后无400错误且无类型报错，嵌入结果可正常使用。

> 来源：https://github.com/labring/FastGPT/issues/6820
