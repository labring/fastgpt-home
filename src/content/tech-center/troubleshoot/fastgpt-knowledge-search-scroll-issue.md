---
title: FastGPT 指定回复内容过长时的自动滚动历史反馈
slug: /zh/troubleshoot/fastgpt-knowledge-search-scroll-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1691
source_type: GitHub issue
---

# FastGPT 指定回复内容过长时的自动滚动历史反馈

## 适用场景与历史记录

原报告把知识库搜索结果经 JS 处理后直接输出到指定回复，连续查询时需要手动滚动。 原始讨论提交于 2024-06-04，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

维护者确认一次内容过长、超出可滚动区域时会出现该表现。

## 排查与复测

1. 以短文本和长文本分别复现指定回复，记录容器高度与滚动位置。
2. 检查用户是否已经离开底部阅读区域，以及新内容追加后的视图状态。
3. 将回复按业务段落精简或分段后做对照测试，保存稳定复现的长度和操作步骤。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：一个小问题,指定回复模块内容太长不会自动滚动到内容底部,导致每次都需要用鼠标中键去滚动一下.](https://github.com/labring/FastGPT/issues/1691)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/1691#issuecomment-2168452481)
