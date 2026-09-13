---
title: 介绍FastGPT中QueryExtension的功能与使用注意事项
slug: /zh/glossary/fastgpt-queryextension-usage
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1142
source_type: 官方文档
---

# 介绍FastGPT中QueryExtension的功能与使用注意事项

## 一句话定义
QueryExtension是FastGPT中用于基于对话历史进行查询重写的AI功能模块，可辅助优化用户查询以适配RAG相关业务场景。

## 在 FastGPT 里怎么用
该模块的核心代码位于packages/service/core/ai/functions/queryExtension.ts的第120行。当前FastGPT提供的completion API以对话交互场景为设计基础，不适用于系统间的直接调用。若需实现非对话形式的系统集成，可参考对应功能需求，使用符合JSON格式的输入数据与返回结果。典型应用场景为基于RAG功能实现推荐功能，以非对话方式接收查询调用，返回指定格式的结果。输入可采用标准JSON结构，返回结果可包含如推荐条目ID列表等所需内容。

## 容易搞错的地方
该模块在拼接对话历史记录时存在逻辑缺陷。若历史记录中的item.value为对象类型，会导致模型接收到的提示词中历史记录被格式化为`\nQ: [object Object]\nA: [object Object]\n`，无法正常依据历史记录完成查询重写，进而影响RAG相关功能的正常运行。

> [FastGPT GitHub issue 1142](https://github.com/labring/FastGPT/issues/1142), [FastGPT GitHub issue 1684](https://github.com/labring/FastGPT/issues/1684)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
