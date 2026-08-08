---
title: 解决FastGPT私有部署下重排序服务启动报错的问题
slug: /zh/troubleshoot/fastgpt-private-deploy-reranker-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6302
source_type: GitHub issue
---

# 解决FastGPT私有部署下重排序服务启动报错的问题

## 现象
FastGPT 4.14.4私有部署版本中，通过docker compose配置ollama相关容器后，大语言模型（LLM）与嵌入模型服务可正常运行，但重排序（reranker）服务启动失败并抛出报错。

## 可能原因
目前未获取到具体报错文本，可能的原因包括：重排序模型镜像`qllama/bge-reranker-v2-m3`拉取或启动异常；docker compose配置中重排序服务的端口、环境变量与FastGPT配置不匹配；重排序服务启动后未正常监听指定端口，导致FastGPT无法正常连接。具体原因需结合实际报错信息确认。

## 排查步骤
1. 查看docker compose的容器日志，提取重排序服务容器的详细报错信息，定位启动失败的直接原因。
2. 单独启动`qllama/bge-reranker-v2-m3`模型容器，通过接口请求测试其是否可正常对外提供服务。
3. 核对FastGPT配置中重排序服务的地址、端口等参数，确保与docker compose中配置的参数一致。
4. 检查FastGPT所在容器与重排序服务容器的网络连通性，确认可正常访问重排序服务端口。

## 解决与验证
根据排查到的具体问题进行修复：若为镜像拉取失败，可配置镜像加速源或手动拉取目标镜像；若为端口冲突，修改docker compose中的端口映射并同步更新FastGPT的重排序服务配置；若为服务启动参数异常，调整容器的内存、启动命令等参数。修复完成后，在FastGPT的模型管理页面测试重排序服务，确认服务可正常调用且无报错日志。

> 来源：https://github.com/labring/FastGPT/issues/6302
