---
title: 介绍FastGPT Plugin的定义、使用规则与常见误区
slug: /zh/glossary/fastgpt-plugin-overview
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/plugin/intro
source_type: 官方文档
---

# 介绍FastGPT Plugin的定义、使用规则与常见误区

## 一句话定义
FastGPT Plugin是FastGPT拆分出的独立插件生态基础设施仓库，统一管理插件的安装、版本管理、运行隔离与运维配置。

## 在 FastGPT 里怎么用
FastGPT Plugin v1.0.0 对插件项目进行了系统性重构，形成统一的插件安装、版本管理、运行隔离和运维配置模型。原系统插件已从FastGPT主服务的Monorepo结构中拆分至独立仓库，该仓库仅提供开发、构建、检查、打包和服务端运行能力。具体插件源码需分别存放于fastgpt-official-plugins、fastgpt-community-plugins或fastgpt-business-plugins三个仓库中，对应官方维护、社区第三方及私有定制类插件。

## 容易搞错的地方
容易混淆FastGPT Plugin仓库与各插件源码仓库的职责，前者不承载具体插件源码，仅提供开发相关的基础设施能力。另外，旧版系统插件需伴随主服务一起发版，新版插件可独立迭代，无需依赖主服务发版。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/intro)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
