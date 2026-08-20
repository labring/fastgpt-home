---
title: 解决Docker部署FastGPT重复请求模型列表接口的问题
slug: /zh/troubleshoot/docker-fastgpt-repeated-model-request
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6438
source_type: GitHub issue
---

# 解决Docker部署FastGPT重复请求模型列表接口的问题

## 现象
用户使用Docker私有部署FastGPT后，后台日志出现以下异常：1. 多次重复发起`GET /api/core/ai/model/getMyModels?versionKey=3530738b-d4f4-45c9-80d9-fb793247f109`请求，每次均返回304状态码，耗时16-18ms；2. 在调用`POST /api/core/dataset/create`创建数据集成功后，出现接口请求内容被截断的日志，最后一条完整日志为`GET /api/core/ai/model/getMyModels?versionK`。用户表示为前天新部署的Docker版本，不清楚具体版本号。

## 可能原因
结合日志信息，可能的原因包括：1. 前端轮询获取模型列表的逻辑异常，导致重复发起相同的接口请求；2. Docker容器分配的CPU、内存资源不足，引发后端服务临时卡顿，导致接口处理异常或日志截断；3. 日志系统的输出配置存在大小限制，导致长请求内容被截断；4. 接口的`versionKey`参数复用或缓存逻辑存在问题，引发重复请求。

## 排查步骤
1.  打开FastGPT前端的浏览器开发者工具，进入网络请求面板，查看是否存在重复的`/api/core/ai/model/getMyModels`请求，确认是否为前端重复发起请求。
2.  通过`docker stats`命令查看FastGPT容器的CPU、内存占用情况，确认是否存在资源耗尽的情况。
3.  查看完整的后端日志文件（而非终端实时输出），确认接口请求截断是日志输出限制导致，还是存在未捕获的异常中断。
4.  核对`versionKey`参数的生成和传递逻辑，确认是否存在重复使用或未正确更新的情况。
5.  执行`docker restart <fastgpt容器名>`重启容器，观察日志是否恢复正常。

## 解决与验证
针对不同排查结果采取对应措施：若为前端重复请求，调整前端轮询间隔或缓存逻辑，避免重复发起相同接口请求；若为Docker资源不足，调整容器的CPU、内存分配参数后重新部署；若为日志截断，检查容器日志的输出配置并调整大小限制；若为`versionKey`参数问题，确认版本Key的生成规则，确保每次请求使用唯一的版本Key。验证方式：重启容器后，观察日志中不再出现重复的`GET /api/core/ai/model/getMyModels`请求，且所有接口请求的日志内容完整，无截断情况。

> 来源：[FastGPT GitHub Issue #6438](https://github.com/labring/FastGPT/issues/6438)
