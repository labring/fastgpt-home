---
title: 获取FastGPT SSO登录重定向地址的技术速查
slug: /zh/reference/fastgpt-get-sso-redirect-url
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/admin/sso
source_type: 官方文档小节
---

# 获取FastGPT SSO登录重定向地址的技术速查

## 结论
调用指定接口可获取FastGPT SSO登录重定向地址，系统会自动将请求中的`redirect_uri`拼接至该地址的查询参数中。发起请求需携带合法的Bearer令牌完成身份验证。

## 具体怎么做
1. 构造GET请求URL，格式为`https://redict.example/login/oauth/getAuthURL?redirect_uri=xxx&state=xxxx`，其中`redirect_uri`为FastGPT回调地址，`state`为自定义状态参数。
2. 添加两个必填请求头：
   - `Authorization: Bearer your_token_here`，需替换为实际的有效认证令牌
   - `Content-Type: application/json`
3. 发起请求后，从响应结果的`authURL`字段即可获取最终的SSO登录重定向地址。

## 注意事项
1. 响应结果分为成功与失败两种标准格式：
   - 成功响应：`{"success":true,"message":"","authURL":"https://example.com/somepath/login/oauth?redirect_uri=https%3A%2F%2Ffastgpt.cn%2Flogin%2Fprovider%0A"}`
   - 失败响应：`{"success":false,"message":"错误信息","authURL":""}`
2. 请求中的`redirect_uri`会被自动编码并拼接至返回的`authURL`的查询参数中，无需手动处理编码。
3. 未携带有效Bearer令牌或参数不合法时，会返回失败响应，`message`字段会展示具体的错误内容。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/admin/sso)
