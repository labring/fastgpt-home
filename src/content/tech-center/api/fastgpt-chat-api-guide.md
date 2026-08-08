---
title: FastGPT对话接口API的调用方法与参数配置说明
slug: /zh/api/fastgpt-chat-api-guide
page_type: API与文档
source: https://doc.fastgpt.cn/zh-CN/openapi/chat
source_type: 官方文档
---

# FastGPT对话接口API的调用方法与参数配置说明

## 鉴权与基础规则
可在应用详情的路径中获取AppId。鉴权使用APIKey，支持两种方式：调用`chat/completions`时在请求体传入`body.appId`，或通过`Authorization: Bearer apiKey - appId`请求头鉴权（此时无需传递`body.appId`）。AppId的优先级为：`body.appId` > `apiKey - appId` > 旧版apikey关联的appId。部分SDK调用需在BaseUrl添加`v1`路径，若出现404错误可补充`v1`重试。

注意事项：如需通过authProxy代理团队成员身份，需FastGPT v4.15.0及以上版本，且团队所有者创建或编辑key时开启authProxy，代理身份需具备目标应用和会话权限；传入的`model`、`temperature`等参数字段无效，由应用编排决定；接口不会返回实际消耗的Token值，如需计算可设置`detail=true`，手动解析`responseData`中的tokens值。

## 可执行调用示例
以下为基础文本对话的最小配置curl调用示例：
```bash
curl --location --request POST http://localhost:3000/api/v1/chat/completions \
--header Authorization: Bearer fastgpt-xxxxxx \
--header Content-Type: application/json \
--data-raw '{"appId": "your_app_id", "chatId": "my_chatId", "stream": false, "detail": false, "variables": {"uid": "asdfadsfasfd2323", "name": "张三"}, "messages": [{"role": "user", "content": "导演是谁"}]}
```

参数说明：`chatId`为可选参数，不传时不使用FastGPT提供的上下文，完全基于传入的`messages`构建上下文；若传入非空字符串，则使用该chatId加载会话，仅取`messages`最后一项作为用户问题，其余消息会被忽略，需确保chatId唯一且长度小于250。`responseChatItemId`为可选参数，传入后会作为本次对话响应消息的ID存入数据库，需在当前chatId下唯一。`variables`用于替换模块中的`[key]`变量，`messages`结构与GPT接口chat模式一致。若需传递图片或文件资源，需先将资源上传至对象存储获取链接，通过对应格式传入`messages`中。

## 响应格式说明
根据`stream`和`detail`的组合，响应格式有所不同：
1.  `detail=false, stream=false`：返回标准GPT格式的对话结果，包含`id`、`model`、`usage`、`choices`等字段。
2.  `detail=false, stream=true`：以Server-Sent Events格式流式返回，每条数据为`data: { ... }`格式，包含增量的`delta.content`内容。
3.  `detail=true, stream=false`：返回完整的模块响应数据，`responseData`数组包含各模块的执行结果，如检索模块、AI聊天模块的价格、tokens等信息。
4.  `detail=true, stream=true`：通过event字段区分不同类型的流式数据，包含模块状态和完整响应结果。

> 来源：https://doc.fastgpt.cn/zh-CN/openapi/chat
