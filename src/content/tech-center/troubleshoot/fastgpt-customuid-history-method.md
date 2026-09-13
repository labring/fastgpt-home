---
title: FastGPT使用customUid区分用户并查询对话记录的方法
slug: /zh/troubleshoot/fastgpt-customuid-history-method
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3569
source_type: GitHub issue
---

# FastGPT使用customUid区分用户并查询对话记录的方法

## 现象
外部API调用FastGPT时，需要通过自定义标识区分调用用户，且需根据该标识查询对应用户的历史对话记录。使用官方SDK时，请求结构体无对应参数，无法直接传入自定义标识。

## 可能原因
FastGPT官方文档暂未更新相关配置说明，且部分官方SDK的请求结构体未包含customUid参数，导致无法直接通过SDK传入自定义用户标识。

## 排查步骤
1. 确认需传入的自定义用户标识参数为customUid，需将其添加至API调用的请求体中。
2. 若使用官方SDK，检查SDK请求结构体是否包含customUid参数，若缺失则调整调用方式。
3. 需按实际环境确认查询对话记录的具体接口及参数规则。

## 解决与验证
1. 外部API调用时，在请求体中传入customUid参数，即可将该标识记录至对话历史中。
2. 若使用官方SDK，因部分SDK的请求结构体未包含customUid参数，可直接构造HTTP请求传入该参数，或使用user参数替代，具体适配规则需按实际环境确认。
3. 关于根据customUid查询对话记录列表，当前官方文档暂未更新相关说明，需按实际环境确认具体查询方式。

> 来源: [FastGPT GitHub issue #3569](https://github.com/labring/FastGPT/issues/3569)
