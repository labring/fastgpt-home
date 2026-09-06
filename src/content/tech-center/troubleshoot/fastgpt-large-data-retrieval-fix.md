---
title: 解决FastGPT大规模数据场景下检索结果不准确问题
slug: /zh/troubleshoot/fastgpt-large-data-retrieval-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1411
source_type: GitHub issue
---

# 解决FastGPT大规模数据场景下检索结果不准确问题

## 现象
当数据量达到1万行时，混合检索无法检索到目标内容，导致回答不准确。少量数据场景下，回答结果准确，符合业务预期。

## 可能原因
向量检索对非语义内容效果不佳，无法精准匹配结构化的编号或无明确语义关联的文本；全文检索对编号类内容效果不足，难以定位特定目标数据，无法适配大规模结构化或非语义数据的检索需求，进而导致回答不准确。

## 排查步骤
1. 确认业务数据的规模与内容特征，如是否包含大量非语义文本、编号类内容。
2. 核对当前配置的检索方式类型，确认是否为混合检索模式。
3. 测试少量数据与大量数据场景下的检索结果差异，对比准确性变化，明确问题触发条件。

## 解决与验证
通过自定义流程实现Excel数据导入转换，将Excel数据转为结构化数据后，使用T2SQL查询方式替代混合检索。验证时，导入结构化数据并执行T2SQL查询，确认检索结果准确性，对比原混合检索的效果，验证问题是否得到解决。

> 来源: [FastGPT GitHub issue #1411](https://github.com/labring/FastGPT/issues/1411)
