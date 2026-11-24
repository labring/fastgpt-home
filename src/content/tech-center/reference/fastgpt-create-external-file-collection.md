---
title: 使用FastGPT商业版API创建外部文件库集合的方法
slug: /zh/reference/fastgpt-create-external-file-collection
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# 使用FastGPT商业版API创建外部文件库集合的方法

## 结论
这是FastGPT商业版专属API接口，用于通过外部文件链接创建文件库集合。调用该接口成功后，将返回新创建的集合ID与成功插入的文件数量。

## 具体怎么做
1. 配置请求基础信息：请求方法为POST，接口地址为`http://localhost:3000/api/proApi/core/dataset/collection/create/externalFileUrl`。
2. 设置请求头：需携带`Authorization: Bearer {{authorization}}`与`Content-Type: application/json`，可额外添加`User-Agent`头。
3. 填写请求体参数，必填参数包括：
| 参数 | 说明 |
| ---- | ---- |
| externalFileUrl | 文件访问链接，支持临时链接 |
| externalFileId | 外部文件ID |
| datasetId | 目标文件库的ID |
其他可选参数可按需填写，完整请求示例如下：
```bash
curl --location --request POST 'http://localhost:3000/api/proApi/core/dataset/collection/create/externalFileUrl' \
--header 'Authorization: Bearer {{authorization}}' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
--header 'Content-Type: application/json' \
--data-raw '{
"externalFileUrl":"https://image.xxxxx.com/fastgpt-dev/%E6%91%82.pdf",
"externalFileId":"1111",
"createTime": "2024-05-01T00:00:00.000Z",
"filename":"自定义文件名.pdf",
"datasetId":"6642d105a5e9d2b00255b27b",
"parentId": null,
"tags": ["tag1","tag2"],
"trainingType": "chunk",
"chunkSize":512,
"chunkSplitter":"",
"qaPrompt":""
}'
```
调用成功后将返回包含`collectionId`与`insertLen`的响应数据。

## 注意事项
1. 该接口仅支持FastGPT商业版使用。
2. 需替换请求头中的`{{authorization}}`为有效的访问令牌。
3. 响应状态码为200时代表调用成功，`data.collectionId`为新创建的集合ID，`results.insertLen`为成功插入的文件数量。
4. `filename`需携带正确的文件后缀，否则可能出现解析异常。
5. 日期参数`createTime`需符合ISO字符串规范，例如`2024-05-01T00:00:00.000Z`。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
