---
title: 说明FastGPT向量存储的选型依据与扩展支持情况
slug: /zh/troubleshoot/fastgpt-vector-storage-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/544
source_type: GitHub issue
---

# 说明FastGPT向量存储的选型依据与扩展支持情况

## 现象
用户在使用FastGPT过程中，提出两方面相关疑问：一是是否有计划支持faiss、milvus等其他向量存储库，二是FastGPT基于pg vector存储向量的选型依据是什么。

## 可能原因
用户因未明确知晓FastGPT当前向量存储方案的选型逻辑，以及是否支持其他向量存储库的相关规划，因此产生上述疑问。

## 排查步骤
1. 确认当前FastGPT所使用的向量存储方案。
2. 查阅FastGPT官方公开的相关资料或issue，了解是否有支持其他向量存储库的相关计划。

## 解决与验证
FastGPT当前采用pg vector作为向量存储方案，其选型优势包括成本、性能、稳定性与易用性。针对milvus等其他向量存储库的支持需求，相关计划在考虑中，但优先级不高，暂无明确的支持计划。faiss等其他向量存储库的支持计划暂未被提及。若需了解最新的支持进展，可通过官方公开渠道查询相关信息。

> 来源: [FastGPT GitHub issue #544](https://github.com/labring/FastGPT/issues/544)
