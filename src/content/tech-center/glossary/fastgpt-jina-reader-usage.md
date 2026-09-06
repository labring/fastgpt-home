---
title: FastGPT中Jina Reader的定义与使用配置说明
slug: /zh/glossary/fastgpt-jina-reader-usage
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/3455
source_type: 官方文档
---

# FastGPT中Jina Reader的定义与使用配置说明

## 一句话定义
Jina Reader是FastGPT开源版本中，用于将网页内容同步至知识库的爬虫工具参考选型，可协助完成网页内容的抓取与同步工作。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在FastGPT的开源版本中，当存在将网页内容同步至知识库的需求时，可参考Jina Reader作为对应的爬虫工具。需自行配置相关爬虫逻辑，完成与FastGPT知识库同步功能的对接。当前公开的参考信息中未提及具体的配置参数、操作位置或标准化步骤，仅提供该工具作为可行的爬虫选型方向。使用者需参考Jina Reader的官方文档完成具体的对接配置。

## 容易搞错的地方
使用该工具时，需明确其为外部参考选型，需自行参考官方文档完成配置与对接。部分使用者可能误以为可直接通过FastGPT内置入口启用该工具，实际需自行完成相关逻辑的配置。同时，该工具仅适用于知识库网页同步的场景，不可用于其他类型的知识库数据同步需求。此外，需注意该工具仅支持FastGPT开源版本的部署场景。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3455)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
