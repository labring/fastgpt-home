---
title: FastGPT 数据集单条数据修改API的使用说明
slug: /zh/reference/fastgpt-dataset-single-data-update
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# FastGPT 数据集单条数据修改API的使用说明

## 结论
使用FastGPT的数据集单条数据修改API，可以更新指定数据集数据的问题、回答与自定义索引。调用成功后将返回code为200的响应结果。

## 具体怎么做
首先发起PUT请求，请求地址为`http://localhost:3000/api/core/dataset/data/update`。配置请求头：`Authorization: Bearer {{authorization}}`与`Content-Type: application/json`。请求体需传入JSON格式参数，支持以下字段：
| 参数名 | 必填性 | 说明 |
|--------|--------|------|
| dataId | 是 | 待修改数据的ID |
| q | 否 | 主要数据内容 |
| a | 否 | 辅助数据内容 |
| indexes | 否 | 自定义索引数组，格式参考集合批量添加数据接口 |
完整请求示例参考：
```curl
curl --location --request PUT 'http://localhost:3000/api/core/dataset/data/update' \
--header 'Authorization: Bearer {{authorization}}' \
--header 'Content-Type: application/json' \
--data-raw '{"dataId":"65abd4b29d1448617cba61db","q":"测试111","a":"sss","indexes":[{"dataId":"xxxx","type":"default","text":"默认索引"},{"dataId":"xxx","type":"custom","text":"旧的自定义索引1"},{"type":"custom","text":"新增的自定义索引"}]}'
```
成功响应示例为：
```json
{"code":200,"statusText":"","message":"","data":null}
```

## 注意事项
1. q与a为选填参数，未传入时保留原有数据内容
2. indexes数组为选填，传入已有dataId的索引项将更新该索引，未传入dataId的自定义索引项将被新增
3. 自定义索引的类型参考集合批量添加数据接口的说明

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
