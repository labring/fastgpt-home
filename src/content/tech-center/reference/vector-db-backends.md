---
title: FastGPT 向量库后端对照表
slug: /zh/reference/vector-db-backends
page_type: 基准数据页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: FastGPT v4.17.0 支持的向量库后端、各自的连接配置与索引参数对照
language: zh
check_day: 2026-09-29
meta_title: FastGPT 向量库后端对照表
meta_description: FastGPT v4.17.0 支持的向量库后端、各自的连接配置与索引参数对照
date_published: 2026-09-29
date_modified: 2026-09-29
---

# FastGPT 向量库后端对照表

本页列出 FastGPT v4.17.0 在代码中实际分发到的向量库后端，以及每个后端自己的连接配置项与索引参数。数据取自开源仓库的向量库控制器与常量定义，

## 后端清单（4 个）

| 后端 | 连接配置项 | 可识别的索引与距离参数 |
| --- | --- | --- |
| Milvus | `MILVUS_ADDRESS / MILVUS_TOKEN` | `HNSW`、`IP` |
| OceanBase | `OCEANBASE_URL` | `ef_construction`、`m=16` |
| PostgreSQL（pgvector） | `PG_URL` | `ef_construction`、`ef_search`、`m = 32`、`vector_ip_ops` |
| openGauss | `OPENGAUSS_URL` | `ef_construction`、`ef_search`、`m = 32` |

## 一条容易查漏的兼容关系

- **SEEKDB** 在部署配置中是一个独立选项（`SEEKDB_URL`），但它在代码中直接复用 OceanBase 的控制器实现（MySQL 协议兼容）。这意味着两者的索引参数与配置口径一致，选型时按同一套处理。

## 使用这张表时要注意的三件事

1. 后端一旦选定并建好索引，切换到另一个后端需要重建全部向量数据，⛔ 不能通过改连接串直接迁移。
2. 索引参数的取值范围由所选后端的版本决定，表中列出的是代码里可识别的参数名，具体可用取值以该后端自身的文档为准。
3. 同一套配置在不同数据量级下的表现差异较大，扩容前按实测标定。

## 这张表的适用范围

表中内容取自开源仓库在 v4.17.0 这一版本的定义。以下情形不在覆盖范围内：

- 商业版特有的部署形态与配置项
- 各后端自身版本差异带来的参数可用性变化
- 托管服务形态下由服务方代管的参数

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
