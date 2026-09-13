---
title: 说明FastGPT中的mineru PDF解析工具的含义与使用方法
slug: /zh/glossary/fastgpt-mineru-pdf-parser
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4147
source_type: 官方文档
---

# 说明FastGPT中的mineru PDF解析工具的含义与使用方法

## 一句话定义
mineru是FastGPT内置的系统插件工具，功能为PDF文档解析。
## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在FastGPT的系统插件更新流程中，mineru作为系统工具之一，其更新需遵循特定规则。若当前系统并非从4.14.6版本升级而来，可通过两种方式完成插件更新：一是前往FastGPT的插件市场，找到mineru插件并执行更新操作；二是下载官方提供的zip安装包直接安装，该zip包的下载地址为https://github.com/labring/fastgpt-plugin/raw/refs/heads/main/.github/assets/upgrade_pkg.zip。若当前系统是从4.14.6版本升级而来，则可跳过该插件的更新步骤。
## 容易搞错的地方
部分使用者未明确当前升级版本是否为4.14.6，就直接执行mineru插件的更新操作，导致重复执行不必要的流程。此外，若使用非官方提供的zip包安装该插件，可能会出现兼容性异常的问题。
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4147)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
