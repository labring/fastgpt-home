---
title: FastGPT获取组织列表的标准接口使用说明
slug: /zh/reference/fastgpt-get-org-list-api
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/admin/sso
source_type: 官方文档小节
---

# FastGPT获取组织列表的标准接口使用说明

## 结论
本文介绍FastGPT获取组织列表的标准接口调用方式。通过该接口可获取系统内的部门层级数据，返回格式符合预定义的响应规范。

## 具体怎么做
1. 参考以下curl命令构造GET请求：
```bash
curl -X GET "https://example.com/org/list" \
-H "Authorization: Bearer your_token_here" \
-H "Content-Type: application/json"
```
2. 将请求中的`your_token_here`替换为实际的访问令牌。
3. 发送请求后，将收到符合`OrgListResponseType`格式的响应数据。
响应字段详细说明：
- `success`: boolean，标识请求是否成功
- `message`?: string，请求失败时返回报错信息，成功时为空字符串
- `orgList`: 部门对象数组，每个部门包含：
  - `id`: string，部门的唯一标识
  - `name`: string，部门名称
  - `parentId`: string，父部门ID，根部门需设置为空字符串

## 注意事项
1. 系统仅支持单个根部门，若存在多个根部门，需先添加虚拟根部门进行统一处理。
2. 根部门的`parentId`字段必须设置为空字符串，不可填写其他内容。
3. 响应的`message`字段仅在请求失败时返回有效内容，成功请求时该字段为空字符串。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/admin/sso)
