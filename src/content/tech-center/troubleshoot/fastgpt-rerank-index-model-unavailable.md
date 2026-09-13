---
title: FastGPT 4.8.22–4.8.23-fix 接入 Xinference 索引与重排排查
slug: /zh/troubleshoot/fastgpt-rerank-index-model-unavailable
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3933
source_type: GitHub issue
---

# FastGPT 4.8.22–4.8.23-fix 接入 Xinference 索引与重排排查

## 适用场景与历史记录

原报告涉及 4.8.22、4.8.23、4.8.23-fix：Xinference 聊天模型可调用，索引和重排模型配置失败。 原始讨论提交于 2025-02-28，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

聊天、embedding 和 rerank 的请求路径与返回结构各有契约，聊天测试成功只能证明对应路径。官方接入文档可作为参数核对依据。

## 排查与复测

1. 分别记录三个模型的服务地址、模型 ID、模型类型和实际请求路径。
2. 对 embedding 检查向量维度与数据结构，对 rerank 检查排序分数和文档索引。
3. 保存最小请求和错误体，与 FastGPT 渠道配置及 Xinference 服务日志对照。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：不能对接XINFERENCE的索引模型和重排模型](https://github.com/labring/FastGPT/issues/3933)

> 来源: [FastGPT 的 Xinference 接入](https://doc.fastgpt.io/en/self-host/custom-models/xinference)

> 来源: [FastGPT 模型配置](https://doc.fastgpt.io/en/self-host/config/model/intro)
