---
title: 解决FastGPT上传含换行符单元格的Excel文件格式混乱问题
slug: /zh/troubleshoot/fastgpt-excel-line-break-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5322
source_type: GitHub issue
---

# 解决FastGPT上传含换行符单元格的Excel文件格式混乱问题

## 现象
上传包含带有换行符的单元格的Excel文件时，FastGPT生成的markdown内容格式会出现混乱，无法保持原表格的正确排版。该问题可发生在公有云或私有部署版本中，仅需上传一个单元格包含换行符的Excel文件即可复现。

## 可能原因
FastGPT在解析Excel文件时，未对单元格内的换行符进行标准化处理，导致生成的markdown内容格式错乱。

## 排查步骤
1. 准备包含至少一个带有换行符单元格的Excel测试文件
2. 确认FastGPT的部署版本为4.11.0私有部署版本，或其他受影响的版本
3. 按照正常流程完成FastGPT的文件上传操作
4. 查看上传后生成的markdown内容，确认是否存在格式混乱的情况

## 解决与验证
该问题的修复方案已通过对应PR完成。部署该修复后，上传包含换行符单元格的Excel文件时，FastGPT将正确处理单元格内的换行符，生成的markdown内容格式将保持正常，可完整展示原表格的排版结构。

> 来源: [FastGPT GitHub issue #5322](https://github.com/labring/FastGPT/issues/5322)
