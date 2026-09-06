---
title: FastGPT对接One-API出现Connection error的排查与解决
slug: /zh/troubleshoot/fastgpt-oneapi-connection-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/630
source_type: GitHub issue
---

# FastGPT对接One-API出现Connection error的排查与解决

## 现象
使用Docker部署的FastGPT对接One-API时，调用过程中出现Connection error报错。FastGPT的完整错误日志显示：`[ERROR] 2023-12-20 08:09:58 sse error: Connection error.: {"stack":"Error: Connection error.\n    at tx.makeRequest (/app/projects/app/.next/server/chunks/5092.js:23:79572)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async Object.k [as chatNode] (/app/projects/app/.next/server/chunks/7050.js:90:1025)\n    at async M (/app/projects/app/.next/server/chunks/7050.js:90:5284)\n    at async Promise.all (index 0)\n    at async Promise.all (index 0)\n    at async b (/app/projects/app/.next/server/chunks/7050.js:90:6369)\n    at async /app/projects/app/.next/server/chunks/1282.js:1:3122"}`，且One-API无对应报错日志。

## 可能原因
结合部署场景与报错信息，可能的原因包括：
1. FastGPT容器与One-API容器未处于同一Docker网络，无法互相通信；
2. 配置的One-API访问地址有误，例如使用了容器内部的localhost或错误的端口号；
3. 服务器的防火墙或安全组规则限制了容器间的网络通信。

## 排查步骤
1. 执行`docker ps`命令，确认FastGPT与One-API的容器均处于正常运行状态；
2. 检查FastGPT后台配置的One-API访问地址，确保使用的是正确的主机地址与端口，避免在Docker环境中使用localhost作为访问地址；
3. 进入FastGPT容器内部，执行`ping [One-API容器的IP或容器名]`或`curl [One-API的访问地址]`命令，测试两个容器间的网络连通性；
4. 查看服务器的防火墙或安全组配置，确认One-API对应的端口未被阻断；
5. 再次确认FastGPT中配置的One-API Key是否正确，且拥有对应模型的调用权限。

## 解决与验证
根据排查出的具体问题进行对应修复：
1. 若为网络隔离问题，可将FastGPT与One-API容器加入同一自定义Docker网络，使用容器名作为访问地址；
2. 修正错误的One-API访问地址与端口配置；
3. 调整防火墙或安全组规则，开放One-API对应的通信端口。
修复完成后，重新发起调用测试，确认FastGPT不再报Connection error，且One-API可正常接收并处理请求，返回正确的响应结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/630)
