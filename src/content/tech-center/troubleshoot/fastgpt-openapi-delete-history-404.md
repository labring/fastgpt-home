---
title: 解决FastGPT OpenAPI删除历史记录接口返回404的问题
slug: /zh/troubleshoot/fastgpt-openapi-delete-history-404
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6151
source_type: GitHub issue
---

# 解决FastGPT OpenAPI删除历史记录接口返回404的问题

## 现象
用户使用FastGPT v4.14.4私有部署版本，参考官方OpenAPI文档中的删除历史记录接口说明开发功能，调用文档指定的接口地址时返回404状态码，系统提示接口地址错误。用户上传了调用日志与返回结果截图，显示原接口调用失败，替换为`/api/core/chat/delHistory`后调用成功。

## 可能原因
该问题源于官方公开的OpenAPI文档中，删除历史记录的接口路径配置与FastGPT后端实际暴露的路由不匹配，导致请求无法被正确路由到对应的处理逻辑，最终返回404错误。

## 排查步骤
1.  确认自身API Key可用，且已完成接口调用的身份认证配置。
2.  按照官方OpenAPI文档给出的接口地址，构造删除历史记录的请求，发起调用后收到404 Not Found响应。
3.  查阅FastGPT后端实际暴露的接口路由，发现正确的删除历史记录接口路径为`/api/core/chat/delHistory`。
4.  使用正确的接口路径重新发起请求，确认调用成功，无404报错。

## 解决与验证
将调用的接口地址修改为`/api/core/chat/delHistory`，即可正常完成历史记录删除操作。完成修改后，可再次发起删除历史记录的请求，验证接口是否正常返回成功状态。同时建议对文档中其他OpenAPI接口的路径进行逐一校验，排查是否存在同类的接口地址配置错误问题。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/6151)
