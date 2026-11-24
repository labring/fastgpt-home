---
title: FastGPT第三方API数据集获取文件树的操作方法
slug: /zh/reference/fastgpt-third-party-api-file-tree
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/dataset/third-party/api_dataset
source_type: 官方文档小节
---

# FastGPT第三方API数据集获取文件树的操作方法

## 结论
本接口用于获取FastGPT第三方API数据集的文件树，通过合法的POST请求即可获取指定目录下的文件与文件夹列表。响应结果包含文件或文件夹的详细元数据信息。

## 具体怎么做
1. 构造POST请求，请求地址为`{{baseURL}}/v1/file/list`。
2. 设置请求头：
   - `Authorization: Bearer {{authorization}}`
   - `Content-Type: application/json`
3. 配置请求体参数（均为可选）：
   - `parentId`：父级id，不传或传`null`时，使用配置的`basePath`作为根目录
   - `searchKey`：检索词，用于过滤目录内容
请求体默认示例为`{"parentId": null, "searchKey": ""}`。
响应为标准JSON格式，包含`success`、`message`和`data`字段，`data`数组内为文件/文件夹元数据。

## 注意事项
1. 未传入`parentId`或传入`null`时，接口默认以配置的`basePath`作为根目录。
2. 请求头的`Authorization`必须携带`Bearer`前缀，格式错误会导致认证失败。
3. `searchKey`为空字符串时，接口返回全量目录内容，不进行检索过滤。
4. 响应的`data`数组元素包含`id`、`parentId`、`type`、`name`、`updateTime`、`createTime`和`hasChild`共7个字段。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/dataset/third-party/api_dataset)
