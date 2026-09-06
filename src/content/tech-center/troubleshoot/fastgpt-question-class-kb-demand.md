---
title: FastGPT 结合知识库进行问题分类的历史需求
slug: /zh/troubleshoot/fastgpt-question-class-kb-demand
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2021
source_type: GitHub issue
---

# FastGPT 结合知识库进行问题分类的历史需求

## 适用场景与历史记录

原议题希望使用知识库中的案例或指导信息辅助区分易混淆问题。 原始讨论提交于 2024-07-11，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原线程缺少实现确认；可将检索结果组织成分类提示词上下文，并用固定样本验证这一组合方案。该方案属于基于现有节点的设计建议。

## 排查与复测

1. 准备少量相近类别与已标注的测试问题。
2. 先检索与问题相关的案例，再将必要内容传入分类节点的提示词或输入。
3. 记录分类结果、引用资料和耗时，比较加入检索前后的准确率。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：问题分类加入知识库搜索选项](https://github.com/labring/FastGPT/issues/2021)

> 来源: [FastGPT 问题分类节点](https://doc.fastgpt.io/en/guide/build/workflow/nodes/question_classify)

> 来源: [FastGPT 知识库 OpenAPI](https://doc.fastgpt.io/en/openapi/dataset)
