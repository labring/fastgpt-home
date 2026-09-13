---
title: FastGPT OpenAPI 创建集合后如何核对向量化进度
slug: /zh/troubleshoot/fastgpt-inactive-issue-closed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4095
source_type: GitHub issue
---

# FastGPT OpenAPI 创建集合后如何核对向量化进度

## 适用场景与历史记录

原议题询问通过 OpenAPI 创建文件集合后如何监听向量化完成。 原始讨论提交于 2025-03-11，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

当前知识库 API 的集合列表包含处理状态信息和 trainingAmount 等字段。

## 排查与复测

1. 保留创建集合返回的 collectionId。
2. 查询集合列表或详情，结合该版本的处理状态、队列数量和错误信息观察进度。
3. 待处理队列结束后检查数据分块数量并执行一次检索；队列归零与导入成功需要同时核对。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：请问使用OpenAPI创建一个文件集合，这么监听是否完成向量化](https://github.com/labring/FastGPT/issues/4095)

> 来源: [FastGPT 知识库 OpenAPI](https://doc.fastgpt.io/en/openapi/dataset)
