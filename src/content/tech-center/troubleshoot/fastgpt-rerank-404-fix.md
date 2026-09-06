---
title: 解决FastGPT中重排模型配置后返回404且无法启用的问题
slug: /zh/troubleshoot/fastgpt-rerank-404-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1578
source_type: GitHub issue
---

# 解决FastGPT中重排模型配置后返回404且无法启用的问题

## 现象
使用Docker启动bge-rerank-v2-m3模型后，在OneAPI中配置该重排模型，调用时返回404错误。同时无法在AI能力组件中找到重排模型相关配置项。

## 可能原因
重排模型无法通过OneAPI接入，需直接接入FastGPT平台。此外可能存在配置路径错误、部署参数未正确匹配的情况。

## 排查步骤
1.  确认重排模型的接入方式，无需通过OneAPI配置，直接在本地或服务器部署。
2.  执行Docker命令启动重排模型：sudo docker run -d --name reranker -p 6006:6006 -e ACCESS_TOKEN=YOUR_API_KEY --gpus all registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1。需按实际环境调整相关参数。
3.  检查FastGPT的配置文件config.json，确认是否已添加reRankModels配置项。
4.  核对配置项中的requestUrl、requestAuth等参数是否与部署的模型参数匹配。

## 解决与验证
按照上述Docker命令启动重排模型后，修改FastGPT的config.json文件，添加reRankModels配置项，示例如下：
```json
"reRankModels": [
{
"model": "bge-reranker-base",
"name": "检索重排-base",
"charsPointsPrice": 0,
"requestUrl": "http://192.168.1.100:6006/v1/rerank",
"requestAuth": "YOUR_API_KEY"
}
]
```
修改完成后重启FastGPT服务，即可在AI能力组件中使用配置的重排模型。

> 来源: [FastGPT GitHub issue #1578](https://github.com/labring/FastGPT/issues/1578)
