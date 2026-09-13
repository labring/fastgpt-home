---
title: 解决FastGPT调用重排模型出现NoneType类型len()错误的问题
slug: /zh/troubleshoot/fastgpt-rerank-nonetype-len-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2881
source_type: GitHub issue
---

# 解决FastGPT调用重排模型出现NoneType类型len()错误的问题

## 现象
FastGPT版本为v4.6.7，使用官网镜像registry.cn-hangzhou.aliyunccs.com/fastgpt/bge-rerank-base:v0.1作为重排模型。单独使用curl调用重排接口可正常返回结果，返回状态码为200 OK。在知识库中使用重排功能时，前端页面显示正常，但重排容器的日志中出现报错`object of type 'NoneType' has no len()`，接口返回状态码仍为200 OK。

## 可能原因
重排模型容器执行len()操作时触发报错，说明容器接收到的请求中存在None类型的参数。结合场景推测，大概率是FastGPT在转发重排请求时，传递的query或documents参数存在空值或未正确传递，导致重排模型无法正常处理。

## 排查步骤
1.  核对FastGPT的重排模型配置：打开config.json文件，检查reRankModels数组中对应配置的requestUrl、requestAuth参数是否与实际部署的重排服务地址、访问密钥一致。
2.  直接测试重排服务：使用curl命令复制issue中提供的测试命令，携带相同的Authorization头和请求体调用重排接口，确认重排服务本身可正常响应。
3.  查看FastGPT转发日志：查看FastGPT的运行日志，确认其转发至重排服务的请求中，query和documents字段是否存在空值或None类型。
4.  核对请求体格式：确认FastGPT发送的重排请求体格式符合重排服务要求，包含合法的query和documents字段。

## 解决与验证
若排查发现是FastGPT转发的参数存在空值，需修复FastGPT中调用重排接口的逻辑，确保在发起请求前query和documents参数均为有效非空值。若为配置参数错误，需修正config.json中的requestUrl或requestAuth配置。修正完成后，重新在知识库中使用重排功能，查看重排容器日志是否不再出现`object of type 'NoneType' has no len()`报错，同时确认前端显示正常且重排结果符合预期。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2881)
