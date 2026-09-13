---
title: 解决FastGPT中bge-rerank容器启动后报错重启的问题
slug: /zh/troubleshoot/fastgpt-rerank-container-error-restart
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3506
source_type: GitHub issue
---

# 解决FastGPT中bge-rerank容器启动后报错重启的问题

## 现象
FastGPT 4.8.5版本通过docker部署，搭配docker部署的bge-rerank-base:v0.1重排模型容器。配置`config.local.json`中的`reRankModels`参数后，勾选重排发起请求时，reranker容器会在收到请求后报错并重启。容器日志包含`Bus error (core dumped)`，同时存在启动日志：`INFO:     Started server process [7]`、`INFO:     Waiting for application startup.`、`INFO:     Application startup complete.`、`INFO:     Uvicorn running on http://0.0.0.0:6006 (Press CTRL+C to quit)`。

## 可能原因
根据日志`Bus error (core dumped)`与容器重启现象，可能的关联因素包括GPU资源调用异常、网络连通问题、配置参数不匹配等，需按实际环境确认。

## 排查步骤
1.  检查重排模型容器与FastGPT是否处于同一docker网络，确认网络名称与配置文件中`requestUrl`的容器名匹配，本次场景中使用的网络为`fastgpt_fastgpt`，容器名为`reranker`。
2.  查看重排模型容器的完整启动日志，确认`Bus error (core dumped)`出现的时间点，排查是启动阶段还是收到请求后触发报错。
3.  核对`config.local.json`中的`reRankModels`参数，确认`model`、`requestUrl`、`requestAuth`与实际部署的容器信息一致，本次场景中配置的`requestUrl`为`http://reranker:6006/v1/rerank`，`requestAuth`为`sk-fastgpt`。
4.  单独启动重排模型容器，测试是否能正常响应请求，验证容器本身是否存在启动或运行异常。

## 解决与验证
1.  调整重排模型容器的启动参数，确保与FastGPT处于同一docker网络，本次场景中使用`--network fastgpt_fastgpt`参数启动容器。
2.  核对并修正配置文件中的重排模型参数，确保`requestUrl`的容器名、端口与实际部署一致，`requestAuth`与容器启动时设置的`ACCESS_TOKEN`匹配，本次场景中容器启动参数为`-e ACCESS_TOKEN=sk-fastgpt`，配置文件中`requestAuth`为`sk-fastgpt`。
3.  重启FastGPT服务与重排模型容器，发起重排请求，验证容器不再报错重启，且请求能正常返回结果。
4.  查看重排模型容器的日志，确认无`Bus error (core dumped)`报错，服务稳定运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3506)
