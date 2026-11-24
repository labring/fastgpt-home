---
title: 创建FastGPT知识库训练订单的API使用方法
slug: /zh/reference/create-fastgpt-dataset-training-order
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# 创建FastGPT知识库训练订单的API使用方法

## 结论
该接口用于创建FastGPT知识库的训练订单。调用成功后将返回唯一订单ID，可用于后续知识库数据添加时的账单聚合。

## 具体怎么做
1. 构造POST请求，请求地址为`http://localhost:3000/api/support/wallet/usage/createTrainingUsage`。
2. 设置两个请求头：`Authorization: Bearer {{apikey}}`和`Content-Type: application/json`。
3. 提交JSON格式的请求体，必填字段`datasetId`（填写目标知识库ID），可选字段`name`（自定义订单名称）。
4. 可参考以下curl请求示例：
```bash
curl --location --request POST 'http://localhost:3000/api/support/wallet/usage/createTrainingUsage' \
--header 'Authorization: Bearer {{apikey}}' \
--header 'Content-Type: application/json' \
--data-raw '{"datasetId": "知识库 ID",
"name": "可选，自定义订单名称，例如：文档训练-fastgpt.docx"
}'
```
5. 调用成功后将返回如下响应：
```json
{
"code": 200,
"statusText": "",
"message": "",
"data": "65112ab717c32018f4156361"
}
```

## 注意事项
1. 需使用有效的API密钥替换Authorization请求头中的`{{apikey}}`占位符。
2. 请求体中的`datasetId`为必填参数，未提供将无法创建训练订单。
3. 响应返回的`data`字段为订单ID，仅用于账单聚合场景。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
