---
title: 使用FastGPT OpenAPI删除指定知识库的操作说明
slug: /zh/api/delete-fastgpt-dataset-api
page_type: API
source: https://doc.fastgpt.cn/zh-CN/openapi/dataset
source_type: 官方文档
---

# 使用FastGPT OpenAPI删除指定知识库的操作说明

本接口用于通过FastGPT官方OpenAPI执行知识库删除操作，仅支持DELETE请求方式，调用时需携带有效的Bearer格式授权令牌完成身份验证，用于校验调用权限。请求的固定接口地址为`http://localhost:3000/api/core/dataset/delete`，需通过URL查询参数传入待删除知识库的ID。

## 请求参数与调用示例
请求需包含两类参数，具体说明如下：
| 参数位置 | 参数名 | 说明 |
| ---- | ---- | ---- |
| URL查询参数 | id | 待删除知识库的唯一标识ID |
| 请求头 | Authorization | 格式为`Bearer {{authorization}}`，其中`{{authorization}}`需替换为实际获取的授权令牌 |

完整的调用请求示例如下：
```bash
curl --location --request DELETE 'http://localhost:3000/api/core/dataset/delete?id=65abc8729d1448617cba5df6' \
--header 'Authorization: Bearer {{authorization}}' \
```

## 响应结果说明
调用成功后将返回标准JSON格式的响应数据，示例如下：
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": null
}
```
响应字段说明如下：`code`字段为200时表示删除操作执行成功；`statusText`与`message`字段为空，表示本次操作无额外状态补充说明；`data`字段为null，表示本次删除操作无返回业务数据。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/openapi/dataset)

## 适用性与版本范围

本页适用于官方来源记录的 API 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
