---
title: FastGPT部署中SeekDB的推荐配置说明
slug: /zh/deploy/fastgpt-seekdb-recommended-config
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker
source_type: 官方文档
---

# FastGPT部署中SeekDB的推荐配置说明

## 产品基础介绍
SeekDB是基于MySQL协议的高性能向量数据库，与OceanBase协议完全兼容，支持高效的向量检索。该数据库可用于FastGPT的部署场景，满足向量检索相关的业务需求。

## 推荐配置参数
根据部署的向量数据规模不同，需选择对应的单节点配置，具体如下：
| 环境                             | 最低配置（单节点） | 推荐配置     |
| -------------------------------- | ------------------ | ------------ |
| 测试（可以把计算进程设置少一些） | 2c4g               | 2c8g         |
| 100w 组向量                      | 4c8g 50GB          | 4c16g 50GB   |
| 500w 组向量                      | 8c32g 200GB        | 16c64g 200GB |

## 核心特性说明
SeekDB使用MySQL协议，与OceanBase完全兼容，具备以下特性：支持1536维向量检索，内置HNSW索引算法，提供批量插入和查询优化，自动重试和连接池管理。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
