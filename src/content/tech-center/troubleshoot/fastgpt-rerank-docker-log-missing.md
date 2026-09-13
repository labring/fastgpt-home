---
title: 解决FastGPT中reRank模型Docker日志无显示的问题及排查方法
slug: /zh/troubleshoot/fastgpt-rerank-docker-log-missing
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/734
source_type: GitHub issue
---

# 解决FastGPT中reRank模型Docker日志无显示的问题及排查方法

## 现象
在FastGPT的config.json中成功配置对应参数后，创建应用时reRank模型对应的Docker日志无任何显示。部署环境中，使用One API作为chatglm3本地部署与m3e Docker容器的代理接口，reRank模型部署于本地192.168.7.104的Docker容器中。

## 可能原因
暂无明确预设原因，需结合实际部署环境逐一确认，可能涉及配置参数匹配、网络连通性或代理规则适配等场景。

## 排查步骤
1. 核对FastGPT的config.json中reRank模型的配置参数，确保与实际部署地址192.168.7.104一致。
2. 检查reRank模型对应的Docker容器运行状态，确认容器无启动异常且正常运行。
3. 验证FastGPT服务所在环境与192.168.7.104的网络连通性，确认可正常访问reRank服务端口。
4. 核对One API代理的配置规则，确认未对reRank模型的请求造成拦截或转发异常。

## 解决与验证
需结合排查步骤的结果进行针对性调整。验证方法为：完成调整后重新创建应用，查看reRank模型对应的Docker日志是否产生有效输出。

> 来源: [FastGPT GitHub issue #734](https://github.com/labring/FastGPT/issues/734)
