---
title: Dify 调用 FastGPT 知识库：历史需求与检索接口核对
slug: /zh/troubleshoot/fastgpt-external-interface-issue-closed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4361
source_type: GitHub issue
---

# Dify 调用 FastGPT 知识库：历史需求与检索接口核对

## 适用场景与历史记录

原议题要求提供接口，供 Dify 调用 FastGPT 知识库。 原始讨论提交于 2025-03-27，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

评论提出过经 OneAPI 调用应用的思路，但这覆盖的是应用调用。知识库检索对接仍需核对两端检索协议、字段和鉴权。

## 排查与复测

1. 列出 Dify 对外部检索接口的请求及响应要求。
2. 用 FastGPT 知识库搜索测试接口验证一个查询，保留得分、正文和来源字段。
3. 在适配层完成字段与鉴权映射，并用同一查询核对两端结果。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：希望增加知识库对接dify的接口](https://github.com/labring/FastGPT/issues/4361)

> 来源: [FastGPT 知识库 OpenAPI](https://doc.fastgpt.io/en/openapi/dataset)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/4361#issuecomment-2764550669)
