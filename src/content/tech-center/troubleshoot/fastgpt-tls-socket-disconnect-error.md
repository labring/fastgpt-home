---
title: 解决FastGPT中Client network socket disconnected TLS连接报错问题
slug: /zh/troubleshoot/fastgpt-tls-socket-disconnect-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/366
source_type: GitHub issue
---

# 解决FastGPT中Client network socket disconnected TLS连接报错问题

## 现象
FastGPT 容器日志中会出现 `Error: Client network socket disconnected before secure TLS connection was established` 报错，同时伴随 `【索引】任务完成` 日志，最终触发 `[ERROR]: 2023-09-29 09:16:15: 生成 QA 错误` 的提示。报错上下文包含请求目标地址为 `https://api.aiproxy.io/v1/chat/completions`，使用 Bearer 类型 API 密钥，请求模型为 `gpt-3.5-turbo-16k`，请求参数中 `stream` 设为 `false` 等内容。

## 可能原因
该报错源于 TLS 连接建立前客户端网络套接字断开，可能的触发因素包括目标接口地址无法正常访问、网络连接波动中断、API 密钥配置异常，或网络策略拦截了 TLS 请求。

## 排查步骤
1.  查看 FastGPT 容器的完整报错日志，确认请求的目标 URL、使用的 API 密钥等上下文信息，本次报错的目标地址为 `https://api.aiproxy.io/v1/chat/completions`。
2.  在部署环境中测试连通性，可通过 curl 命令执行 `curl -H "Authorization: Bearer 你的API密钥" https://api.aiproxy.io/v1/chat/completions`，验证是否可以正常请求目标接口。
3.  检查配置的 API 密钥是否有效，确认密钥拥有对应模型的调用权限，且未过期或被禁用。
4.  检查部署环境的防火墙、网络策略是否允许出站 TLS 连接到目标地址的 443 端口。
5.  确认 FastGPT 配置中的 API 地址与实际可用的接口地址一致，无拼写错误。

## 解决与验证
根据排查结果对应处理：
- 若目标地址无法访问，调整网络配置或更换为可用的 API 接口地址。
- 若 API 密钥无效，重新生成并配置正确的 API 密钥。
- 若网络策略拦截请求，调整防火墙或代理规则放行对应出站请求。
验证方式为重新触发 FastGPT 的 QA 生成任务，查看容器日志是否不再出现该 TLS 连接报错，且任务成功完成 QA 生成。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/366)
