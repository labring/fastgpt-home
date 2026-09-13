---
title: 解决FastGPT知识库导出无法包含手动添加数据索引的问题
slug: /zh/troubleshoot/fastgpt-knowledge-export-data-index
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2303
source_type: GitHub issue
---

# 解决FastGPT知识库导出无法包含手动添加数据索引的问题

## 现象
FastGPT知识库导出功能无法导出手动添加的数据索引，导入导出CSV模板未包含数据索引列，导致手动添加的索引无法随知识库数据正常导入或导出。

## 可能原因
需按实际环境确认，当前FastGPT的知识库导入导出CSV模板未配置数据索引列相关支持，现有导出逻辑未包含手动添加的数据索引内容。

## 排查步骤
1. 进入FastGPT知识库管理页面，执行知识库CSV导出操作
2. 查看导出的CSV文件内容，确认是否包含数据索引列
3. 对比知识库导入用的CSV模板，确认模板是否未设置数据索引列

## 解决与验证
在知识库导入导出CSV模板中新增数据索引列。多组数据索引可使用特殊字符分隔，避免与内容冲突。验证时，生成包含数据索引列的CSV导入模板，导入含索引的知识库数据后执行导出操作，确认导出文件包含数据索引列内容。

> 来源: [FastGPT GitHub issue #2303](https://github.com/labring/FastGPT/issues/2303)
