---
title: FastGPT中CHAT_TITLE_MODEL环境变量的配置说明
slug: /zh/glossary/chat-title-model-env-var
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/dev
source_type: 官方文档
---

# FastGPT中CHAT_TITLE_MODEL环境变量的配置说明

## 一句话定义
CHAT_TITLE_MODEL是FastGPT用于自动生成对话标题的环境变量。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
需在fastgpt和fastgpt-pro的部署环境中配置该变量，示例配置为`CHAT_TITLE_MODEL=deepseek-v4-flash`。若启用Agent Sandbox，还需额外配置两个环境变量：
1. AGENT_SANDBOX_PROXY_SECRET：需使用32位以上的随机密钥，用于与fastgpt-agent-sandbox-proxy通信。
2. AGENT_SANDBOX_PROXY_URL：浏览器可访问的agent-sandbox-proxy WebSocket地址，通过HTTPS域名代理时需使用wss://协议，示例为`ws://{{host}}:3006`。
完整示例配置如下：
```shell
CHAT_TITLE_MODEL=deepseek-v4-flash
INVOKE_TOKEN_SECRET=32 位以上密钥，反向调用接口 jwt 密钥
# 启用Agent Sandbox时添加
AGENT_SANDBOX_PROXY_SECRET=replace_with_32_chars_random_secret
AGENT_SANDBOX_PROXY_URL=ws://{{host}}:3006
```

## 容易搞错的地方
需注意AGENT_SANDBOX_PROXY_URL的协议类型，通过HTTPS域名代理时必须使用wss://，不可使用ws://；AGENT_SANDBOX_PROXY_SECRET需满足32位以上的长度要求，无法使用过短的密钥。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41505)

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/dev)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
