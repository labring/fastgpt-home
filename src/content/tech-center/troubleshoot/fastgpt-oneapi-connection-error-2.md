---
title: 解决FastGPT通过One API接入模型时的网络连接失败问题
slug: /zh/troubleshoot/fastgpt-oneapi-connection-error-2
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/664
source_type: GitHub issue
---

# 解决FastGPT通过One API接入模型时的网络连接失败问题

## 现象
用户在FastGPT中通过One API接入第三方模型时，配置文件修改为`OPENAI_BASE_URL=http://localhost:13000/v1`并添加令牌后，发起对话始终显示网络无法连接。运行日志报错信息为：`[ERROR] 2023-12-27 23:43:12 sse error: Connection error.: {"stack":"Error: Connection error.\n    at tx.makeRequest (/app/projects/app/.next/server/chunks/6031.js:23:79572)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async Object.k [as chatNode] (/app/projects/app/.next/server/chunks/303.js:92:1025)\n    at async Q (/app/projects/app/.next/server/chunks/303.js:92:5714)\n    at async Promise.all (index 0)\n    at async Promise.all (index 0)\n    at async T (/app/projects/app/.next/server/chunks/303.js:92:6569)\n    at async l (/app/projects/app/.next/server/pages/api/core/chat/chatTest.js:1:2557)"}

## 可能原因
结合配置与报错信息，可能的触发原因包括：1. 第三方代理服务未正常启动，无法监听配置的13000端口；2. FastGPT运行环境无法访问配置的`http://localhost:13000/v1`地址；3. 配置文件中的`OPENAI_BASE_URL`参数存在格式错误；4. 配置的令牌不符合第三方代理服务的校验要求。

## 排查步骤
1. 检查第三方代理服务的运行状态，确认其已正常启动并监听13000端口。
2. 在FastGPT运行的服务器或容器内部，执行`curl http://localhost:13000/v1`命令，验证本地网络连通性。
3. 核对配置文件中的`OPENAI_BASE_URL`参数，确认其值为`http://localhost:13000/v1`，无拼写或格式错误。
4. 检查配置的令牌是否与第三方代理服务要求的格式一致。

## 解决与验证
1. 启动正常运行的第三方代理服务，确保其监听13000端口。
2. 若FastGPT与第三方代理服务不在同一主机环境，将`OPENAI_BASE_URL`中的`localhost`替换为第三方代理服务的实际IP或域名。
3. 修正`OPENAI_BASE_URL`的格式错误，确保路径正确无误。
4. 重新启动FastGPT服务，发起对话测试，确认不再显示网络无法连接提示，且无对应报错日志。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/664)
