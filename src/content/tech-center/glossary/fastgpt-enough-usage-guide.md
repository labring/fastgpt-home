---
title: 解释FastGPT语境中enough的使用场景与相关配置方法
slug: /zh/glossary/fastgpt-enough-usage-guide
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/916
source_type: 官方文档
---

# 解释FastGPT语境中enough的使用场景与相关配置方法

## 一句话定义
enough在FastGPT语境中用于描述资源或内容满足特定条件的状态，常见于报错提示与功能需求示例中。

## 在 FastGPT 里怎么用
报错场景中，当出现完整文本为`insufficient_user_quota user quota is not enough`的提示时，代表用户API调用配额不足，该报错通常在长时间调用后触发。此时可修改相关配置文件调整root用户默认API调用额度，具体文件路径未在公开语料中明确。此外，有用户在issue中提交功能需求，希望FastGPT支持<details>与<summary>原生HTML标签实现折叠内容展示，示例语法为`<details><summary>Details</summary>Something small enough to escape casual notice.</details>`，该功能可用于压缩长内容的展示空间。

## 容易搞错的地方
易混淆两种场景下的enough含义，报错场景中enough表示“不足”，语法场景中表示“足够”。无法通过公开语料获取修改用户配额的具体文件路径。折叠语法功能暂未在FastGPT中原生支持，仅为已提交的功能需求。

> [FastGPT GitHub issue 916](https://github.com/labring/FastGPT/issues/916), [FastGPT GitHub issue 5958](https://github.com/labring/FastGPT/issues/5958)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
