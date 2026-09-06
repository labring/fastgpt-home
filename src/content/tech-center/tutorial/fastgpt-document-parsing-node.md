---
title: FastGPT文档解析节点的工作原理与使用规则
slug: /zh/tutorial/fastgpt-document-parsing-node
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/build/general/fileInput
source_type: 官方文档
---

# FastGPT文档解析节点的工作原理与使用规则

## 节点基础功能与输入输出
文档解析依赖文档解析节点，该节点用于将上传的文件转换为可用于后续处理的文本内容。节点接收`array<string>`类型的文件URL数组作为输入，该数组包含待处理文件的访问地址；输出`string`类型的解析后文档内容。节点仅解析文档类型的URL，通过文件URL的后缀判断文件类型，若同时选择文档与多模态文件，多模态文件会被忽略。节点仅会解析本轮工作流接收的文件，无法解析历史记录中的文件。

## 多文档拼接规则
当存在多个待拼接的文档内容时，需按照固定格式组合每个文件的内容，确保解析结果符合预期。每个文件的内容格式为：
```
File: ${filename}
<Content>
${content}
</Content>
```
不同文档的内容之间通过分隔符`\n******\n`进行分割，该分隔符用于明确区分不同文件的解析内容。

## 使用注意事项
配置文档解析节点时，需注意输入的文件URL数组仅包含文档类型文件，避免多模态文件混入导致被系统忽略。同时需确保输入的文件为当前工作流接收的文件，历史记录中的文件无法被该节点解析，以免影响工作流执行结果。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/general/fileInput)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
