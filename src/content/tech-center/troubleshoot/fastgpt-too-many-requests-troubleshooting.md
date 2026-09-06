---
title: FastGPT出现‘请求次数太多了，请慢点~’提示的排查与解决
slug: /zh/troubleshoot/fastgpt-too-many-requests-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4
source_type: GitHub issue
---

# FastGPT出现‘请求次数太多了，请慢点~’提示的排查与解决

## 现象
使用FastGPT过程中出现"请求次数太多了，请慢点~"的提示，该提示会阻断API调用功能的正常执行，同时存在Open Api Key的使用场景疑问，部分API调用场景出现异常。

## 可能原因
出现该提示可能与API配置或调用异常相关，OpenAI相关的Too many request错误存在多种细分场景，具体错误类型需结合调用日志确认。同时部分用户对Open Api Key与平台充值的使用逻辑存在混淆，导致配置与调用方式不匹配。

## 排查步骤
1. 检查当前配置的环境变量OPENAIKEY是否正确。
2. 测试API自身可用性，若ChatGPT官方网站可正常登录提问，需进一步排查FastGPT侧的配置逻辑。
3. 区分平台充值与API key的使用场景，明确各自对应的调用规则。

## 解决与验证
1. 若需通过API调用平台功能，需正确配置环境变量OPENAIKEY，该key仅支持调用知识库接口，具体使用规则参考对应官方文档。
2. 若通过平台充值获取服务，无需使用Open Api Key即可使用对应功能。
3. 修复配置或调用问题后，重新发起请求，验证"请求次数太多了，请慢点~"的提示是否消失。

> 来源: [FastGPT GitHub issue #4](https://github.com/labring/FastGPT/issues/4)
