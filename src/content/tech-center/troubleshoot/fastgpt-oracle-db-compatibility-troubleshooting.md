---
title: FastGPT工具箱数据库连接无法兼容Oracle数据库的排错指南
slug: /zh/troubleshoot/fastgpt-oracle-db-compatibility-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4677
source_type: GitHub issue
---

# FastGPT工具箱数据库连接无法兼容Oracle数据库的排错指南

## 现象
使用FastGPT工具箱的数据库连接功能时，无法完成Oracle数据库的连接配置与使用，无法实现基于Oracle数据库的相关数据操作。

## 可能原因
FastGPT原有数据库连接模块因Oracle数据库依赖与产品其他依赖存在冲突，已被移除内置支持。

## 排查步骤
1. 确认当前使用的FastGPT版本为最新正式版本
2. 尝试配置Oracle数据库连接，记录完整的报错信息
3. 检查项目依赖包中是否存在Oracle数据库相关依赖与其他依赖的冲突情况

## 解决与验证
目前官方暂未内置Oracle数据库连接支持。若需临时使用，可通过Docker拉取Oracle Database 23ai Free镜像，执行命令：`docker pull container-registry.oracle.com/database/free:latest`。若基于Langchain开发集成，可导入`OracleVS`类，示例代码如下：
```python
from langchain_oracledb import OracleVS
vector_store = OracleVS(
client=connection,
embedding_function=embedding_model,
table_name="DOC_MEITUAN_QA",
distance_strategy=DistanceStrategy.COSINE,
)
```
验证时，成功拉取并启动Oracle镜像后，可通过上述代码确认数据库连接与向量操作正常。后续可关注官方更新以获取内置的Oracle数据库连接支持。

> 来源: [FastGPT GitHub issue #4677](https://github.com/labring/FastGPT/issues/4677)
