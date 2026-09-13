---
title: 解决FastGPT公有云chat/completions接口调用报错
slug: /zh/troubleshoot/fastgpt-public-cloud-chat-api-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2053
source_type: GitHub issue
---

# 解决FastGPT公有云chat/completions接口调用报错

## 现象
用户在使用FastGPT公有云服务时，调用`https://api.fastgpt.in/api/v1/chat/completions`接口出现报错，同时上传了三张报错截图与该接口正常调用的返回示例截图。用户已确认自身使用的API Key可正常使用。

## 可能原因
由于未获取到具体报错文本，结合接口调用场景，可能的原因包括：
1. 请求参数未符合该接口的必填规则与格式要求
2. FastGPT公有云服务出现临时异常波动
3. 本地网络无法正常连通`api.fastgpt.in`域名

## 排查步骤
1. 核对调用`https://api.fastgpt.in/api/v1/chat/completions`的请求参数，确认包含接口要求的必填字段与正确格式。
2. 检查本地网络是否可以正常访问`api.fastgpt.in`域名，可通过通用网络测试工具验证连通性。
3. 查看接口返回的具体报错信息，结合报错内容进一步定位问题。
4. 确认FastGPT公有云服务的当前状态，可通过重试调用或官方渠道确认。

## 解决与验证
1. 若为请求参数问题，修正参数至符合接口规范后重新发起调用。
2. 若为网络问题，排查本地网络配置或更换网络环境后重试。
3. 若为公有云服务异常，等待服务恢复后再次调用。
4. 调用成功后，对比正常调用的返回示例，确认返回结果符合预期。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2053)
