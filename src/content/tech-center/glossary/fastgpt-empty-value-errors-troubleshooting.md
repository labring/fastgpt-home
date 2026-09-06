---
title: FastGPT 知识库介绍为空与用户问题空报错排查指南
slug: /zh/glossary/fastgpt-empty-value-errors-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/579
source_type: 官方文档
---

# FastGPT 知识库介绍为空与用户问题空报错排查指南

## 一句话定义
指FastGPT中出现知识库介绍字段保存后未生效且显示为空，或对话中触发core.chat.error.User question empty报错的异常场景。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
该异常的触发场景包含两种。其一，在知识库配置页面配置intro字段，点击保存后页面提示更新成功，但返回知识库列表页时，介绍内容仍为空。其二，创建包含知识库与对话引导的应用，在应用内输入第二个问题后，系统自动提示“问题补全”，随后抛出core.chat.error.User question empty报错。

## 容易搞错的地方
容易搞错的点包括，将知识库配置页的保存成功提示等同于intro字段已成功同步到列表页，忽略字段未生效的情况。另外，在对话中触发core.chat.error.User question empty报错时，误以为是当前输入的问题为空，未结合应用的知识库与对话引导配置进行排查。

> [FastGPT GitHub issue 579](https://github.com/labring/FastGPT/issues/579), [FastGPT GitHub issue 713](https://github.com/labring/FastGPT/issues/713)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
