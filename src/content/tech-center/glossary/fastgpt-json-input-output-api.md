---
title: 讲解FastGPT的JSON格式输入输出API功能与用法
slug: /zh/glossary/fastgpt-json-input-output-api
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1684
source_type: 官方文档
---

# 讲解FastGPT的JSON格式输入输出API功能与用法

## 一句话定义
该功能指FastGPT中支持以JSON格式作为请求输入、并返回结构化JSON结果的API，用于非对话场景的系统集成调用。

## 在 FastGPT 里怎么用
该API的设计目的是满足系统间集成需求，替代现有对话式completion API，实现非对话方式的调用。使用时需以JSON格式构造请求输入，示例输入结构为{"param1":"查询属性1","param1":"查询属性1"}，该输入用于传入查询所需的属性参数。返回结果将以JSON格式输出，示例返回结构为{"recommended items":["item id1","item id2","item id3"]}，其中包含推荐的项目ID列表。该功能适用于利用RAG功能搭建的推荐场景，可直接以非对话方式接收查询调用并返回最接近的三个结果。

## 容易搞错的地方
容易混淆现有对话式completion API与该功能API。现有对话式completion API为对话场景设计，不适用于系统间集成调用，无法满足以JSON格式输入输出的非对话需求。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1684)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
