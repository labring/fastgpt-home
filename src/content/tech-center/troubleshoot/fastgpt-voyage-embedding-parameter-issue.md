---
title: 解决FastGPT升级后voyage系列向量模型向量化失败问题
slug: /zh/troubleshoot/fastgpt-voyage-embedding-parameter-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6744
source_type: GitHub issue
---

# 解决FastGPT升级后voyage系列向量模型向量化失败问题

## 现象
FastGPT从v4.14.9升级到v4.14.10.1私有部署版本后，使用voyage系列向量模型作为自定义embedding服务时，请求会携带`encoding_format=float`参数。由于voyage系列向量模型不接受该参数（实测仅接受`base64`格式），会导致知识库向量化直接返回400错误。该问题不仅影响新建/重建知识库的向量化流程，还会连带影响后续知识库操作，包括集合结构异常、文件分块失败、数据更新/修改流程失效等。切换到`BAAI/bge-m3`等兼容模型后可恢复正常。

## 可能原因
该问题属于FastGPT v4.14.10.1版本的兼容性变更或回归：该版本在embedding请求中新增了默认发送`encoding_format=float`的参数，与voyage系列向量模型的接口要求不匹配，导致请求被模型服务拒绝。

## 排查步骤
1. 确认FastGPT部署版本为v4.14.10.1私有部署版本，且升级前版本为v4.14.9。
2. 检查当前配置的自定义embedding服务是否为voyage系列向量模型。
3. 查看FastGPT的embedding请求日志，确认请求中携带了`encoding_format=float`参数。
4. 查看向量模型服务的返回日志，确认返回状态码为400。
5. 临时切换到其他兼容的embedding模型（如`BAAI/bge-m3`），验证知识库向量化流程是否恢复正常。

## 解决与验证
### 临时规避方案
暂时切换到兼容的embedding模型（如`BAAI/bge-m3`），可快速恢复知识库的正常操作。
### 长期修复方向
根据需求可选择以下方式：1. 等待官方修复voyage系列向量模型的兼容性问题；2. 若FastGPT支持自定义embedding参数配置，可调整或关闭`encoding_format`参数；3. 针对自定义embedding服务单独适配参数格式。
### 验证步骤
1. 调整embedding请求参数（若支持配置），移除`encoding_format=float`参数。
2. 重新执行知识库向量化、重建或数据更新操作。
3. 检查请求日志确认不再携带`encoding_format=float`参数，且向量模型服务返回正常，知识库操作无异常。

> 来源：[FastGPT GitHub Issue #6744](https://github.com/labring/FastGPT/issues/6744)
