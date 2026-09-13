---
title: FastGPT 4.7版本开启结果重排后未生效的排障指南
slug: /zh/troubleshoot/fastgpt-rerank-working-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1111
source_type: GitHub issue
---

# FastGPT 4.7版本开启结果重排后未生效的排障指南

## 现象
升级至FastGPT 4.7版本后，在设置中开启结果重排功能，但实际对话过程中重排未生效。部分用户部署重排服务时，接口调用返回200 OK，但前端显示重排未生效；重排服务运行时会输出TypedStorage相关的Python弃用警告日志。

## 可能原因
存在多层数据转发导致重排服务调用参数丢失的情况；重排服务镜像版本未更新至适配4.7版本的版本；依赖组件版本不匹配引发运行警告，干扰重排逻辑执行。

## 排查步骤
1. 确认重排服务使用的镜像版本，更新至registry.cn-hangzhou.aliyuncs.com/fastgpt/rerank:v0.2
2. 查看重排服务容器日志，检查是否有POST /v1/rerank请求的200 OK返回记录，同时确认是否存在TypedStorage相关的Python警告
3. 核对FastGPT主服务与重排服务的配置文件，确保二者配置匹配
4. 检查请求链路是否存在多层数据转发，确认重排服务的调用参数未被过滤或修改

## 解决与验证
更新重排服务镜像至registry.cn-hangzhou.aliyuncs.com/fastgpt/rerank:v0.2。若使用源码部署，需根据实际环境修改适配代码以解决TypedStorage相关警告及链路问题。验证时，在FastGPT设置中开启结果重排功能，发起对话测试，确认对话结果已按重排逻辑排序，同时重排服务日志无异常报错。

> 来源: [FastGPT GitHub issue #1111](https://github.com/labring/FastGPT/issues/1111)
