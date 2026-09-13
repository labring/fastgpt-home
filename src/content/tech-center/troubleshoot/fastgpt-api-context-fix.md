---
title: 解决FastGPT通过API调用时上下文未生效的问题
slug: /zh/troubleshoot/fastgpt-api-context-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/34
source_type: GitHub issue
---

# 解决FastGPT通过API调用时上下文未生效的问题

## 现象
网页端上下文功能正常生效，但通过API调用时，配置的对话上下文未被正确识别，请求返回结果未关联预设的对话历史，无法基于历史对话内容生成对应回复。

## 可能原因
1. 未正确配置OpenAI反向代理的基础URL参数，导致API请求无法正确路由到目标服务；
2. API请求的prompts参数格式或内容传递不符合要求，导致系统无法识别对话历史。

## 排查步骤
1. 检查OpenAI反向代理的base URL配置项是否正确设置，确保指向可用的代理地址。
2. 核对API请求中的prompts参数格式，参考标准格式：
```json
"prompts": [
{
"obj": "System",
"value": "系统提示内容"
},
{
"obj": "Human",
"value": "用户问题内容"
},
{
"obj": "AI",
"value": "AI回复内容"
}
]
```
3. 确认API请求的其他相关参数是否符合官方文档要求，需按实际环境确认。

## 解决与验证
1. 正确配置OpenAI反向代理的base URL参数，补充此前仅配置openaiKey的缺失项。
2. 按照标准格式传递prompts参数，确保每个对话项的obj字段正确对应角色（System、Human、AI），value字段填写对应对话内容。
3. 发起API调用，验证返回结果是否关联预设的对话上下文，确认上下文功能生效。

> 来源: [FastGPT GitHub issue #34](https://github.com/labring/FastGPT/issues/34)
