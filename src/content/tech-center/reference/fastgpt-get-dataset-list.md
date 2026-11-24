---
title: 使用FastGPT OpenAPI获取知识库列表的详细操作指南
slug: /zh/reference/fastgpt-get-dataset-list
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# 使用FastGPT OpenAPI获取知识库列表的详细操作指南

## 结论
通过FastGPT提供的OpenAPI可以获取指定目录下的知识库列表。传入空字符串或null作为parentId时，将返回根目录下的知识库数据。

## 具体怎么做
1. 构造POST请求，接口地址为`http://localhost:3000/api/core/dataset/list?parentId=`
2. 添加请求头：
   - `Authorization: Bearer {你的API密钥}`
   - `Content-Type: application/json`
3. 传入请求体：`{"parentId": ""}` 或 `{"parentId": null}`

完整请求示例：
```curl
curl --location --request POST 'http://localhost:3000/api/core/dataset/list?parentId=' \
--header 'Authorization: Bearer xxxx' \
--header 'Content-Type: application/json' \
--data-raw '{"parentId":""}'
```

参数说明：
| 参数名 | 说明 |
| ---- | ---- |
| parentId | 父级ID，传空字符串或null时获取根目录下的知识库 |

响应返回的data数组包含知识库的`_id`、`name`、`vectorModel`等核心字段。

## 注意事项
1. 必须携带有效的`Authorization` Bearer令牌，否则请求将无法通过验证。
2. `parentId`仅支持传空字符串或`null`，用于获取根目录知识库。
3. 接口运行端口固定为3000，请求路径不可修改。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
