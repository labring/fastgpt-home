---
title: 说明FastGPT文档解析节点的功能与使用规则
slug: /zh/glossary/fastgpt-document-parse-node
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/general/fileInput
source_type: 官方文档
---

# 说明FastGPT文档解析节点的功能与使用规则

## 一句话定义
文档解析节点是FastGPT工作流中接收文件URL数组、解析文档内容并输出拼接后文本的处理节点。

## 在FastGPT里怎么用
文档解析节点的输入为array<string>类型的文件URL数组，对应文件输入的URL集合。节点的输出为string类型，对应文档解析后的完整内容。节点会根据文件URL解析出的文件后缀判断文件类型，仅处理文档类型的URL，若同时选择文档和多模态文件，多模态文件会被忽略。当存在多个文档时，节点会按固定格式拼接内容：每个文档以"File: ${filename}\n<Content>\n${content}\n</Content>"的格式组织，不同文档之间通过分隔符"\n******\n"进行分割。

## 容易搞错的地方
文档解析节点仅解析当前工作流接收的文件，不会解析历史记录中的文件。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/general/fileInput)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
