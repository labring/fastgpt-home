---
title: 解决FastGPT私有部署版本上传文件无法删除的问题
slug: /zh/troubleshoot/fastgpt-private-file-delete-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/825
source_type: GitHub issue
---

# 解决FastGPT私有部署版本上传文件无法删除的问题

## 现象
用户使用FastGPT 4.6.8私有部署版本，GPT系列LLM的调用功能正常，在调测GLM期间，出现上传的文件无法删除的问题。

## 可能原因
目前无明确已知触发原因，需结合实际部署环境、存储配置、权限设置等维度逐一排查，具体细节需按实际环境确认。

## 排查步骤
1. 确认当前FastGPT版本为4.6.8私有部署版本，对比GPT系列LLM与GLM调用时的文件删除表现，确认仅在GLM调测场景下出现该问题。
2. 检查文件存储相关的配置项，需按实际环境确认。
3. 查看系统运行日志，检索文件删除操作对应的日志内容，需按实际环境提取。
4. 确认操作账号是否具备文件删除的操作权限，需按实际环境确认。

## 解决与验证
若排查后找到对应问题，例如存储权限不足、配置项错误等，可针对性修复配置或权限。修复完成后，重新上传文件并尝试删除操作，验证文件是否可正常删除。若问题仍存在，需结合更多部署细节进一步排查。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/825)
