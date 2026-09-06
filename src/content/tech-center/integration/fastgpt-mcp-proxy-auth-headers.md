---
title: 配置FastGPT MCP服务器的身份代理请求头参数与方法
slug: /zh/integration/fastgpt-mcp-proxy-auth-headers
page_type: 集成
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server
source_type: 官方文档
---

# 配置FastGPT MCP服务器的身份代理请求头参数与方法

## 身份代理请求头规范
身份信息需放在MCP transport请求头中，不可放入工具参数。支持两种请求头配置，任选其一即可，同时提供两个请求头时，必须指向同一团队成员。支持的请求头参数如下：
| 请求头名称                          | 值                   | 说明                           |
| :-------------------------------- | :------------------ | :---------------------------- |
| `x-fastgpt-auth-proxy-username` | 团队成员的登录用户名 | 推荐使用，通常为成员的登录邮箱 |
| `x-fastgpt-auth-proxy-tmb-id`   | FastGPT 团队成员 ID  | 适合已经保存团队成员 ID 的系统 |

## 配置代码示例
支持自定义请求头的MCP客户端可在已复制的配置中增加`headers`字段。使用登录用户名作为身份标识的示例配置如下：
```json
{
  "mcpServers": {
    "fastgpt": {
      "url": "https://fastgpt.example.com/api/mcp/app/<MCP_KEY>/mcp",
      "headers": {
        "x-fastgpt-auth-proxy-username": "[REDACTED_PRIVATE_DATA]"
      }
    }
  }
}
```
使用团队成员ID作为身份标识时，需将`headers`字段替换为对应配置：
```json
{
  "x-fastgpt-auth-proxy-tmb-id": "<TEAM_MEMBER_ID>"
}
```
SSE地址使用相同的请求头配置。SSE服务会在建立连接时保存代理身份，修改请求头后需断开并重新连接；Streamable HTTP会逐次读取请求头。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server)

## 适用性与版本范围

本页适用于官方来源记录的 集成 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
