---
title: 解决FastGPT对接第三方API代理服务提示Not Found的问题
slug: /zh/troubleshoot/fastgpt-third-party-api-not-found
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/373
source_type: GitHub issue
---

# 解决FastGPT对接第三方API代理服务提示Not Found的问题

## 现象
本地Docker部署FastGPT，使用原生OpenAI地址和密钥可正常对话。本地部署one-api作为第三方API代理服务后，通过postman或notebook直接访问代理地址`http://127.0.0.1:3000/v1/chat/completions`可正常对话。但在FastGPT的docker-compose.yml中替换`OPENAI_BASE_URL`和`CHAT_API_KEY`为代理服务的对应配置后，发起聊天时提示错误“Not Found”。

## 可能原因
1. 部署FastGPT的Docker容器的本地回环地址与宿主机器隔离，无法通过`127.0.0.1`访问宿主机器上的第三方API代理服务。
2. 配置的`OPENAI_BASE_URL`路径格式可能导致API请求路径拼接出现错误。
3. 未正确匹配第三方API代理服务的接口路径规范。

## 排查步骤
1. 在宿主机器上使用postman或notebook访问第三方API代理地址`http://127.0.0.1:3000/v1/chat/completions`，确认服务可正常响应对话请求。
2. 进入FastGPT运行的Docker容器内部，执行`curl http://127.0.0.1:3000/v1/chat/completions`命令，确认容器内是否可以访问该代理服务。
3. 检查docker-compose.yml中的`OPENAI_BASE_URL`配置项，确认格式为`http://[服务地址]:[端口]/v1`，无多余或缺失的路径片段。
4. 核对`CHAT_API_KEY`配置是否与第三方API代理服务生成的令牌完全一致。

## 解决与验证
若排查发现是容器网络隔离导致无法访问宿主机器的代理服务，需将docker-compose.yml中的`OPENAI_BASE_URL`替换为宿主机器的局域网IP地址，例如`http://192.168.1.100:3000/v1`（需替换为实际宿主机器IP）。修改配置后重启FastGPT容器，再次发起聊天测试。若不再提示“Not Found”错误且能正常获取对话结果，则问题解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/373)
