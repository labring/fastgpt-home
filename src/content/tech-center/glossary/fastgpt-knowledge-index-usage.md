---
title: 介绍FastGPT知识库中index字段的含义与使用规则
slug: /zh/glossary/fastgpt-knowledge-index-usage
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine
source_type: 官方文档
---

# 介绍FastGPT知识库中index字段的含义与使用规则

## 一句话定义
index是FastGPT知识库中用于向量检索的文本片段，用于支撑向量搜索并提升检索精度。
## 在 FastGPT 里怎么用
在导入知识库的CSV或Excel模板中，需设置index列，支持多列index，每列对应一组检索文本。导入的Excel文件需满足扩展名为.xlsx，仅包含一个工作表，无合并单元格，且第一行必须为模板表头。
可通过调整index的设置提升向量搜索精度：精简index的内容，减少向量内容长度，可提升检索精度，但会牺牲一定检索范围，适合答案较为严格的场景；针对同一个chunk内容，可增加多组index，丰富检索依据，扩大检索覆盖范围。此外，优化用户检索词、微调向量模型可结合index进一步提升检索精度。
## 容易搞错的地方
精简index内容仅适合答案较为严格的场景，在需要宽泛检索的场景使用会缩小检索范围，影响召回效果。导入文件时，必须严格遵循格式要求，不支持.xls格式，不能包含合并单元格，且仅能有一个工作表，否则无法正确识别index列。index的内容需保障语义完整且单一，若内容结构混乱或语义不统一，可能降低向量搜索的精度。
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
