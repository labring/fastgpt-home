---
title: 解决FastGPT API调用工具未返回函数调用结果的问题
slug: /zh/troubleshoot/fastgpt-api-no-tool-call-return
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6182
source_type: GitHub issue
---

# 解决FastGPT API调用工具未返回函数调用结果的问题

## 现象
用户通过POST请求调用FastGPT的`/api/v1/chat/completions`接口，请求参数包含`tools`数组，定义了名为`get_current_time`的函数工具，同时配置了`tool_choice: "auto"`、`stream: false`等参数。但API返回的响应中，`choices[0].message`仅包含普通文本回复，未出现预期的`tool_calls`字段，未触发函数调用逻辑，与期望的返回结果不符。实际返回的响应内容如：
```json
{
    "id": "113",
    "model": "",
    "usage": {
        "prompt_tokens": 1,
        "completion_tokens": 1,
        "total_tokens": 1
    },
    "choices": [
        {
            "message": {
                "role": "assistant",
                "content": "我注意到您重复询问了时间。不过，为了获取最准确的信息，我需要调用外部工具来核实当前时间。目前，我无法直接调用时间查询工具，建议您查看设备上的时钟或使用在线时间服务来获取当前准确时间。\n\n如果您需要其他帮助，比如天气信息，我可以协助您查询。"
            },
            "finish_reason": "stop",
            "index": 0
        }
    ]
}
```

## 可能原因
结合该场景的请求与返回结果，可能的触发原因包括：
1.  请求中指定的`model`参数未关联支持函数调用能力的大模型；
2.  `tools`参数中的函数定义格式不符合平台校验规则；
3.  `tool_choice`参数的配置未正确触发自动函数调用逻辑。

## 排查步骤
1.  核对API请求中的`model`参数，确认其关联的大模型支持函数调用功能；
2.  检查`tools`数组内的函数定义，确保`function.parameters`的结构符合要求，包含正确的参数属性与必填项配置；
3.  确认`tool_choice`参数的取值为`auto`或指定具体工具名称，未禁用自动调用；
4.  查看FastGPT服务的运行日志，排查是否存在与工具调用相关的错误提示（日志路径与内容需按实际环境确认）。

## 解决与验证
根据排查出的具体问题进行针对性修复：
1.  若为模型不支持函数调用，更换为支持该能力的模型并更新`model`参数；
2.  若为工具参数格式错误，修正`function.parameters`与`required`字段的配置；
3.  若为`tool_choice`配置错误，调整参数为`auto`或指定目标工具名称。
修复完成后，重新发起相同的API请求，验证返回结果是否包含`tool_calls`字段，且正确触发预期的函数调用，与期望的返回格式一致。

> 来源：[FastGPT GitHub Issue #6182](https://github.com/labring/FastGPT/issues/6182)
