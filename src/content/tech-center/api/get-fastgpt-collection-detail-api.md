---
title: 获取FastGPT知识库集合详情的OpenAPI调用指南
slug: /zh/api/get-fastgpt-collection-detail-api
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# 获取FastGPT知识库集合详情的OpenAPI调用指南

## 接口概述
该OpenAPI属于FastGPT知识库管理模块，用于查询单个已创建的知识库集合的详细元数据，可获取集合归属、训练配置、文本统计等核心信息，帮助开发者快速获取集合的完整配置详情。请求方式为GET，请求路径为`/api/core/dataset/collection/detail`，需携带合法的认证令牌完成身份校验。

## 调用步骤
1. 准备认证令牌：从FastGPT平台获取有效的API访问令牌，用于构造`Authorization`请求头，格式为`Bearer {{authorization}}`，其中`{{authorization}}`需替换为实际的令牌内容。
2. 配置请求参数：请求需携带必填参数`id`，用于指定目标集合的唯一标识ID，示例值为`65abcfab9d1448617cba5f0d`。
3. 发起请求，完整的curl调用示例如下：
```curl
curl --location --request GET 'http://localhost:3000/api/core/dataset/collection/detail?id=65abcfab9d1448617cba5f0d' \
--header 'Authorization: Bearer {{authorization}}'
```

## 响应说明
当请求成功时，将返回状态码为200的响应，顶层字段包含`code`、`statusText`、`message`和`data`。其中`data`为集合的详细元数据对象，核心字段包括：
- `_id`：集合的唯一标识ID，与请求参数`id`一致
- `parentId`：集合的父级ID，当前示例为`null`
- `teamId`：集合所属团队的ID
- `datasetId`：所属知识库的详细信息，包含知识库ID、名称、向量模型`vectorModel`、对话模型`agentModel`、权限设置`permission`等配置
- `type`：集合类型，示例值为`virtual`
- `name`：集合的显示名称
- `trainingType`：集合的训练类型，示例值为`qa`
- `chunkSize`：文本分片大小，示例值为8000
- `rawTextLength`：集合内原始文本的总长度，示例值为40466
- `createTime`、`updateTime`：集合的创建和更新时间，采用ISO 8601格式
- `canWrite`：当前用户是否拥有该集合的写入权限，示例值为`true`

完整的响应示例可参考官方文档提供的标准返回格式，若请求参数缺失或无效，将返回对应错误码及提示信息。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
