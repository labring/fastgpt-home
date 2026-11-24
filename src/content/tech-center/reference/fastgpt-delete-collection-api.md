---
title: FastGPT 集合删除接口的调用方法与参数说明
slug: /zh/reference/fastgpt-delete-collection-api
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# FastGPT 集合删除接口的调用方法与参数说明

## 结论
通过FastGPT的集合删除接口，可以删除指定的数据集集合。调用该接口后将返回标准的操作响应结果，用于确认删除状态。

## 具体怎么做
1. 构造DELETE请求，请求地址为`http://localhost:3000/api/core/dataset/collection/delete`
2. 设置两个请求头：
   - `Authorization: Bearer fastgpt-`
   - `Content-Type: application/json`
3. 传入JSON格式的请求体，包含必填字段`collectionIds`，值为集合ID的字符串数组，示例请求体为`{"collectionIds": ["65a8cdcb0d70d3de0bf08d0a"]}`
4. 发起请求后，将收到如下格式的成功响应：
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": null
}
```

## 注意事项
- 必须使用DELETE请求方法发起调用
- 请求体必须为合法的JSON格式，且需包含`collectionIds`字段
- 传入的`collectionIds`需为有效的集合ID字符串数组
- 未配置正确的Authorization令牌将无法完成接口鉴权

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
