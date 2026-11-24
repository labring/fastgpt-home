---
title: 获取FastGPT插件请求的非流式与流式响应数据
slug: /zh/api/fastgpt-plugin-response-fetch
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/chat
source_type: 官方文档小节
---

# 获取FastGPT插件请求的非流式与流式响应数据

## 非流式插件响应获取方式
当请求参数配置为`detail=true`且`stream=false`时，完整响应会返回包含所有流程节点数据的`responseData`数组。插件的输出结果可通过遍历该数组，查找`moduleType`为`pluginOutput`的元素，其内置的`pluginOutput`字段即为插件的最终输出内容。示例响应结构中，该元素会包含`nodeId`为`pluginOutput`、`moduleName`为`插件输出`的字段，其`pluginOutput.result`可直接获取插件返回的文本内容。

## 流式插件响应获取方式
当请求参数配置为`detail=true`且`stream=true`时，响应将以SSE（服务器发送事件）格式返回。需按事件类型分别处理：首先监听`event=flowResponses`的事件，将其`data`字段反序列化为数组后，同样遍历查找`moduleType=pluginOutput`的元素获取插件输出；流式的对话内容则可通过`event=answer`的事件，按标准对话接口的流式获取方式提取，与普通对话的流式响应处理逻辑一致。此外还会返回`event=flowNodeStatus`的事件，用于展示当前运行的流程节点状态。

## 标准操作步骤
1.  配置FastGPT聊天请求的参数，设置`detail=true`，根据需求将`stream`设为`true`（流式）或`false`（非流式）。
2.  非流式场景下，直接解析完整的HTTP响应体，提取`responseData`数组，过滤出`moduleType="pluginOutput"`的元素，读取其`pluginOutput`字段即可得到插件输出。
3.  流式场景下，按SSE协议逐行解析响应内容，当遇到`event: flowResponses`时，将其后的`data`字符串反序列化为数组，按非流式的方式提取插件输出；当遇到`event: answer`时，直接解析`data`中的`choices[0].delta.content`获取流式的对话文本。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/chat)
