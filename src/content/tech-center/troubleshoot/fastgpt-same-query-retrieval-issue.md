---
title: 排查FastGPT连续相同问题检索结果不稳定问题
slug: /zh/troubleshoot/fastgpt-same-query-retrieval-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2387
source_type: GitHub issue
---

# 排查FastGPT连续相同问题检索结果不稳定问题

## 现象
连续提问一字不差的相同问题时，首次可正常检索出结果，再次提问相同内容则无法检索出结果，该问题偶然出现。预期为每次检索结果保持稳定。

## 可能原因
两次生成的问题向量值存在差异，导致检索结果不一致；或开启问题优化功能后，相同内容的向量生成逻辑发生变化，引发检索结果不稳定。

## 排查步骤
1. 针对连续两次提问的相同问题，分别获取两次生成的向量值，进行比对确认是否完全一致。
2. 确认当前是否开启了问题优化功能，记录功能的开启状态。

## 解决与验证
若两次生成的向量值存在差异，需排查向量生成流程的一致性，确保相同输入生成相同向量。若问题优化功能已开启，可关闭该功能后重新测试。完成配置调整后，连续多次提问相同内容，验证每次检索结果是否稳定一致。

> 来源: [FastGPT GitHub issue #2387](https://github.com/labring/FastGPT/issues/2387)
