---
title: FastGPT知识库搜索时集合过滤参数的配置方法
slug: /zh/reference/fastgpt-dataset-collection-filter
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/dataset/collection_tags
source_type: 官方文档小节
---

# FastGPT知识库搜索时集合过滤参数的配置方法

## 结论
通过在FastGPT知识库搜索的「集合过滤」栏配置指定参数，可以实现更精确的搜索结果筛选。支持按标签和集合创建时间两个维度进行过滤，参数需遵循固定的JSON格式要求。

## 具体怎么做
1. 打开知识库搜索页面，找到「集合过滤」输入框。
2. 填写符合格式的JSON参数，包含两类过滤配置：
   - 标签过滤：使用`tags`字段，可配置`$and`和`$or`数组，数组元素为标签名字符串或`null`。
   - 创建时间过滤：使用`createTime`字段，`$gte`用于筛选创建时间大于等于指定值的集合，`$lte`用于筛选创建时间小于等于指定值的集合，时间格式需为`YYYY-MM-DD HH:mm`。
3. 标准参数示例：
```json
{
  "tags": {
    "$and": ["标签 1", "标签 2"],
    "$or": ["有 $and 标签时，and 生效，or 不生效"]
  },
  "createTime": {
    "$gte": "YYYY-MM-DD HH:mm 格式即可，集合的创建时间大于该时间",
    "$lte": "YYYY-MM-DD HH:mm 格式即可，集合的创建时间小于该时间,可和 $gte 共同使用"
  }
}
```

## 注意事项
1. 标签值支持字符串类型的标签名，也可使用`null`，`null`代表筛选未设置任何标签的集合。
2. 若同时配置`$and`和`$or`条件，仅`$and`条件会生效。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/dataset/collection_tags)
