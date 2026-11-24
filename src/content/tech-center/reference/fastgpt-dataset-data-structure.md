---
title: FastGPT OpenAPI知识库数据结构与索引参数说明
slug: /zh/reference/fastgpt-dataset-data-structure
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# FastGPT OpenAPI知识库数据结构与索引参数说明

## 结论
本文整理FastGPT OpenAPI知识库数据与索引的标准结构，明确各字段的必填项与含义。开发者可直接参照本文参数完成知识库数据的提交与更新操作。

## 具体怎么做
1.  提交知识库数据需遵循Data结构，必填字段包括teamId、tmbId、datasetId、collectionId、q、indexes、updateTime。
2.  Data结构各字段说明如下：
| 字段 | 类型 | 说明 | 必填 |
| --- | --- | --- | --- |
| teamId | String | 团队ID | ✅ |
| tmbId | String | 成员ID | ✅ |
| datasetId | String | 知识库ID | ✅ |
| collectionId | String | 集合ID | ✅ |
| q | String | 主要数据 | ✅ |
| a | String | 辅助数据 | ✖ |
| fullTextToken | String | 分词 | ✖ |
| indexes | Index[] | 向量索引 | ✅ |
| updateTime | Date | 更新时间 | ✅ |
| chunkIndex | Number | 分块下表 | ✖ |
3.  索引需遵循Index结构，每组数据自定义索引最多5个，必填字段包括text。Index结构各字段说明如下：
| 字段 | 类型 | 说明 | 必填 |
| --- | --- | --- | --- |
| type | String | 索引类型可选值：default（默认索引）、custom（自定义索引）、summary（总结索引）、question（问题索引）、image（图片索引），不填则默认custom | ✖ |
| dataId | String | 关联的向量ID，变更数据时传入可实现差量更新 | ✖ |
| text | String | 文本内容 | ✅ |

## 注意事项
1.  每组数据的自定义索引最多允许创建5个。
2.  type字段不填时默认使用custom索引，系统会基于q、a字段组成默认索引，若传入默认索引则不会额外创建。
3.  变更数据时传入dataId，可实现差量更新，无需全量覆盖。
4.  a、fullTextToken、chunkIndex为非必填字段，可按需传入。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
