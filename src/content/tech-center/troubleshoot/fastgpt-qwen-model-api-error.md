---
title: 解决FastGPT接入Qwen模型时core.chat API报错的问题
slug: /zh/troubleshoot/fastgpt-qwen-model-api-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/877
source_type: GitHub issue
---

# 解决FastGPT接入Qwen模型时core.chat API报错的问题

## 现象
用户通过API方式运行Qwen-14B-Chat-Int8模型，通过第三方中转API服务测试接口返回200状态正常。在FastGPT的config.json文件中配置了chatModels数组，添加了model与name均为qwen的模型条目。创建AI应用对话时，页面出现"core.chat API is error or undefined"报错，同时模型侧报错显示TypeError: 'NoneType' object is not iterable，具体报错回溯至openai_api.py第487行的`delay_token_num = max([len(x) for x in stop_words])`代码行。本地运行Web版Qwen模型功能正常。

## 可能原因
模型侧报错代码中，stop_words变量为None，导致无法执行迭代计算max值的操作。结合配置场景，该问题大概率是FastGPT调用模型接口时，未正确传递stop_words参数，或中转层未正确返回该参数，导致模型API接收到的stop_words为None，触发类型错误。

## 排查步骤
1. 打开FastGPT的config.json配置文件，找到chatModels数组中model为qwen的条目，检查是否配置了stop_words参数。
2. 调用中转API服务的Qwen模型接口，查看返回参数中是否包含stop_words字段，且字段值不为None。
3. 对比本地运行Qwen Web版的配置参数，确认是否存在stop_words相关的配置差异。
4. 查看FastGPT的运行日志，获取core.chat API报错的详细上下文信息。

## 解决与验证
在FastGPT的config.json文件的qwen模型配置条目内添加stop_words参数，并赋值为非None的列表值，具体内容需按模型官方要求确认。保存配置后重启FastGPT服务，再次创建AI应用对话，验证core.chat API报错是否消失。同时确认模型侧不再出现TypeError: 'NoneType' object is not iterable的报错，且对话流程正常运行。可再次通过中转API服务测试接口，确认参数传递正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/877)
