---
title: 解决FastGPT无法兼容reasoning与reasoning_content字段的问题
slug: /zh/troubleshoot/fastgpt-reasoning-field-compatibility
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6748
source_type: GitHub issue
---

# 解决FastGPT无法兼容reasoning与reasoning_content字段的问题

## 现象
在使用FastGPT对接具备思考输出能力的模型时，部分模型的接口响应中，思考内容所在的字段为`reasoning`，而非FastGPT当前默认支持的`reasoning_content`。此时FastGPT无法正确提取该字段的内容，导致对话界面中无法展示模型的思考过程，且无法将思考内容正确传递到后续对话流程中，无法达到预期的输出效果。该问题在v4.12.2私有部署版本中已被用户反馈。

## 可能原因
FastGPT的现有内容提取逻辑仅针对`reasoning_content`字段进行了适配，未同步兼容`reasoning`字段，因此当模型返回的思考内容存储在`reasoning`字段时，系统无法识别并处理该部分数据，进而出现思考内容无法正常展示或传递的问题。由于不同模型的响应字段规范存在差异，仅支持单一字段会导致部分模型无法正常适配。

## 排查步骤
1. 确认当前使用的FastGPT版本为v4.12.2私有部署版本。
2. 调用目标模型的对话接口，查看完整的响应数据，确认思考内容对应的字段名称是否为`reasoning`。
3. 检查FastGPT中用于解析模型响应的核心逻辑代码，确认是否仅配置了从`reasoning_content`字段提取思考内容。
4. 需按实际环境确认FastGPT是否提供了自定义思考内容字段的配置入口或修改点。

## 解决与验证
解决该问题的核心是让FastGPT同时兼容`reasoning`和`reasoning_content`两个字段，提取任意一个字段中的思考内容。具体操作需在FastGPT的模型响应解析逻辑中，增加对`reasoning`字段的识别与提取逻辑，确保两个字段的内容都能被正确处理。验证时，使用返回`reasoning`字段的模型发起对话，确认思考内容可以正常在对话界面展示，且思考内容能被正确传递到后续的对话流程中，达到预期的输出效果。

> 来源：https://github.com/labring/FastGPT/issues/6748
