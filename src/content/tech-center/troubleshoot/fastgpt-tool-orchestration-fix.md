---
title: 解决FastGPT工具编排后调用结果未正确整合的问题
slug: /zh/troubleshoot/fastgpt-tool-orchestration-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1405
source_type: GitHub issue
---

# 解决FastGPT工具编排后调用结果未正确整合的问题

## 现象
自行设计的工具编排流程未成功调用。流程逻辑为：先通过AI提取关键词，使用searxng搜索并返回json，因无对应json配置调用AI分析；流程单独调试可正常跑通且消耗token，但整体编排后未达到预期效果。后续尝试将数据库与网络搜索结果整合为参考内容，仍存在调用异常。

## 可能原因
未通过文本加工环节将原始问题、搜索结果与知识库内容进行整合，导致AI无法获取完整的参考信息，无法正确执行编排流程。

## 排查步骤
1. 检查工具编排流程是否缺失文本加工环节。
2. 确认原始问题与搜索结果是否未被同时引用到AI输入中。
3. 验证数据库内容与网络搜索结果是否被整合为参考输入。
4. 确认AI对话的问题输入是否来自整合后的文本加工环节。

## 解决与验证
添加文本加工环节，将原始问题、数据库内容与网络搜索结果全部引用，将联网搜索结果插入到原始问题前作为参考。将AI对话的问题设置为从该文本加工环节获取内容。完成配置后运行完整编排流程，确认流程正常消耗token且输出符合预期，即可成功调用工具。

> 来源: [FastGPT GitHub issue #1405](https://github.com/labring/FastGPT/issues/1405)
