---
title: 解决FastGPT调用Xinference模型开启知识库时报错500的问题
slug: /zh/troubleshoot/fastgpt-xinference-knowledgebase-500-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2027
source_type: GitHub issue
---

# 解决FastGPT调用Xinference模型开启知识库时报错500的问题

## 现象
用户使用fastgpt 4.6.5、xinference 0.13.0版本，调用Xinference部署的本地chatglm4-chat-9b模型时，不调用知识库的多轮对话正常，但开启知识库后FastGPT返回500错误。同时Xinference后台抛出报错：ValueError: temperature (=0) has to be a strictly positive float, otherwise your next token scores will be invalid.If you're looking for greedy decoding strategies, set `do_sample=False`. 用户已在模型配置文件、FastGPT模型配置中设置temperature为大于0的浮点值，但仍出现该报错。

## 可能原因
该报错的核心触发点为Xinference接收到的temperature参数值为0，违反了模型的解码要求。虽然用户已配置temperature大于0，但可能存在参数未正确传递、被默认值覆盖的情况。需按实际环境确认是否存在配置层覆盖用户设置的参数。

## 排查步骤
1. 登录FastGPT后台，进入对应模型的配置页面，确认temperature参数已设置为大于0的浮点值，并保存配置。
2. 登录Xinference管理后台或查看模型部署日志，确认部署时未强制将temperature设置为0。
3. 抓取FastGPT调用Xinference的接口请求，查看实际传递的temperature参数值。
4. 检查FastGPT的知识库对话模板，确认是否存在独立的参数配置覆盖了全局模型设置。

## 解决与验证
解决方法：
1. 重新保存FastGPT的模型配置，确保temperature参数生效，避免配置未同步。
2. 若FastGPT的知识库对话存在独立参数配置，修改对应模板中的temperature参数为大于0的浮点值。
3. 若确认是FastGPT内部逻辑覆盖了用户配置，可查阅官方文档或提交issue获取支持。

验证步骤：
1. 关闭知识库，发起一轮无知识库的对话，确认模型可正常调用且无报错。
2. 开启知识库，发起多轮对话，确认FastGPT不再返回500错误，Xinference后台无对应temperature报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2027)
