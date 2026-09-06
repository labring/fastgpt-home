---
title: 解决FastGPT调用OneAPI转发Azure OpenAI的functionCall属性读取报错
slug: /zh/troubleshoot/fastgpt-oneapi-functioncall-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/338
source_type: GitHub issue
---

# 解决FastGPT调用OneAPI转发Azure OpenAI的functionCall属性读取报错

## 现象
用户在私有部署FastGPT中，创建应用与知识库并配置高级编排后，使用OneAPI转发的Azure OpenAI接口（GPT-35-turbo、GPT-35-turbo-16k，API版本2023-07-01-preview）进行聊天时，页面弹出`Cannot read properties of undefined (reading 'functionCall')`报错。同时Docker运行日志中存在对应报错信息，但通过Postman直接调用OneAPI的带`functions`参数的接口可正常返回函数调用结果。

## 可能原因
该报错是FastGPT在解析OneAPI转发的Azure OpenAI接口返回数据时，尝试读取undefined对象的`functionCall`属性导致。由于Postman直接调用OneAPI接口可正常返回结果，问题大概率出在FastGPT对接OneAPI时的响应解析逻辑，或OneAPI返回的响应格式与FastGPT的预期处理逻辑存在差异。

## 排查步骤
1.  通过Postman携带`functions`参数调用OneAPI转发的Azure OpenAI接口，验证是否能正常返回函数调用结果，确认OneAPI与Azure OpenAI的对接状态正常。
2.  检查FastGPT的`config.json`与`docker-compose.yml`中的OneAPI相关配置项，确保接口地址、认证信息与OneAPI的配置完全一致。
3.  查看FastGPT的Docker运行日志，定位到`Cannot read properties of undefined (reading 'functionCall')`报错的代码调用栈，确认错误触发场景。
4.  核对FastGPT中配置的模型版本与API版本，确保与OneAPI中绑定的Azure OpenAI渠道参数一致。

## 解决与验证
首先需在FastGPT的接口响应解析代码中，增加对`functionCall`字段的空值判断逻辑，避免直接读取undefined对象的属性。完成调整后，重启FastGPT的Docker服务。随后进入FastGPT应用的聊天窗口，发送测试问题，确认不再出现上述报错。最后可再次通过Postman调用验证接口正常，同时FastGPT聊天可正常返回预期内容。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/338)
