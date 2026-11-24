---
title: FastGPT知识库CSV导入模板的使用规范与操作步骤
slug: /zh/reference/fastgpt-csv-dataset-template
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/dataset/template
source_type: 官方文档小节
---

# FastGPT知识库CSV导入模板的使用规范与操作步骤

## 结论
FastGPT知识库支持使用CSV模板导入批量数据。使用官方标准的CSV模板可完成规范的数据导入流程。

## 具体怎么做
1. 按照官方指定的表头格式创建CSV文件，表头依次为q、a、index、index、metadata。
2. 按字段填写内容：q列填写问题，a列填写对应答案，两个index列填写分类标签，metadata列填写JSON格式的元数据。
3. 将文件保存为UTF-8编码格式后，即可用于知识库导入。

## 注意事项
1. CSV文件必须使用UTF-8编码格式。
2. 若单元格内容包含逗号、换行或双引号，需按照CSV规则正确转义。
3. 请勿随意调整模板的表头字段顺序与名称。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/dataset/template)
