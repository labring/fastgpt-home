---
title: 解决FastGPT搭配vllm与caddy路由时的请求400报错问题
slug: /zh/troubleshoot/fastgpt-vllm-caddy-400-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/580
source_type: GitHub issue
---

# 解决FastGPT搭配vllm与caddy路由时的请求400报错问题

## 现象
使用vllm模拟GPT并通过Caddy做路由转发时，发送任意聊天请求会先触发一次空的`/v1/chat/completions`请求，vllm返回400错误，后续聊天请求无法正常发送。根据提供的Caddy配置与日志，Caddy针对`/v1/chat/completions`的反向代理规则使用了`rewrite /v1/completions`，实际转发的请求URI为`/v1/completions`，请求方法为POST，后端服务返回状态码400，服务端为uvicorn启动的vllm实例。

## 可能原因
用户的Caddy配置中，将`/v1/chat/completions`请求的反向代理规则设置为`rewrite /v1/completions`，导致转发到vllm的请求路径被修改为`/v1/completions`，与FastGPT发起的原始聊天接口路径不一致。同时聊天接口的请求参数不符合`/v1/completions`接口的校验要求，触发400错误，进而影响后续请求的正常发起。

## 排查步骤
1. 查看当前Caddy的配置文件，核对反向代理规则中的rewrite设置。
2. 查看vllm的启动命令与支持的接口路径，确认允许的请求URI格式。
3. 检查Caddy的请求日志，核对实际转发的请求URI、请求方法与返回的状态码。
4. 核对FastGPT发起的原始请求路径与vllm支持的接口路径是否匹配。

## 解决与验证
调整Caddy的反向代理配置，修正或移除不匹配的rewrite规则，确保转发到vllm的请求路径与接口要求一致。重新加载Caddy配置后，发送聊天请求，查看vllm返回的状态码是否为正常成功状态，确认后续聊天请求可正常发起且无400报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/580)
