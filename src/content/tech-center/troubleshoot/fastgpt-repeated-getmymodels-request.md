---
title: 解决FastGPT私有部署中重复调用getMyModels接口的问题
slug: /zh/troubleshoot/fastgpt-repeated-getmymodels-request
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6438
source_type: GitHub issue
---

# 解决FastGPT私有部署中重复调用getMyModels接口的问题

## 现象
Docker部署的FastGPT私有版本日志中，反复打印`GET /api/core/ai/model/getMyModels`请求，接口均返回304状态码，且最后一条请求的参数被截断为`versionK`。在调用`POST /api/core/dataset/create`接口成功返回200状态码后，该重复请求开始出现。用户不清楚具体FastGPT版本号，为两天前新部署的容器版本。

## 可能原因
1.  前端轮询模型列表的逻辑异常，导致无终止地重复发起请求。
2.  请求中的`versionKey`参数不完整，触发前端或后端的校验逻辑，导致反复重试请求。
3.  部署环境的缓存配置异常，导致接口缓存逻辑异常触发重复请求。
部分原因需按实际环境确认，无法通过现有日志直接定位。

## 排查步骤
1.  打开FastGPT前端页面的网络请求面板，查看是否存在重复的`/api/core/ai/model/getMyModels`请求，记录完整的`versionKey`参数值。
2.  查看完整的Docker容器日志，确认是否存在其他接口报错或参数截断的相关信息。
3.  核对FastGPT部署的相关配置文件，检查与模型列表、缓存、轮询相关的配置项。
4.  重启FastGPT容器，观察日志是否仍出现重复的`/api/core/ai/model/getMyModels`请求。

## 解决与验证
若为前端轮询逻辑异常，需根据实际部署的前端配置修改轮询的间隔或终止条件。若为`versionKey`参数不完整，需检查前端代码中该参数的生成逻辑，确保完整传递参数。若为缓存配置异常，需调整部署环境的缓存策略。验证时，重启容器后观察Docker日志，确认`/api/core/ai/model/getMyModels`请求不再重复出现，且其他业务接口调用正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/6438)
