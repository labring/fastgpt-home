---
title: FastGPT SSO标准接口获取用户信息的具体操作方法
slug: /zh/reference/fastgpt-sso-get-user-info
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/admin/sso
source_type: 官方文档小节
---

# FastGPT SSO标准接口获取用户信息的具体操作方法

## 结论
该接口通过传入code参数完成鉴权，用于获取FastGPT系统内的用户信息。请求需携带指定请求头，成功与失败将返回对应格式的JSON数据。

## 具体怎么做
1. 构造GET请求，URL为`"https://oauth.example/login/oauth/getUserInfo"`，附加`code`查询参数作为鉴权依据。
2. 添加两个请求头：
   - `"Authorization: Bearer your_token_here"`
   - `"Content-Type: application/json"`
3. 发送请求，参考完整请求示例：`curl -X GET "https://oauth.example/login/oauth/getUserInfo?code=xxxxxx" -H "Authorization: Bearer your_token_here" -H "Content-Type: application/json"`
4. 解析返回的JSON结果。
成功响应包含`success`（值为true）、`message`（空字符串）、`username`、`avatar`、`contact`、可选的`memberName`；失败响应包含`success`（值为false）、`message`（具体错误信息），其余字段为空。

## 注意事项
1. 必须传入有效的`code`参数，否则将返回失败结果。
2. `Authorization`请求头需严格遵循`"Bearer 后跟有效token"`的格式，格式错误会导致鉴权失败。
3. `memberName`为非必填字段，成功响应中可能不包含该字段。
4. 失败响应的`message`字段会返回具体错误信息，可用于排查问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/admin/sso)
