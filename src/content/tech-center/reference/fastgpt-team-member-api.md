---
title: FastGPT获取团队成员列表的标准接口使用说明
slug: /zh/reference/fastgpt-team-member-api
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/admin/sso
source_type: 官方文档小节
---

# FastGPT获取团队成员列表的标准接口使用说明

## 结论
FastGPT提供标准接口用于获取团队成员列表，适配SSO集成场景。调用该接口可同步获取团队成员的账号、显示名、联系方式等结构化信息。

## 具体怎么做
1. 构造GET请求，目标地址为`https://example.com/user/list`。
2. 添加以下请求头：
   - `Authorization: Bearer your_token_here`：替换`your_token_here`为实际有效的访问令牌
   - `Content-Type: application/json`
3. 发起请求的完整curl示例如下：
```
curl -X GET "https://example.com/user/list" \
-H "Authorization: Bearer your_token_here" \
-H "Content-Type: application/json"
```
请求响应将遵循`UserListResponseListType`格式，包含`success`布尔值、可选报错信息`message`和成员列表`userList`。

## 注意事项
1. 成员的`username`为唯一标识，必须与SSO接口返回的`username`完全一致，且需携带指定前缀，前缀需与SSO接口返回的前缀保持匹配，例如`fastgpt-xxxx`或`sync-aaaaa`。
2. `orgs`字段为成员所属组织ID数组，若成员无所属组织，需传入空数组`[]`。
3. 部分字段为可选：`memberName`为成员显示名，`avatar`为成员头像地址，`contact`可填写邮箱或手机号码，`message`仅在请求失败时返回报错信息。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/admin/sso)
