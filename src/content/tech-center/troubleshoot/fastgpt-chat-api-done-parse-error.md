---
title: 解决FastGPT Chat API返回[DONE]导致JSON解析异常的问题
slug: /zh/troubleshoot/fastgpt-chat-api-done-parse-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2405
source_type: GitHub issue
---

# 解决FastGPT Chat API返回[DONE]导致JSON解析异常的问题

## 现象
使用FastGPT的Chat API接口时，响应流中会出现`event: answer`与`data: [DONE]`的行。接收端若默认将所有响应内容按JSON格式解析，会触发`JSON 解析失败 D 不是期望的参数`的报错，例如Java端接收数据时会出现该异常。该问题会导致依赖JSON解析的业务逻辑无法正常处理接口响应。

## 可能原因
Chat API默认返回结尾的`[DONE]`标记，该标记不属于标准JSON格式，导致非JSON格式的内容混入响应流，与接收端的JSON解析逻辑不兼容，引发解析失败。当前未提供直接控制该标记是否返回的配置项，导致无法通过配置规避该问题。

## 排查步骤
1. 调用FastGPT的Chat API接口，查看完整响应流内容，确认是否存在`event: answer`和`data: [DONE]`的行。
2. 检查接收端的解析逻辑，确认是否尝试将非JSON格式的响应行直接解析为JSON。
3. 确认当前FastGPT版本中是否存在可配置的参数用于控制是否返回`[DONE]`标记，需按实际环境确认。

## 解决与验证
目前暂无官方配置项用于控制是否返回`[DONE]`标记。若需规避JSON解析异常，可在接收端过滤内容为`data: [DONE]`的响应行后，再对剩余响应内容执行JSON解析。相关控制参数的开发会根据行业标准评估情况推进。

> 来源: [FastGPT GitHub issue #2405](https://github.com/labring/FastGPT/issues/2405)
