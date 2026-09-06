---
title: 解决FastGPT中OceanBase向量索引重复创建报错的问题
slug: /zh/troubleshoot/fastgpt-oceanbase-index-duplicate-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4873
source_type: GitHub issue
---

# 解决FastGPT中OceanBase向量索引重复创建报错的问题

## 现象
在packages/service/common/vectorDB/oceanbase/index.ts文件中，执行await ObClient.query的如下语句时，每次重启应用都会执行该语句：
`CREATE VECTOR INDEX IF NOT EXISTS vector_index ON ${DatasetVectorTableName}(vector) WITH (distance=inner_product, type=hnsw, m=32, ef_construction=128);`
语句中的IF NOT EXISTS子句未生效，启动时会出现报错，且报错不影响业务正常使用。

## 可能原因
该向量索引创建逻辑的IF NOT EXISTS子句存在兼容性问题，相关修复正在推进中，尚未正式发布。

## 排查步骤
1. 定位到项目的packages/service/common/vectorDB/oceanbase/index.ts文件，找到向量索引创建相关的代码块。
2. 查看该代码块中执行的CREATE VECTOR INDEX语句的完整内容，确认IF NOT EXISTS子句的配置。
3. 收集应用重启时的控制台或日志文件中的报错信息，确认与索引创建相关的报错内容。

## 解决与验证
官方已知该问题，相关修复正在开发中。该问题不影响业务正常使用，若需临时规避重复执行的问题，可在执行索引创建语句前，先确认目标索引是否已存在。验证方式为重启应用，观察报错是否仍出现，确认业务功能可正常运行。

> 来源: [FastGPT GitHub issue #4873](https://github.com/labring/FastGPT/issues/4873)
