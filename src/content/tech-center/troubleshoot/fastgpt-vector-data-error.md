---
title: 解决FastGPT运行时提示没有需要生成向量的数据问题
slug: /zh/troubleshoot/fastgpt-vector-data-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2
source_type: GitHub issue
---

# 解决FastGPT运行时提示没有需要生成向量的数据问题

## 现象
运行FastGPT时出现提示“没有需要生成【向量】的数据”，部分场景下执行Redis相关命令会出现索引不存在的报错，具体报错文本包括“idx:model:data: no such index”和“idx:model:data:hash: no such index”。

## 可能原因
生成向量的函数未从Redis获取到status为waiting的数据，或Redis索引配置存在错误，未包含必要的业务字段，或存在冗余的索引创建命令导致程序异常。

## 排查步骤
1. 执行`redis-cli`连接Redis，执行`hgetall model:data:<目标数据ID>`命令，查看目标数据是否包含status为waiting的字段。
2. 检查已创建的Redis索引，核对索引创建命令的语法与字段配置，确认是否存在重复或错误的索引定义。
3. 确认数据存储的格式，区分JSON格式与HASH格式的数据，匹配对应的索引类型。

## 解决与验证
仅保留有效的Redis索引创建命令，避免冗余配置。正确的HASH格式索引创建命令为：`FT.CREATE idx:model:data:hash ON HASH PREFIX 1 model:data: SCHEMA modelId TAG userId TAG status TAG q TEXT text TEXT vector VECTOR FLAT 6 DIM 1536 DISTANCE_METRIC COSINE TYPE FLOAT32`。若使用JSON格式存储数据，可使用命令`FT.CREATE idx:model:data ON JSON PREFIX 1 model:data: SCHEMA $.modelId AS modelId TAG $.dataId AS dataId TAG $.vector AS vector VECTOR FLAT 6 DIM 1536 DISTANCE_METRIC COSINE TYPE FLOAT32`。执行正确的索引创建命令后，重新执行数据导入操作，验证提示“没有需要生成【向量】的数据”是否不再出现。

> 来源: [FastGPT GitHub issue #2](https://github.com/labring/FastGPT/issues/2)
