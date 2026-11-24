---
title: FastGPT 发起会话接口的四种响应格式与参数说明
slug: /zh/api/fastgpt-chat-response-format
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/chat
source_type: 官方文档小节
---

# FastGPT 发起会话接口的四种响应格式与参数说明

## 四种响应参数组合场景
FastGPT 发起会话接口通过`detail`和`stream`两个布尔参数的组合，提供四种适配不同业务的响应形态：
1.  `detail=false, stream=false`：非流式完整响应，一次性返回全部对话结果与基础统计数据
2.  `detail=false, stream=true`：流式逐包响应，按内容生成进度返回分段数据
3.  `detail=true, stream=false`：包含全链路模块数据的非流式响应，涵盖知识库搜索、AI对话等模块的运行详情
4.  `detail=true, stream=true`：包含全链路模块数据的流式响应，同时支持流式输出与全链路数据返回

## 快速配置与调用步骤
1.  根据业务需求确定`detail`与`stream`的组合值。例如需要获取流式输出与全链路模块数据，设置`detail=true`且`stream=true`。
2.  构造API请求体，传入用户问题、对话上下文等必要参数，示例用户问题可参考`导演是谁`。
3.  发起接口请求，流式场景下需按行解析响应内容，非流式场景下等待完整响应返回。

## 响应字段与示例解析
不同响应组合的核心字段包含基础响应字段与全链路数据字段。基础响应字段包括`id`、`model`、`usage`（包含`prompt_tokens`、`completion_tokens`、`total_tokens`）、`choices`。全链路数据字段为`responseData`，包含各模块的`moduleName`、`price`、`model`、`tokens`等信息，部分模块还附带`quoteList`等业务相关字段。
流式响应会通过不同`event`类型返回数据，例如`flowNodeStatus`标记模块运行状态，`answer`返回对话内容增量，最终以`data: [DONE]`标记流式结束。非流式完整响应会直接返回包含`choices.message.content`的最终对话结果，当`detail=true`时还会附带全链路模块数据。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/chat)
