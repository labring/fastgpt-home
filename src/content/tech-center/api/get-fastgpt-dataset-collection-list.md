---
title: 获取FastGPT指定知识库集合列表的API调用方法
slug: /zh/api/get-fastgpt-dataset-collection-list
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# 获取FastGPT指定知识库集合列表的API调用方法

该接口用于查询指定FastGPT知识库下的集合列表，请求方式为POST，接口地址为http://localhost:3000/api/core/dataset/collection/listV2。调用时需携带两个请求头：Authorization为Bearer格式的授权令牌，Content-Type为application/json。

### 请求参数说明
请求体需传入以下参数：
- offset：偏移量，用于设置分页查询的起始位置
- pageSize：每页展示的集合数量，最大值为30，为选填参数
- datasetId：目标知识库的ID，为必填参数
- parentId：父级集合ID，用于查询指定父级下的子集合，为选填参数
- searchText：模糊搜索文本，用于匹配集合名称，为选填参数

### 快速调用示例
你可以直接使用以下curl命令发起调用，需将{{authorization}}替换为实际的授权令牌，将datasetId的值替换为目标知识库的实际ID：
```bash
curl --location --request POST 'http://localhost:3000/api/core/dataset/collection/listV2' \
--header 'Authorization: Bearer {{authorization}}' \
--header 'Content-Type: application/json' \
--data-raw '{"offset":0,"pageSize": 10,"datasetId":"6593e137231a2be9c5603ba7","parentId": null,"searchText":""}'
```

### 响应结果说明
当调用成功时，响应的code为200，响应体的data字段包含两个核心内容：list为集合列表数组，total为符合查询条件的集合总数。每个集合对象包含以下字段：_id为集合的唯一标识，parentId为父级集合ID，tmbId为缩略图ID，type为集合类型（如virtual、link），name为集合名称，updateTime为最后更新时间，dataAmount为集合内的数据量，tags为集合关联的标签列表，permission为当前用户的权限信息，包含是否为所有者、是否拥有管理、写入、读取权限等。以下为成功响应的示例：
```json
{"code":200,"statusText":"","message":"","data":{"list":[{"_id":"6593e137231a2be9c5603ba9","parentId":null,"tmbId":"65422be6aa44b7da77729ec9","type":"virtual","name":"手动录入","updateTime":"2099-01-01T00:00:00.000Z","dataAmount":3,"trainingAmount":0,"externalFileId":"1111","tags":["11","测试的"],"forbid":false,"trainingType":"chunk","permission":{"value":4294967295,"isOwner":true,"hasManagePer":true,"hasWritePer":true,"hasReadPer":true}},{"_id":"65abd0ad9d1448617cba6031","parentId":null,"tmbId":"65422be6aa44b7da77729ec9","type":"link","name":"快速上手 | FastGPT","rawLink":"https://doc.fastgpt.io/guide/getting-started/quick-start","updateTime":"2024-01-20T13:54:53.031Z","dataAmount":3,"trainingAmount":0,"externalFileId":"222","tags":["测试的"],"forbid":false,"trainingType":"chunk","permission":{"value":4294967295,"isOwner":true,"hasManagePer":true,"hasWritePer":true,"hasReadPer":true}}],"total":93}}}
```

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
