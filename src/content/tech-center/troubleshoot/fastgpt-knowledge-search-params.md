---
title: FastGPT 知识库搜索参数由用户输入的历史需求
slug: /zh/troubleshoot/fastgpt-knowledge-search-params
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5085
source_type: GitHub issue
---

# FastGPT 知识库搜索参数由用户输入的历史需求

## 适用场景与历史记录

原议题希望把最低相似度和检索方式等搜索参数暴露给聊天用户。 原始讨论提交于 2025-06-24，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原线程记录的是输入方式需求。检索 API 的参数能力和工作流编辑器的变量绑定入口应分别验证。

## 排查与复测

1. 列出拟开放的参数、允许值和业务上可接受的范围。
2. 在部署版本的节点配置中检查变量引用；通过 API 集成时按契约传入已校验参数。
3. 用两组参数执行固定查询，核对召回数量、相似度和最终答案变化。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：暴露知识库搜索参数配置给用户](https://github.com/labring/FastGPT/issues/5085)

> 来源: [FastGPT 知识库 OpenAPI](https://doc.fastgpt.io/en/openapi/dataset)
