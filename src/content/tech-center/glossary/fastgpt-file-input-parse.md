---
title: 介绍FastGPT中文件输入与文档解析节点的使用规则
slug: /zh/glossary/fastgpt-file-input-parse
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/general/fileInput
source_type: 官方文档
---

# 介绍FastGPT中文件输入与文档解析节点的使用规则

## 一句话定义
文件（file）是FastGPT工作流中可被文档解析节点处理的输入资源，支持传入文件URL完成解析。

## 在 FastGPT 里怎么用
文档解析节点接收`array<string>`类型的输入，即文件URL数组，输出为`string`类型的解析后文档内容。
获取文件阅读链接需调用GET接口`/v1/file/read`，传入参数`id`为文件ID，请求需携带`Authorization: Bearer {{authorization}}`请求头，响应将返回包含文件访问URL的JSON数据。
多个文件解析后将按格式拼接：每个文件以`File: ${filename}\n<Content>\n${content}\n</Content>`格式呈现，不同文件间通过`\n******\n`分隔。

## 容易搞错的地方
文档解析节点仅解析当前工作流接收的文件，无法处理历史记录中的文件。同时选择文档和多模态文件时，多模态文件会被忽略。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/general/fileInput)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
