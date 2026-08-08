---
title: FastGPT从旧版本升级到V4.2.1的配置操作指南
slug: /zh/deploy/fastgpt-v421-upgrade-config-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/421
source_type: 官方文档
---

# FastGPT从旧版本升级到V4.2.1的配置操作指南

## 升级前提与核心改动
FastGPT从旧版本升级到V4.2.1时，若你使用了自定义配置文件，需要对配置文件中的`VectorModels`字段进行修改。本次升级新增了`defaultToken`和`maxToken`两个配置项，其中`defaultToken`对应直接分段时的默认token数量，`maxToken`为该模型支持的token上限，官方建议通常不超过3000。本次改动的核心目的是统一模型选择逻辑，确保使用最合适的模型完成对应任务。

## 具体配置修改步骤
在自定义配置文件中，需按照以下格式调整`VectorModels`字段的内容：
```yaml
VectorModels : [ { model : text-embedding-ada-002 , name : Embedding-2 , price : 0 , defaultToken : 500 , maxToken : 3000 } ]
```
请根据你实际使用的向量模型替换示例中的`model`和`name`参数，确保每个模型对象都包含`defaultToken`和`maxToken`字段，否则可能会导致配置加载异常。

## 升级注意事项
仅当你自定义了配置文件时才需要执行上述修改，若未自定义配置文件则无需额外操作。若未正确配置`VectorModels`字段，可能会导致知识库分段逻辑异常，影响后续的问答与知识库处理流程。请严格遵循官方建议，将`maxToken`的数值控制在3000以内，避免超出模型支持的token上限。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/421
