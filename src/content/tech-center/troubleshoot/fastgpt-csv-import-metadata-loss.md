---
title: 解决FastGPT知识库CSV导入后元数据丢失问题
slug: /zh/troubleshoot/fastgpt-csv-import-metadata-loss
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1769
source_type: GitHub issue
---

# 解决FastGPT知识库CSV导入后元数据丢失问题

## 现象
将FastGPT知识库导出为CSV格式后，重新导入至新知识库时，文件名等元数据关键信息无法保留。

## 可能原因
FastGPT的CSV导出功能未包含文件名等元数据内容，因此导入操作无法获取并恢复对应的元数据信息。

## 排查步骤
1. 确认待操作的知识库导出文件格式为CSV。
2. 查看导出的CSV文件内容，检查是否包含文件名相关的元数据字段。
3. 执行CSV文件导入操作，验证导入后的知识库元数据是否缺失。

## 解决与验证
可通过备份整个数据库的方式，保留元数据与chunk的对应关系。验证时，通过完整数据库备份恢复知识库，检查元数据与chunk的对应关系是否正常保留。

> 来源: [FastGPT GitHub issue #1769](https://github.com/labring/FastGPT/issues/1769)
