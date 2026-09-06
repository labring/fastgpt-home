---
title: FastGPT平台中团队模式的配置规则与参数说明
slug: /zh/glossary/fastgpt-team-mode-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/admin/teamMode
source_type: 官方文档
---

# FastGPT平台中团队模式的配置规则与参数说明

## 一句话定义
团队模式是FastGPT中用于管理团队组织结构与成员加入规则的配置项，支持多团队、单团队、成员同步三种模式。
## 在 FastGPT 里怎么用
在FastGPT管理员后台的团队模式配置页面，可选择多团队模式、单团队模式或成员同步模式。各模式的具体规则如下：单团队模式下，短信/邮箱注册、管理员直接添加、SSO注册均自动加入Root团队，不创建默认团队；多团队模式下，三类注册或添加方式均创建默认团队，不加入Root团队；成员同步模式下，仅SSO注册可加入Root团队，其余注册或添加方式无默认团队创建与加入操作。
## 容易搞错的地方
容易混淆三种模式的成员加入与默认团队创建规则，单团队模式不会创建默认团队，所有用户均加入Root团队；成员同步模式仅支持SSO注册的成员同步规则，其余注册或添加方式无对应团队操作。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/admin/teamMode)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
