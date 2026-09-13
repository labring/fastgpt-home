---
title: 解决FastGPT向量数据库名称无法自定义切换的问题
slug: /zh/troubleshoot/fastgpt-vector-db-name-custom
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3745
source_type: GitHub issue
---

# 解决FastGPT向量数据库名称无法自定义切换的问题

## 现象
使用FastGPT时，向量数据库名称被固定写死，无法通过配置灵活切换。若需区分开发、测试等不同业务场景，只能部署多个向量数据库实例，操作成本较高。

## 可能原因
向量数据库名称的配置项DatasetVectorDbName被硬编码在packages/service/common/vectorStore/constants.ts文件中，未支持通过环境变量加载自定义配置，导致无法快速调整数据库名称。

## 排查步骤
1. 访问packages/service/common/vectorStore/constants.ts文件，查看DatasetVectorDbName的配置是否为固定值。
2. 检查当前FastGPT部署的配置文件或环境变量列表，确认是否存在可自定义向量数据库名称的参数。
3. 确认当前向量数据库实例是否支持通过数据库名称区分不同业务数据。

## 解决与验证
修改packages/service/common/vectorStore/constants.ts文件，将固定的DatasetVectorDbName配置项改为从环境变量读取。部署时配置对应环境变量，即可自定义向量数据库名称，无需重新编译镜像。启动服务后，确认向量数据库连接使用了指定的数据库名称，即可完成验证。

> 来源: [FastGPT GitHub issue #3745](https://github.com/labring/FastGPT/issues/3745)
