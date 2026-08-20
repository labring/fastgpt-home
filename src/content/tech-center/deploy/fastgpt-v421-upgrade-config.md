---
title: FastGPT从旧版本升级到V4.2.1的私有部署配置指南
slug: /zh/deploy/fastgpt-v421-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/421
source_type: 官方文档
---

# FastGPT从旧版本升级到V4.2.1的私有部署配置指南

## 升级说明
FastGPT V4.2.1版本的升级涉及私有部署的配置调整，针对已添加自定义配置文件的用户，需要对VectorModels字段进行修改。该版本新增了两个配置参数，用于优化嵌入模型的分段与调用逻辑。

## 配置修改步骤
1. 打开你的FastGPT私有部署配置文件，找到VectorModels数组配置项。
2. 为数组内的每个嵌入模型对象，新增`defaultToken`和`maxToken`两个字段。
3. 参考官方给出的最小配置示例完成修改：
```yaml
VectorModels: [
  {
    model: text-embedding-ada-002,
    name: Embedding-2,
    price: 0,
    defaultToken: 500,
    maxToken: 3000
  }
]
```
其中`defaultToken`对应直接分段时的默认token数量，`maxToken`对应模型支持的token上限，官方提示通常不建议将maxToken设置超过3000。

## 改动目的
本次配置调整的核心目的是简化模型选择逻辑，官方认为无需留给用户额外的选择余地，统一使用最合适的模型完成相关任务，降低用户的配置复杂度。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/421)
