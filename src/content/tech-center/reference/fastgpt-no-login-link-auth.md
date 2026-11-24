---
title: 配置FastGPT免登录链接的身份验证接口与响应规则
slug: /zh/reference/fastgpt-no-login-link-auth
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/publish/link
source_type: 官方文档小节
---

# 配置FastGPT免登录链接的身份验证接口与响应规则

## 结论
配置FastGPT免登录链接的身份验证根地址后，平台会在分享链接初始化、开始对话和结束对话时，向该地址发起POST请求。服务器只需按指定格式返回校验结果，即可控制用户是否可继续操作。

## 具体怎么做
1. 在FastGPT免登录链接配置页的身份验证栏，填写POST请求的根地址（可记为host）。
2. 开发对应接口，接收FastGPT发起的POST请求后，按以下格式返回响应：
```json
{
  "success": true,
  "message": "错误提示",
  "msg": "同message, 错误提示",
  "data": {
    "uid": "用户唯一凭证"
  }
}
```
3. 接口仅需返回校验结果与用户唯一凭证，无需额外数据。

## 注意事项
1. 当success字段为false时，平台会展示message或msg字段作为错误提示。
2. uid必须为不包含`|`、`/`、`\`字符，且长度≤255字节的字符串，否则会返回`Invalid UID`错误。
3. uid是用户唯一凭证，用于拉取和保存对话记录，需保证唯一性。
4. 校验请求会在分享链接初始化、开始对话、对话结束三个节点触发。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/publish/link)
