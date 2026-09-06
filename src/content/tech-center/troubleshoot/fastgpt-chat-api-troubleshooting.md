---
title: 解决FastGPT的/api/v1/chat/completions接口调用异常问题
slug: /zh/troubleshoot/fastgpt-chat-api-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4730
source_type: GitHub issue
---

# 解决FastGPT的/api/v1/chat/completions接口调用异常问题

## 现象
使用包含`stream: true`、`customUid: "test"`及指定system、user角色消息内容的curl命令，调用FastGPT的`/api/v1/chat/completions`接口时，未获得预期响应或返回报错信息。

## 可能原因
1. 请求的接口地址与实际部署的FastGPT服务地址不匹配
2. `Authorization`头部的Bearer令牌格式错误或无效
3. 请求体的JSON格式存在语法问题
4. `customUid`、`messages`等参数的格式不符合接口要求
5. 需按实际环境确认其他潜在配置问题

## 排查步骤
1. 检查请求的接口地址是否与部署的FastGPT服务地址一致，确认路径`/api/v1/chat/completions`正确。
2. 验证`Authorization`头部的Bearer令牌值，确保格式和有效性符合要求。
3. 使用JSON校验工具检查请求体的语法，确认无格式错误。
4. 核对`messages`数组中每个对象的`role`和`content`参数，确保格式正确。
5. 确认`stream`参数的取值为布尔类型，`customUid`参数的格式符合接口规范。
6. 查看服务端返回的具体报错信息，需按实际环境确认。

## 解决与验证
根据排查结果修正对应问题，重新发起curl请求。确认接口返回符合预期的流式响应内容。若仍存在异常，需按实际环境进一步确认服务端配置。

> 来源: [FastGPT GitHub issue #4730](https://github.com/labring/FastGPT/issues/4730)
