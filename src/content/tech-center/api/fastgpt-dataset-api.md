---
title: FastGPT知识库OpenAPI接口的参数说明与调用示例
slug: /zh/api/fastgpt-dataset-api
page_type: API与文档
source: https://doc.fastgpt.cn/zh-CN/openapi/dataset
source_type: 官方文档
---

# FastGPT知识库OpenAPI接口的参数说明与调用示例

## 接口概述
FastGPT知识库OpenAPI涵盖训练订单创建、知识库的增删查改等操作，所有接口需通过`Authorization: Bearer {{apikey}}`头携带认证信息，默认服务端口为3000，接口路径分为`/api/core/dataset/`和`/api/support/wallet/usage/`两类。

## 快速调用步骤
1.  创建训练订单：使用以下最小配置请求，替换`{{apikey}}`和`datasetId`为实际值，响应将返回用于账单聚合的`billId`：
```curl
curl --location --request POST http://localhost:3000/api/support/wallet/usage/createTrainingUsage \
--header Authorization: Bearer {{apikey}} \
--header Content-Type: application/json \
--data-raw "{\"datasetId\": \"你的知识库ID\", \"name\": \"自定义训练订单\"}"
```
2.  创建知识库：使用以下最小配置请求，仅需填写必填的`name`参数，其余参数将使用系统默认配置：
```curl
curl --location --request POST http://localhost:3000/api/core/dataset/create \
--header Authorization: Bearer {{apikey}} \
--header Content-Type: application/json \
--data-raw "{\"name\": \"测试知识库\"}"
```
响应将返回新建知识库的唯一ID。

## 通用参数说明
通用入参中，`datasetId`为必填的知识库ID，`trainingType`支持`chunk`（按文本长度分割）和`qa`（问答对提取）两种模式。`customPdfParse`默认关闭，设为`true`可开启PDF增强解析。`vectorModel`、`agentModel`、`vlmModel`建议留空以使用系统默认配置。`autoIndexes`和`imageIndex`仅商业版支持，分别用于自动生成索引和图片索引。此外，创建知识库时`parentId`可设为`null`或不传以使用根目录，`type`可选`dataset`或`folder`，默认创建普通知识库。其他接口如获取知识库列表、详情、删除等，需对应传入`id`或`parentId`参数，具体可参考官方文档的对应示例。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/openapi/dataset)
