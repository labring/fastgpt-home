---
title: 明确FastGPT中answer类型响应的格式与异常处理
slug: /zh/glossary/fastgpt-answer-response-spec
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/2309
source_type: 官方文档
---

# 明确FastGPT中answer类型响应的格式与异常处理

## 一句话定义
answer是FastGPT中用于输出结构化响应内容的节点类型与API响应标识，包含预设格式的文本与特定响应标记。

## 在 FastGPT 里怎么用
在FastGPT的工作流工具节点中，answer类型节点通过packages/service/core/workflow/dispatchV1/tools/answer.ts第35行代码生成响应，返回格式如下：
```javascript
{ [NodeOutputKeyEnum.answerText]: `\n${formatText}` }
```
在Chat API接口中，answer类型的响应会携带`event: answer`标识，默认在响应结尾附加`data: [DONE]`标记。

## 容易搞错的地方
调用工作流answer节点的API时，返回的文本内容前默认带有换行符，可能与预期的无前置换行的纯文本格式不符。Chat API的answer类型响应结尾的`[DONE]`标记会导致JSON解析失败，常见报错为“JSON 解析失败 D 不是期望的参数”，该标记无法通过默认JSON解析流程直接处理。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2309)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
