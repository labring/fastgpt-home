---
title: 解决FastGPT接口报错core.dataset.error.Data not found问题
slug: /zh/troubleshoot/fastgpt-data-found-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2487
source_type: GitHub issue
---

# 解决FastGPT接口报错core.dataset.error.Data not found问题

## 现象
调用FastGPT相关接口时，返回固定格式的报错信息：`{"code": 500, "statusText": "", "message": "core.dataset.error.Data not found", "data": null}`。使用更新数据的CURL请求时，也会触发该报错，且无额外的状态说明文本。

## 可能原因
一是部署的FastGPT版本过旧，旧版本缺少或不兼容对应openapi接口；二是使用的接口文档与部署版本不匹配，旧版接口字段未完成适配。部分离线部署场景下，也可能因环境差异触发该报错，例如3.8版本的离线部署场景中，该报错较为常见。

## 排查步骤
1. 记录当前FastGPT的部署版本号。
2. 核对当前使用的接口文档与部署版本的兼容性，优先参考对应版本的官方文档或源码字段进行比对。
3. 检查接口请求参数是否符合当前部署版本的要求。
4. 确认部署环境是否存在资源或网络限制，需按实际环境进一步排查。

## 解决与验证
若部署版本过旧，升级FastGPT至支持对应接口的版本。核对接口文档与部署版本，使用对应版本的字段发起接口请求。重新调用接口后，确认报错信息不再出现，返回结果符合预期。

> 来源: [FastGPT GitHub issue #2487](https://github.com/labring/FastGPT/issues/2487)
