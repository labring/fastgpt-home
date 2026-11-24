---
title: 使用FastGPT OpenAPI创建网络链接类型的知识库集合
slug: /zh/reference/fastgpt-create-link-collection
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# 使用FastGPT OpenAPI创建网络链接类型的知识库集合

## 结论
调用FastGPT指定的OpenAPI接口，可传入网络链接创建知识库集合。接口会自动抓取目标网页内容并进行文本分割，成功后返回集合相关信息。

## 具体怎么做
1. 构造POST请求，接口地址为`http://localhost:3000/api/core/dataset/collection/create/link`
2. 设置请求头：
   - `Authorization: Bearer {{authorization}}`，其中`{{authorization}}`为用户的访问令牌
   - `Content-Type: application/json`
3. 提交JSON格式的请求体，完整示例如下：
```curl
curl --location --request POST 'http://localhost:3000/api/core/dataset/collection/create/link' \
--header 'Authorization: Bearer {{authorization}}' \
--header 'Content-Type: application/json' \
--data-raw '{
"link":"https://doc.fastgpt.io/guide/getting-started/quick-start",
"datasetId":"6593e137231a2be9c5603ba7",
"parentId": null,
"trainingType": "chunk",
"chunkSettingMode": "auto",
"qaPrompt":"",
"metadata":{
"webPageSelector":".docs-content"
}
}'
```
各参数说明：
| 参数 | 说明 |
| ---- | ---- |
| `"link"` | 目标网络链接 |
| `"datasetId"` | 知识库ID，必填 |
| `"parentId"` | 父级集合ID，默认根目录 |
| `"trainingType"` | 训练类型，固定为`chunk` |
| `"chunkSettingMode"` | 文本分割模式，固定为`auto` |
| `"qaPrompt"` | QA生成提示词，可留空 |
| `"metadata.webPageSelector"` | 网页元素选择器，可选 |

## 注意事项
1. `"datasetId"`必须为已存在的知识库ID，否则接口会返回错误。
2. `"metadata.webPageSelector"`为可选项，不填则抓取整个网页文本。
3. 请求需携带有效的Authorization令牌，否则会验证失败。
4. 成功调用后返回状态码200，响应数据包含`collectionId`与`insertLen`（成功插入的文本条数）。
5. 请求体需符合JSON语法规范，避免格式错误。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
