---
title: 解决FastGPT调用重排序接口时文档数超限的报错问题
slug: /zh/troubleshoot/fastgpt-rerank-document-limit-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1980
source_type: GitHub issue
---

# 解决FastGPT调用重排序接口时文档数超限的报错问题

## 现象
用户在调用FastGPT的/v1/rerank接口时，接口返回HTTP 200状态码，但内部触发报错。日志显示错误信息为`max number of documents is 64`，错误码为336221，同时提示可查看对应服务的文档说明。

## 可能原因
单次调用重排序接口时，提交的待重排序文档数量超过了服务规定的64条上限，导致接口返回超限报错。

## 排查步骤
1. 查看调用/v1/rerank接口时传入的文档列表条目数，确认是否超过64条。
2. 核对系统日志中的错误信息，确认错误码336221与`max number of documents is 64`的提示是否匹配。
3. 查阅对应服务的官方文档，确认文档数量上限的具体规则，需按实际环境确认是否有其他限制条件。

## 解决与验证
将单次调用重排序接口的待重排序文档数量调整为64条以内，即可解决该报错。验证时，重新调用/v1/rerank接口，提交不超过64条的文档，确认不再出现错误码336221的报错，接口可正常返回重排序结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1980)
