---
title: FastGPT 批量删除知识集合：collectionIds 接口与验证
slug: /zh/troubleshoot/fastgpt-batch-delete-collection-api
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3732
source_type: GitHub issue
---

# FastGPT 批量删除知识集合：collectionIds 接口与验证

## 适用场景与历史记录

2025 年的原议题请求按多个集合 ID 删除知识，服务于产品下架和知识同步。 原始讨论提交于 2025-02-09，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

当前知识库 OpenAPI 已列出 POST /api/core/dataset/collection/delete，请求体使用 collectionIds 数组。

## 排查与复测

1. 先在测试知识库创建两个可丢弃集合，并记录 collectionId。
2. 按公开接口以 collectionIds 数组提交这两个测试 ID，使用具有相应权限的 API Key。
3. 重新查询集合列表和搜索结果，核对目标集合已删除且其他集合保留。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：功能请求：希望FastGPT能够提供批量根据集合ID删除知识的API接口](https://github.com/labring/FastGPT/issues/3732)

> 来源: [FastGPT 知识库 OpenAPI](https://doc.fastgpt.io/en/openapi/dataset)
