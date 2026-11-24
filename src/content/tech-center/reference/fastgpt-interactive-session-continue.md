---
title: FastGPT交互节点后发起会话继续工作流的操作方法
slug: /zh/reference/fastgpt-interactive-session-continue
page_type: 技术速查
source: https://doc.fastgpt.cn/openapi/chat
source_type: 官方文档小节
---

# FastGPT交互节点后发起会话继续工作流的操作方法

## 结论
当你接收到FastGPT的交互节点信息后，可通过调用指定API再次发起会话以继续工作流。需根据用户选择、表单输入两种场景，按规则构造请求体中的messages参数。

## 具体怎么做
1. 调用固定API地址：`"http://localhost:3000/api/v1/chat/completions"`，请求方式为POST
2. 配置请求头：
   - `Authorization: Bearer fastgpt-xxx`（xxx替换为你的API密钥）
   - `Content-Type: application/json`
3. 构造请求体，必填参数如下：
   | 参数名 | 取值要求 |
   |---|---|
   | appId | 你的FastGPT应用ID |
   | stream | 固定为`true` |
   | detail | 固定为`true` |
   | chatId | 与当前会话保持一致的ID |
4. 构造`messages`数组，仅包含1个`role: "user"`的对象，`content`按场景填写：
   - 用户选择场景：直接填写选择结果字符串，例如`"Confirm"`
   - 表单输入场景：将用户输入的键值对转为JSON字符串后填入，例如`"{\"测试1\":\"内容\",\"测试2\":666}"`

## 注意事项
1. 必须保持`chatId`与当前会话一致，否则将开启新会话
2. 表单输入场景需严格将键值对对象序列化为字符串作为`content`的值
3. 需严格使用指定的API地址、请求头和参数格式，否则请求将失败
4. `stream`和`detail`参数需固定设为`true`，以符合后续工作流的调用要求

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/chat)
