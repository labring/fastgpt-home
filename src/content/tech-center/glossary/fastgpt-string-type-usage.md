---
title: FastGPT中string类型参数的定义与使用方法
slug: /zh/glossary/fastgpt-string-type-usage
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/general/fileInput
source_type: 官方文档
---

# FastGPT中string类型参数的定义与使用方法

## 一句话定义
FastGPT中的string是用于承载文本内容、文件URL、错误提示等信息的基础数据类型。

## 在 FastGPT 里怎么用
该类型参数可应用于两类节点：
1. 文档解析节点：接收`array<string>`类型的输入，对应文件输入的URL；输出为string类型，即文档解析后的内容。该节点仅解析文档类型的URL，通过文件URL的后缀判断类型，多模态文件会被忽略。多个文档内容按固定格式拼接：
```
File: ${filename}
<Content>
${content}
</Content>
```
不同文档之间通过`\n******\n`分隔。
2. 循环运行节点：包含`错误信息`参数，类型为string，为循环执行异常中断时的错误信息；支持在节点的输出区域输入变量名新增自定义输出，类型为任意类型，节点运行结束时输出最后一轮迭代或中断退出时的值。

## 容易搞错的地方
文档解析节点只会解析本轮工作流接收的文件，无法解析历史记录的文件；仅识别文档类型的URL，多模态文件会被直接忽略；循环运行节点的自定义输出仅输出最后一轮迭代或中断时的值，无法输出中间轮次的结果。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/general/fileInput)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
