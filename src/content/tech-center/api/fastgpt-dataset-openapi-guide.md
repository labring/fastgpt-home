---
title: FastGPT知识库OpenAPI接口的调用方法与参数配置说明
slug: /zh/api/fastgpt-dataset-openapi-guide
page_type: API与文档
source: https://doc.fastgpt.cn/zh-CN/openapi/dataset
source_type: 官方文档
---

# FastGPT知识库OpenAPI接口的调用方法与参数配置说明

## 接口概述与核心能力
FastGPT知识库OpenAPI用于实现知识库的全流程管理，涵盖训练订单生成、知识库创建/查询/删除、知识库集合配置等核心操作。使用前需提前获取两个关键标识：知识库ID（datasetId）与文件集合ID（collection_id）。所有接口调用需携带Bearer格式的API密钥完成认证，基础请求地址为http://localhost:3000。

## 标准调用流程与示例
以下为可直接执行的调用步骤与示例：
1.  **生成训练订单**：该接口用于创建训练订单，返回的billId可用于后续知识库数据添加的账单聚合。示例请求如下：
```bash
curl --location --request POST http://localhost:3000/api/support/wallet/usage/createTrainingUsage \
--header Authorization: Bearer {{apikey}} \
--header Content-Type: application/json \
--data-raw '{"datasetId": "your_dataset_id", "name": "文档训练-fastgpt.docx"}'
```
成功响应将返回包含billId的结果，示例为`{"code": 200, "data": "65112ab717c32018f4156361"}`。
2.  **创建知识库**：支持创建普通知识库或文件夹，示例请求如下：
```bash
curl --location --request POST http://localhost:3000/api/core/dataset/create \
--header Authorization: Bearer {{authorization}} \
--header Content-Type: application/json \
--data-raw '{"parentId": null, "type": "dataset", "name": "测试", "intro": "介绍", "avatar": "", "vectorModel": "text-embedding-ada-002", "agentModel": "gpt-3.5-turbo-16k", "vlmModel": "gpt-4.1"}'
```
其中name为必填参数，parentId可传null或留空，type可选`dataset`或`folder`，`vectorModel`、`agentModel`、`vlmModel`建议留空以使用系统默认配置。
3.  **查询知识库列表**：可获取指定父级下的知识库，根目录请求需将parentId传空字符串，示例请求如下：
```bash
curl --location --request POST http://localhost:3000/api/core/dataset/list?parentId= \
--header Authorization: Bearer {{authorization}} \
--data-raw '{"parentId": ""}'
```

## 易错点与边界说明
使用过程中需注意以下要点：其一，创建知识库时name字段为必填项，未填写将触发参数错误；其二，知识库集合创建时，datasetId与trainingType为必填参数，trainingType仅支持`chunk`（按文本长度分割）与`qa`（问答对提取）两种模式；其三，`autoIndexes`与`imageIndex`仅商业版支持，非商业环境下调用不会生效；其四，删除、获取知识库详情接口需传入正确的知识库ID，否则无法返回有效数据；其五，所有接口的认证凭证需正确携带，否则将返回认证失败响应。此外，删除知识库成功后将返回`{"code": 200, "data": null}`的响应，获取知识库详情的接口需通过GET请求携带id参数。

> 来源：https://doc.fastgpt.cn/zh-CN/openapi/dataset
