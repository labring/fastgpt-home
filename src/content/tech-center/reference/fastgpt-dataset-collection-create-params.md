---
title: FastGPT知识库集合创建的通用入参与出参说明
slug: /zh/reference/fastgpt-dataset-collection-create-params
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# FastGPT知识库集合创建的通用入参与出参说明

## 结论
本文档说明FastGPT知识库集合创建接口的通用入参、出参规则。调用该接口可新建知识库集合，需遵循参数填写要求。

## 具体怎么做
调用FastGPT知识库集合创建接口时，需按以下规则填写参数：

| 参数 | 说明 | 必填 |
| --- | --- | --- |
| datasetId | 知识库 ID | ✅ |
| parentId | 父级 ID，不填则默认为根目录 | 否 |
| trainingType | 数据处理方式。chunk: 按文本长度进行分割;qa: 问答对提取 | ✅ |
| indexPrefixTitle | 是否自动生成标题索引 | 否 |
| customPdfParse | 是否开启 PDF 增强解析, 默认 false: 关闭;true: 开启 | 否 |
| autoIndexes | 是否自动生成索引(仅商业版支持) | 否 |
| imageIndex | 是否自动生成图片索引(仅商业版支持) | 否 |
| chunkSettingMode | 分块参数模式。auto: 系统默认参数; custom: 手动指定参数 | 否 |
| chunkSplitMode | 分块拆分模式。size: 按长度拆分; char: 按字符拆分。chunkSettingMode=auto 时不生效 | 否 |
| chunkSize | 分块大小，默认 1500。chunkSettingMode=auto 时不生效 | 否 |
| indexSize | 索引大小，默认 512，必须小于索引模型最大 token。chunkSettingMode=auto 时不生效 | 否 |
| chunkSplitter | 自定义最高优先分割符号，除非超出文件处理最大上下文，否则不会进行进一步拆分。chunkSettingMode=auto 时不生效 | 否 |
| qaPrompt | qa 拆分提示词 | 否 |
| tags | 集合标签（字符串数组） | 否 |
| createTime | 文件创建时间（Date / String） | 否 |

接口返回结果包含以下字段：
- collectionId：新建的集合 ID
- insertLen：插入的块数量

## 注意事项
1. trainingType为必填参数，仅支持chunk、qa两种取值。
2. 当chunkSettingMode为auto时，chunkSplitMode、chunkSize、indexSize、chunkSplitter参数不生效。
3. autoIndexes、imageIndex仅商业版支持。
4. customPdfParse默认值为false，即关闭PDF增强解析。
5. indexSize默认值为512，必须小于索引模型最大token。
6. chunkSize默认值为1500。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
