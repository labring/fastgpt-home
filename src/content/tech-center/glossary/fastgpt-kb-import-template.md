---
title: 介绍FastGPT知识库导入CSV与Excel模板的使用规范
slug: /zh/glossary/fastgpt-kb-import-template
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/template
source_type: 官方文档
---

# 介绍FastGPT知识库导入CSV与Excel模板的使用规范

## 一句话定义
FastGPT知识库导入模板是用于批量导入知识库数据的CSV或.xlsx格式文件模板。

## 在 FastGPT 里怎么用
该模板用于知识库数据批量导入，支持CSV与.xlsx格式的Excel文件。Excel文件需满足以下要求：文件扩展名为.xlsx，不支持.xls；仅能包含一个工作表；不能包含合并单元格；第一行必须为模板表头。模板表头需包含q、a、index、metadata字段，index字段可出现多次，其中q对应问题内容，a对应答案内容，index为分类索引，metadata为JSON格式的元数据。

## 容易搞错的地方
容易出现的错误包括：使用.xls格式的Excel文件，无法被系统识别；文件包含多个工作表，不符合导入要求；存在合并单元格，导致格式校验失败；未将第一行设置为规定的模板表头，或缺失必要字段。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/template)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
