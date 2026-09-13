---
title: 解决FastGPT中月之暗面模型敏感词报错导致对话中断的问题
slug: /zh/troubleshoot/fastgpt-moonshot-sensitive-error-handling
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3555
source_type: GitHub issue
---

# 解决FastGPT中月之暗面模型敏感词报错导致对话中断的问题

## 现象
私有部署4.8.16版本的FastGPT中，使用月之暗面模型时，若请求触发敏感词风控，模型会返回报错"The request was rejected because it was considered high risk"。当对话携带历史记录时，出现该报错后，后续所有对话任务都会持续报错，无法正常使用。

## 可能原因
月之暗面模型对敏感词请求触发风控并返回固定报错文本，FastGPT的对话流程未正确捕获并处理该类错误，导致错误上下文被保留在历史记录中，后续对话复用该上下文后持续触发报错。

## 排查步骤
1.  确认当前使用的是私有部署4.8.16版本，且对话功能开启了历史记录。
2.  发起包含敏感词的对话，获取报错信息，确认报错文本为"The request was rejected because it was considered high risk"。
3.  测试不携带历史记录的对话，观察是否仅单次触发该报错，排除单次模型风控问题。
4.  检查模型调用环节的错误处理逻辑，确认是否未对该风控报错进行捕获与会话重置操作。

## 解决与验证
可根据需求选择两种处理方式：一是在FastGPT的模型调用层添加对该风控报错的捕获，将错误转为友好提示并重置会话上下文，避免错误上下文影响后续对话；二是配置AI对话插件返回原始报错文本，使自定义JS代码可捕获错误并进行会话重置等处理。
验证时，触发敏感词报错后，观察后续对话是否不再持续报错，或确认可正常获取原始报错信息用于自定义处理。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3555)
