---
title: FastGPT中docx文件导入功能的问题与优化说明
slug: /zh/glossary/fastgpt-docx-import-optimization
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/465
source_type: 官方文档
---

# FastGPT中docx文件导入功能的问题与优化说明

## 一句话定义
FastGPT的docx文件导入功能，用于将docx格式文件解析并导入知识库，支持将文件内的表格内容转换为markdown格式读取。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该功能的入口位于知识库页面的导入文件流程中。具体操作步骤为，进入目标知识库页面，点击导入文件选项，选择本地的docx格式文件提交解析。在4.6.5及以上版本中，该功能优化了docx读取逻辑，可兼容表格内容并将其转换为markdown格式，提升了解析兼容性。

## 容易搞错的地方
在4.6.2版本中，导入包含背景图的docx文件时，会出现解析过程无报错但持续转圈无法完成的异常。仅在删除docx文件内的背景图后，导入流程才可正常完成。该异常问题在4.6.5版本中已通过优化docx读取逻辑得到修复。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/465)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
