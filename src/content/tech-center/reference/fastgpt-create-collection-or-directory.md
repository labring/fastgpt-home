---
title: FastGPT通过OpenAPI创建空集合或目录的操作指引
slug: /zh/reference/fastgpt-create-collection-or-directory
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# FastGPT通过OpenAPI创建空集合或目录的操作指引

## 结论
通过指定的OpenAPI接口，可以创建FastGPT的空集合或目录。调用成功后会返回新建集合的唯一ID。

## 具体怎么做
1. 准备有效的API访问令牌，替换请求头中的`{{authorization}}`为实际令牌。
2. 构造POST请求，目标地址为`http://localhost:3000/api/core/dataset/collection/create`。
3. 设置两个请求头：`Authorization: Bearer {{authorization}}`和`Content-Type: application/json`。
4. 传入符合格式的JSON请求体，参数说明如下：
| 参数名 | 说明 | 是否必填 |
| ---- | ---- | ---- |
| datasetId | 知识库ID | 是 |
| parentId | 父级ID，默认创建在根目录 | 否 |
| name | 集合名称 | 是 |
| type | 可选值：folder（文件夹）、virtual（虚拟集合） | 是 |
| metadata | 元数据，暂未生效 | 否 |

完整请求示例：
```bash
curl --location --request POST 'http://localhost:3000/api/core/dataset/collection/create' \
--header 'Authorization: Bearer {{authorization}}' \
--header 'Content-Type: application/json' \
--data-raw '{
"datasetId":"6593e137231a2be9c5603ba7",
"parentId": null,
"name":"测试",
"type":"virtual",
"metadata":{
"test":111
}
}'
```

成功响应示例：
```json
{
"code" : 200 ,
"statusText" : "" ,
"message" : "" ,
"data" : "65abcd009d1448617cba5ee1"
}
```

## 注意事项
1. 必须填写必填参数datasetId和name，否则请求会失败。
2. type参数仅支持folder和virtual两个取值，传入其他值会触发错误。
3. parentId留空时默认创建在根目录，若需指定父目录需传入已存在的父目录ID。
4. metadata字段当前无实际业务作用，仅可用于存储自定义元数据。
5. 请求失败时，会返回非200的code值，错误详情会在message字段中体现。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
