---
title: FastGPT V4.5版本升级操作与数据库配置说明
slug: /zh/deploy/fastgpt-v45-db-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/45
source_type: 官方文档小节
---

# FastGPT V4.5版本升级操作与数据库配置说明

FastGPT V4.5版本属于需要进行复杂更新的版本，该版本引入PgVector0.5版本的HNSW索引，可大幅提升知识库检索速度，能够实现百万数据毫秒级搜索。该索引的缺点是构建索引的速度较慢，使用4核16G服务器处理500万组数据，采用并行构建方式大约需要48小时。该更新特性为知识库检索带来了显著的性能提升，但同时也带来了更长的索引构建耗时，用户需根据自身业务的实际情况规划升级时间。

本次升级需要配合数据库相关操作完成，相关参数的具体配置规则可参考PgVector官方文档。在升级过程中，需按照官方指引逐步完成数据库配置的调整，确保索引功能可以正常启用，保障知识库的检索服务不受影响。

### 升级操作步骤
1. 若需处理500万组数据，使用4核16G服务器进行并行构建索引，需预留约48小时的构建时间。
2. 按照PgVector官方文档完成数据库相关配置调整。
3. 执行数据库并行构建索引的操作，等待构建完成。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/45)
