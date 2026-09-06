---
title: 解决FastGPT知识库导入表格内容被分块截断的问题
slug: /zh/troubleshoot/fastgpt-table-chunk-truncation-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1184
source_type: GitHub issue
---

# 解决FastGPT知识库导入表格内容被分块截断的问题

## 现象
FastGPT知识库导入自动分块时，直接按照设定的字数阈值截断内容。当导入包含表格的PDF、EXCEL文件时，同一行的表格信息会被拆分到不同分块中，无法保证信息的完整性。

## 可能原因
当前未公开该功能的具体技术实现细节，分块截断的触发逻辑需按实际部署环境确认。

## 排查步骤
1. 确认当前使用的FastGPT具体版本号。
2. 准备包含表格的PDF或EXCEL文件，导入至知识库，查看自动分块后的结果。
3. 检查同一行的表格内容是否被拆分到不同分块中，记录异常表现。

## 解决与验证
EXCEL文件的表格导入已按行补全表头，避免表头信息被拆分。若需确保在满足字数要求的情况下按行截断内容，保证表格信息的完整性，可升级至4.8.9版本。验证时，导入包含表格的文件，查看分块结果，确认同一行表格信息未被拆分到不同分块即可。

> 来源: [FastGPT GitHub issue #1184](https://github.com/labring/FastGPT/issues/1184)
