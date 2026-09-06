---
title: 为FastGPT配置Marker以解析包含复杂内容的PDF文件
slug: /zh/deploy/fastgpt-marker-pdf-parse-3
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker
source_type: 官方文档
---

# 为FastGPT配置Marker以解析包含复杂内容的PDF文件

## 背景说明
PDF是一类相对复杂的文件格式。FastGPT内置的PDF解析器依赖pdfjs库实现解析，该库基于逻辑解析，无法有效理解复杂的PDF文件结构。当解析包含图片、表格、公式等非简单文本内容的PDF文件时，内置解析器的解析效果不佳。

## 解析方案说明
存在可有效提取PDF中复杂内容的解析方案，该方案基于视觉解析逻辑，可完整提取图片、表格、公式等内容。

## 配置操作指南
FastGPT v4.9.0版本中，社区版用户与商业版用户的配置流程存在差异。
社区版用户需打开`config.json`文件，添加`systemEnv.customPdfParse`配置项。完成配置后，需重新拉取Marker镜像，且接口格式已发生变动。
商业版用户直接在Admin后台根据表单指引填写配置即可。操作完成后，需重新拉取Marker镜像，且接口格式已发生变动。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
