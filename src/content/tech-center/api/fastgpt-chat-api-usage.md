---
title: FastGPT OpenAPI对话接口的调用配置与使用规范
slug: /zh/api/fastgpt-chat-api-usage
page_type: API与文档
source: https://doc.fastgpt.cn/zh-CN/openapi/chat
source_type: 官方文档
---

# FastGPT OpenAPI对话接口的调用配置与使用规范

## 接口基础说明
可在应用详情的路径中获取AppId，该接口为FastGPT OpenAPI对话接口，用于发起会话交互。鉴权需使用APIKey，支持两种方式：一是在请求体传入`body.appId`，二是通过`Authorization: Bearer apiKey - appId`头信息（此时无需传递`body.appId`）。`appId`优先级为：`body.appId` > `apiKey - appId` > 旧版apikey关联的appId。
需注意以下边界与易错点：`model`、`temperature`等参数由编排决定，传入后无效；接口不会返回实际消耗Token值，如需统计需设置`detail=true`后手动计算`responseData`内的tokens；若需通过`authProxy`代理团队成员身份，需FastGPT v4.15.0+且团队所有者在创建密钥时开启该功能，且代理身份需具备目标应用和会话权限。

## 调用配置与请求示例
调用前需注意：若出现404错误，可尝试为BaseUrl补充`v1`路径重试。基础请求的完整curl示例如下：
```curl
curl --location --request POST http://localhost:3000/api/v1/chat/completions \
--header Authorization: Bearer fastgpt-xxxxxx \
--header Content-Type: application/json \
--data-raw {
    "appId": "your_app_id",
    "chatId": "my_chatId",
    "stream": false,
    "detail": false,
    "responseChatItemId": "my_responseChatItemId",
    "variables": {"uid": "asdfadsfasfd2323", "name": "张三"},
    "messages": [{"role": "user", "content": "导演是谁"}]
}
```
若需携带图片/文件，需先将资源上传至自有对象存储获取链接，再按如下格式构造请求：
```curl
curl --location --request POST http://localhost:3000/api/v1/chat/completions \
--header Authorization: Bearer fastgpt-xxxxxx \
--header Content-Type: application/json \
--data-raw {
    "appId": "your_app_id",
    "chatId": "abcd",
    "stream": false,
    "messages": [
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "导演是谁"},
                {"type": "image_url", "image_url": {"url": "图片链接"}},
                {"type": "file_url", "name": "文件名", "url": "文档链接，支持txt md html word pdf ppt csv excel"}
            ]
        }
    ]
}
```
各核心参数说明：`chatId`为空时不使用内置上下文，仅用传入的`messages`构建上下文；非空时使用该会话ID自动拉取上下文，仅取`messages`最后一条作为用户问题，其余消息会被忽略，需确保`chatId`唯一且长度小于250。`responseChatItemId`可指定本次响应的消息ID，需在当前`chatId`下唯一。`variables`用于替换模块内的`[key]`占位变量。

## 响应格式说明
接口响应分为四种组合场景：`detail=false&stream=false`、`detail=false&stream=true`、`detail=true&stream=false`、`detail=true&stream=true`。非流式非详情模式下，响应结构与GPT接口类似，包含`id`、`model`、`usage`、`choices`等字段；流式模式下会通过`event`区分不同的`data`块，逐段返回内容。开启`detail=true`后，非流式模式下的完整模块响应会存入`responseData`，包含各模块的名称、消耗、模型、tokens等信息。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/openapi/chat)
