---
title: 介绍FastGPT知识库集合标签的管理与搜索过滤方法
slug: /zh/dataset/dataset-collection-tag-filter
page_type: 知识库与切分
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/collection_tags
source_type: 官方文档
---

# 介绍FastGPT知识库集合标签的管理与搜索过滤方法

## 功能概述与使用边界
知识库集合标签是FastGPT商业版专属功能，用于对知识库中的数据集合添加标签进行分类，提升知识库数据的管理效率。同时可在问答搜索知识库时，通过集合过滤实现更精确的检索结果筛选，避免无关数据干扰。该功能仅面向商业版用户，若无需对知识库数据进行分类管理，或使用的是社区版，则无需使用该功能。

## 标签基础操作步骤
在知识库详情页面，可完成以下标签相关操作：
1.  标签管理：创建新标签、修改已有标签的名称、删除不再需要的标签；
2.  标签分配：将一个标签赋给多个数据集合，也可给单个数据集合添加多个不同的标签；
3.  集合筛选：通过标签快速筛选出对应分类的数据集合，便于快速定位目标内容。

## 知识库搜索集合过滤规则
在知识库搜索时，可通过填写「集合过滤」栏实现精准检索，支持的过滤语法格式示例如下：
```json
{
  "tags": {
    "$and": ["标签1", "标签2"],
    "$or": ["标签3"]
  },
  "createTime": {
    "$gte": "YYYY-MM-DD HH:mm",
    "$lte": "YYYY-MM-DD HH:mm"
  }
}
```
填写时需遵循以下注意事项：
1.  标签值支持两种类型：字符串形式的标签名，或`null`，其中`null`代表未设置任何标签的数据集合；
2.  若同时配置`$and`和`$or`条件，仅`$and`条件会生效，`$or`条件将不被识别；
3.  时间过滤参数`$gte`和`$lte`需严格遵循`YYYY-MM-DD HH:mm`格式，可单独使用或组合使用。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/dataset/collection_tags)
