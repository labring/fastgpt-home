---
title: FastGPT 知识时效控制：历史过滤需求与现有 API
slug: /zh/troubleshoot/fastgpt-knowledge-filter-api
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/773
source_type: GitHub issue
---

# FastGPT 知识时效控制：历史过滤需求与现有 API

## 适用场景与历史记录

原议题于 2024 年请求给知识添加自定义属性，以便限制检索范围或删除过期内容。 原始讨论提交于 2024-01-23，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

当前文档提供集合更新、禁用和删除 API，商业版还提供集合标签和时间过滤。自定义 metadata 保存与任意字段过滤的能力需要分别核对。

## 排查与复测

1. 先选择需要的动作：禁用过期集合、删除集合或按标签与时间过滤。
2. 对照版本和版本授权配置集合信息，先用两个测试集合验证边界。
3. 执行同一查询核对过期内容的召回情况，并检查更新后的集合状态。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：Add an additional field to the data in the knowledge base to store custom attributes of the data.](https://github.com/labring/FastGPT/issues/773)

> 来源: [FastGPT 知识库 OpenAPI](https://doc.fastgpt.io/en/openapi/dataset)

> 来源: [FastGPT 商业版集合标签与过滤](https://doc.fastgpt.io/en/guide/dataset/collection_tags)
