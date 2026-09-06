---
title: 解决FastGPT OpenAPI chat接口缺少异步调用功能的问题
slug: /zh/troubleshoot/fastgpt-openapi-async-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2854
source_type: GitHub issue
---

# 解决FastGPT OpenAPI chat接口缺少异步调用功能的问题

## 现象
使用FastGPT OpenAPI的chat接口时，无法实现异步调用。接口未提供提交异步任务与查询任务执行状态的相关接口，无法适配长执行时间工作流的异步回调场景。在Serverless环境中调用此类接口时，同步等待长耗时任务会导致运行资源占用过高，增加运行成本，无法实现工作流结束后回调通知的业务逻辑。

## 可能原因
当前FastGPT OpenAPI的chat接口仅支持同步调用逻辑，未设计异步任务提交、状态查询的相关接口，无法满足长耗时业务场景的异步处理需求，无法实现任务提交后无需持续等待的业务逻辑。

## 排查步骤
1. 调用FastGPT OpenAPI的chat接口，确认接口仅返回同步响应结果，未附带任务标识ID。
2. 查阅FastGPT OpenAPI官方文档，确认未提供提交异步任务、查询任务执行状态的专属接口。
3. 模拟长耗时调用场景，验证同步等待会导致资源占用时间过长，无法适配Serverless环境的运行要求。

## 解决与验证
目前FastGPT OpenAPI的chat接口暂未内置异步调用支持功能。如需使用异步调用能力，可通过官方渠道提交功能需求，或等待后续版本更新。验证异步调用功能是否可用的方式为：调用接口后获取任务标识ID，并通过对应接口查询任务的执行状态与结果。若接口返回任务ID且存在对应的查询接口，则表示异步调用功能已可用。

> 来源: [FastGPT GitHub issue #2854](https://github.com/labring/FastGPT/issues/2854)
