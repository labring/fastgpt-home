---
title: 使用FastGPT OpenAPI更新数据集集合的信息
slug: /zh/api/fastgpt-dataset-collection-update
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# 使用FastGPT OpenAPI更新数据集集合的信息

## 接口概述
该接口用于通过HTTP POST请求更新FastGPT的数据集集合信息，支持两种更新场景。第一种是通过集合ID直接修改目标集合的配置，第二种是通过数据集ID和外部文件ID定位目标集合进行修改。请求的基础地址为`http://localhost:3000/api/core/dataset/collection/update`，需携带`Authorization: Bearer {{authorization}}`认证头与`Content-Type: application/json`请求头。

## 操作配置与请求示例
首先配置请求头，需确保包含有效的认证信息与正确的内容类型。以下为两种更新场景的请求示例：
### 通过集合ID更新集合信息
请求体需携带目标集合的ID，示例如下：
```bash
curl --location --request POST 'http://localhost:3000/api/core/dataset/collection/update' \
--header 'Authorization: Bearer {{authorization}}' \
--header 'Content-Type: application/json' \
--data-raw '{
"id":"65abcfab9d1448617cba5f0d",
"parentId": null,
"name": "测2222试",
"tags": ["tag1", "tag2"],
"forbid": false,
"createTime": "2024-01-01T00:00:00.000Z"
}'
```
### 通过外部文件ID更新集合信息
仅需将请求体中的`id`替换为`datasetId`与`externalFileId`即可，示例如下：
```bash
curl --location --request POST 'http://localhost:3000/api/core/dataset/collection/update' \
--header 'Authorization: Bearer {{authorization}}' \
--header 'Content-Type: application/json' \
--data-raw '{
"datasetId":"6593e137231a2be9c5603ba7",
"externalFileId":"1111",
"parentId": null,
"name": "测2222试",
"tags": ["tag1", "tag2"],
"forbid": false,
"createTime": "2024-01-01T00:00:00.000Z"
}'
```
可修改的参数说明如下：
- `id`：目标集合的ID，仅在通过集合ID更新时使用
- `datasetId`：所属数据集的ID，配合`externalFileId`定位目标集合
- `externalFileId`：外部文件ID，配合`datasetId`定位目标集合
- `parentId`：修改集合的父级ID，为可选参数
- `name`：修改集合的名称，为可选参数
- `tags`：修改集合的标签列表，为可选参数
- `forbid`：修改集合的禁用状态，为可选参数
- `createTime`：修改集合的创建时间，为可选参数

## 响应结果说明
成功调用接口后，将返回标准JSON格式的响应，示例如下：
```json
{
"code" : 200 ,
"statusText" : "" ,
"message" : "" ,
"data" : null
}
```
当`code`字段值为200时，表示集合信息更新成功，其余字段无额外返回内容。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
