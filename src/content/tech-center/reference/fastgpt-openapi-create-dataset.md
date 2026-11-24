---
title: FastGPT 调用官方OpenAPI创建知识库的完整方法速查
slug: /zh/reference/fastgpt-openapi-create-dataset
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# FastGPT 调用官方OpenAPI创建知识库的完整方法速查

## 结论
使用FastGPT的官方OpenAPI可完成知识库或文件夹的创建操作。调用指定接口并传入符合要求的参数后，将返回新建资源的唯一标识ID。

## 具体怎么做
1.  请求地址：`http://localhost:3000/api/core/dataset/create`，请求方法为POST
2.  请求头需包含：
    - `Authorization: Bearer {{authorization}}`（替换为实际授权令牌）
    - `Content-Type: application/json`
3.  请求体为JSON格式，支持参数如下：
    | 参数名 | 说明 | 可选性 |
    |---|---|---|
    | parentId | 父级ID，用于构建目录结构 | 可选，可传null或不传 |
    | type | 类型，dataset为普通知识库，folder为文件夹 | 可选，默认dataset |
    | name | 知识库名称 | 必填 |
    | intro | 知识库介绍 | 可选 |
    | avatar | 头像地址 | 可选 |
    | vectorModel | 向量模型 | 可选，建议留空使用系统默认 |
    | agentModel | 文本处理模型 | 可选，建议留空使用系统默认 |
    | vlmModel | 图片理解模型 | 可选，建议留空使用系统默认 |
4.  完整请求示例参考：
    ```curl
    curl --location --request POST 'http://localhost:3000/api/core/dataset/create' \
    --header 'Authorization: Bearer {{authorization}}' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "parentId": null,
        "type": "dataset",
        "name":"测试",
        "intro":"介绍",
        "avatar": "",
        "vectorModel": "text-embedding-ada-002",
        "agentModel": "gpt-3.5-turbo-16k",
        "vlmModel": "gpt-4.1"
    }'
    ```
5.  成功响应示例：
    ```json
    {
        "code": 200,
        "statusText": "",
        "message": "",
        "data": "65abc9bd9d1448617cba5e6c"
    }
    ```

## 注意事项
1.  `name`参数为必填项，未传入将无法成功创建知识库。
2.  `vectorModel`、`agentModel`、`vlmModel`建议留空，使用系统默认配置。
3.  成功响应的`data`字段为新建知识库的唯一ID。
4.  若需创建文件夹，可将`type`参数设为`folder`。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
