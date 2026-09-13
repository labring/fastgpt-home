---
title: 介绍FastGPT MCP服务器的配置与调用方法
slug: /zh/glossary/fastgpt-mcp-server-usage
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server
source_type: 官方文档
---

# 介绍FastGPT MCP服务器的配置与调用方法

## 一句话定义
FastGPT MCP服务器是支持MCP协议的应用调用接口，可被兼容客户端调用以执行FastGPT应用的问答与知识库查询逻辑。FastGPT MCP服务身份代理请求头是用于指定请求对应团队成员身份的专属验证参数，包含两种可选配置形式。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
1.  获取MCP服务地址，格式为`https://fastgpt.example.com/api/mcp/app/<MCP_KEY>/mcp`，其中`<MCP_KEY>`为对应应用的专属标识。
2.  配置身份验证请求头，支持两种验证方式：`x-fastgpt-auth-proxy-username`（填写团队成员登录邮箱）或`x-fastgpt-auth-proxy-tmb-id`（填写FastGPT团队成员ID），二选一即可，同时使用两种请求头时，必须指向同一团队成员。`x-fastgpt-auth-proxy-username`推荐使用成员登录邮箱作为参数值，使用非邮箱格式可能不符合推荐配置。
3.  在兼容MCP协议的客户端中，导入JSON格式配置文件，填入服务地址与对应请求头，启用该MCP服务器。支持自定义请求头的MCP客户端，可在配置中新增`headers`字段。标准配置示例如下：
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
使用团队成员ID验证时，仅需将`headers`替换为`{"x-fastgpt-auth-proxy-tmb-id": "<TEAM_MEMBER_ID>"}`。使用Streamable HTTP地址的配置示例与上述标准配置一致，SSE地址使用相同请求头。此外，客户端需切换至Agent模型才能触发MCP服务器调用。

## 容易搞错的地方
1.  身份验证信息必须放在MCP transport请求头中，不可放入工具参数内。
2.  修改SSE服务的请求头后，需断开并重新建立连接；Streamable HTTP服务会逐次读取请求头，无需重新连接。
3.  仅Agent模型支持调用FastGPT MCP服务器，其他模型无法触发调用流程。
4.  若同时使用两种身份请求头，必须指向同一团队成员，否则将导致验证失败。
5.  `x-fastgpt-auth-proxy-username`推荐使用成员登录邮箱作为参数值，使用非邮箱格式可能不符合推荐配置。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/publish/mcp_server)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
