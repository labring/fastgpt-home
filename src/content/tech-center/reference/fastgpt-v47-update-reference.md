---
title: FastGPT V4.7版本更新内容及配置操作指引
slug: /zh/reference/fastgpt-v47-update-reference
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/47
source_type: 官方文档小节
---

# FastGPT V4.7版本更新内容及配置操作指引

## 结论
本文汇总FastGPT V4.7版本的全部更新内容，涵盖新增功能、体验优化与问题修复。部分功能需调整模型配置参数方可启用。

## 具体怎么做
1. 启用工具调用模块，让LLM模型可根据用户意图动态选择其他模型或插件执行。
2. 配置分类和内容提取的functionCall模式：打开LLM模型配置文件，将`functionCall`参数设为`true`，`toolChoice`参数设为`false`；若需使用tool模式，将`toolChoice`设为`true`。
3. 使用HTTP插件快速生成OpenAPI插件。
4. 直接使用兼容cohere格式的Rerank模型。
5. 采用Helm方式进行部署。
6. Docker部署将自动初始化副本集。
7. 浏览器读取文件时自动推断编码，减少乱码。
8. 支持在http URL中使用变量。

## 注意事项
1. PG HNSW索引更新后若出现精度损失，需参考PgVector官方文档调整索引。
2. 部分模型仅支持functionCall不支持ToolCall，需按对应参数配置。
3. http请求body不使用时需传入`undefined`，避免GET请求失败。
4. V4.7.1与V4.6.9版本升级涉及环境变量变更，需查看对应升级脚本说明。
5. 自定义分割规则现在可输入正则特殊字符，不会再导致前端崩溃。
6. 本次更新修复了社区版重排选不上、Safari浏览器语音输入、469提取提示词幻觉等问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/47)
