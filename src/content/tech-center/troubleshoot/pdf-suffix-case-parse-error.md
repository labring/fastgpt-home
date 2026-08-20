---
title: 解决FastGPT中PDF文件后缀大小写导致无法解析的问题
slug: /zh/troubleshoot/pdf-suffix-case-parse-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6996
source_type: GitHub issue
---

# 解决FastGPT中PDF文件后缀大小写导致无法解析的问题

## 现象
上传命名为`123.PDF`的文件时，FastGPT流程无法解析该文件的内容；将文件后缀修改为小写的`123.pdf`后，可正常解析文件内容。

## 可能原因
FastGPT的文件解析逻辑对文件后缀名的大小写有严格校验规则，仅能识别小写的`.pdf`后缀，大写的`.PDF`后缀无法被匹配到对应的解析流程中。

## 排查步骤
1. 检查待上传的PDF文件的后缀名，确认是否为大写`.PDF`或其他大小写混合的格式。
2. 准备一份后缀名为小写`.pdf`的同名测试文件，上传至FastGPT流程中，验证是否可以正常解析。
3. 若完成前两步后仍存在解析异常，需按实际环境确认相关配置项。

## 解决与验证
解决方法：将目标文件的后缀名修改为小写的`.pdf`后重新上传至FastGPT流程。验证步骤：上传修改后缀后的文件，确认流程可以正常读取并解析文件内容，即可验证该问题已解决。

> 来源：[FastGPT GitHub Issue #6996](https://github.com/labring/FastGPT/issues/6996)
