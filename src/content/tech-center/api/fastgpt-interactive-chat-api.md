---
title: 详细说明调用包含交互节点的FastGPT会话API接口方法
slug: /zh/api/fastgpt-interactive-chat-api
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/chat
source_type: 官方文档小节
---

# 详细说明调用包含交互节点的FastGPT会话API接口方法

### 交互节点调用基础规则
当工作流中包含交互节点时，调用FastGPT会话API需遵循特定配置规则。需将`detail`参数设置为`true`，并根据流模式获取交互节点信息。流式模式（`stream=true`）下，可从`event=interactive`的`data.interactive`字段获取配置；非流式模式（`stream=false`）下，可从`choices[].message.content`中获取包含`interactive`字段的内容。返回的`interactive`仅包含`type`和`params`两个字段，内部运行态字段如`entryNodeIds`、`memoryEdges`等不会对外暴露。若工作流命中多层`children`/`loop`/`tool`包装的交互，接口会返回最深层面向用户的交互节点。

### 调用配置步骤
1. 发起会话API请求时，必须将`detail`参数配置为`true`。
2. 根据业务需求选择流模式：
   - 启用流式返回：设置`stream=true`，解析`event=interactive`事件下的`data.interactive`字段获取交互配置。
   - 启用非流式返回：设置`stream=false`，从响应的`choices[].message.content`数组中提取包含`interactive`字段的元素。

### 交互节点返回示例
当调用带交互节点的工作流时，若触发交互会直接返回结果。以下为两种常见交互的返回示例：
1. 用户选择交互：
```json
{
  "interactive": {
    "type": "userSelect",
    "params": {
      "description": "测试",
      "userSelectOptions": [
        {"value": "Confirm", "key": "option1"},
        {"value": "Cancel", "key": "option2"}
      ]
    }
  }
}
```
2. 表单输入交互：
```json
{
  "interactive": {
    "type": "userInput",
    "params": {
      "description": "测试",
      "inputForm": [
        {
          "type": "input",
          "key": "测试 1",
          "label": "测试 1",
          "description": "",
          "value": "",
          "defaultValue": "",
          "valueType": "string",
          "required": false,
          "list": [{"label": "", "value": ""}]
        },
        {
          "type": "numberInput",
          "key": "测试 2",
          "label": "测试 2",
          "description": "",
          "value": "",
          "defaultValue": "",
          "valueType": "number",
          "required": false,
          "list": [{"label": "", "value": ""}]
        }
      ]
    }
  }
}
```

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/chat)
