---
title: 介绍FastGPT知识库导入的Excel模板使用规范与数据结构
slug: /zh/tutorial/fastgpt-excel-template-guide
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/template
source_type: 官方文档
---

# 介绍FastGPT知识库导入的Excel模板使用规范与数据结构

FastGPT知识库导入的Excel模板与CSV模板采用完全一致的表头与数据结构，可用于批量导入知识库数据。该模板的表头字段分别为q、a、index、index与metadata。其中q列填写待导入的问题内容，a列填写对应匹配的答案内容，两个index字段可用于自定义分类标记，metadata列填写JSON格式的元数据信息。

## 标准模板表头与示例数据
下表为标准模板的示例数据，可直接参考填写：
| q                    | a                                  | index        | index         | metadata                                         |
| -------------------- | ---------------------------------- | ------------ | ------------- | ------------------------------------------------ |
| FastGPT 是什么？     | FastGPT 是一个 AI Agent 构建平台。 | FastGPT 简介 | AI Agent 平台 | `{"source":"product-doc","category":"overview"}` |
| 如何导入知识库数据？ | 可以使用 CSV 或 Excel 模板导入。   | 知识库导入   | 模板导入      | `{"source":"help-center"}`                       |

## Excel文件使用要求
使用该Excel模板导入知识库数据时，需严格满足以下要求：
1.  文件扩展名为 .xlsx，不支持 .xls格式。
2.  文档仅可包含一个工作表，不可存在合并单元格。
3.  文档第一行必须为模板预设的标准表头，不可擅自修改或删除任何表头字段。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/template)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
