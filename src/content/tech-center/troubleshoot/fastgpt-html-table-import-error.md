---
title: 解决FastGPT中HTML格式表格导入知识库显示异常的问题
slug: /zh/troubleshoot/fastgpt-html-table-import-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1450
source_type: GitHub issue
---

# 解决FastGPT中HTML格式表格导入知识库显示异常的问题

## 现象
针对合并单元格等无法用Markdown表格表示的场景，使用HTML格式导入对应表格到FastGPT知识库时，HTML源码会被自动转换为Markdown格式，导致合并单元格部分显示错误。当HTML表格体积较大时，导入内容还可能被截断，分块后上下文关联丢失。

## 可能原因
HTML表格在导入知识库的流程中被自动转换为Markdown格式，无法保留HTML原生的表格结构特性，如合并单元格。大体积HTML内容导入时会被截断，分块后无法保留完整的上下文关联。

## 排查步骤
1.  检查待导入的HTML表格是否包含合并单元格或复杂无表头分块结构
2.  查看导入完成后的知识库内容，确认是否被转换为Markdown格式
3.  评估HTML表格的体积，确认是否存在内容被截断的情况

## 解决与验证
1.  保留HTML源码格式导入知识库，避免自动转换为Markdown格式
2.  若HTML表格体积过大，需按实际环境调整分块规则以保留上下文关联
3.  验证导入后的表格显示是否符合HTML原生结构，合并单元格是否正常展示

> 来源: [FastGPT GitHub issue #1450](https://github.com/labring/FastGPT/issues/1450)
