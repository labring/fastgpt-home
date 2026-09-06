---
title: 解决FastGPT文档解析功能不支持.xls格式文件的问题
slug: /zh/troubleshoot/fastgpt-fix-xls-parsing
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4400
source_type: GitHub issue
---

# 解决FastGPT文档解析功能不支持.xls格式文件的问题

## 现象
使用FastGPT的文档解析功能处理上传文件时，后缀为.xls的文件无法被正常识别与解析，系统仅支持.xlsx格式的文档文件。

## 可能原因
.xls格式文件本质为二进制文件，与.xlsx这类基于xml结构的格式文件的解析逻辑存在显著差异，难以适配现有解析流程。同时该格式已被官方停止支持，相关适配的技术难度较高。

## 排查步骤
1. 检查待上传的文档文件的后缀名，确认格式为.xls；
2. 查阅FastGPT文档解析功能的支持格式说明，确认.xls格式不在支持范围内。

## 解决与验证
若确实需要处理.xls格式的文件，可手动将其转换为.xlsx格式后再上传至FastGPT。转换完成后上传文件，即可验证文档解析流程是否可以正常完成。

> 来源: [FastGPT GitHub issue #4400](https://github.com/labring/FastGPT/issues/4400)
