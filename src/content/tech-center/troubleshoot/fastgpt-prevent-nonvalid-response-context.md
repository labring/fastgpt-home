---
title: 配置FastGPT避免无效应答被加入对话上下文
slug: /zh/troubleshoot/fastgpt-prevent-nonvalid-response-context
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1503
source_type: GitHub issue
---

# 配置FastGPT避免无效应答被加入对话上下文

## 现象
当用户发送存在负向内容的提问时，AI返回警告类无效应答。这类无效应答被默认加入对话上下文，对后续对话无实际意义，且额外消耗token，同时干扰后续AI回答的准确性。

## 可能原因
FastGPT默认将所有完成的对话轮次内容保存为上下文，用于后续对话的理解参考，因此无效应答也会被纳入上下文，导致上下文空间被占用、token消耗增加，同时干扰后续回答。

## 排查步骤
1. 模拟发送存在负向内容的提问，观察AI返回警告类无效应答。
2. 查看后续对话是否受该轮无效应答的内容干扰，或通过对话日志确认该轮内容被计入上下文消耗。
3. 检查是否存在可配置的上下文过滤规则，需按实际环境确认。

## 解决与验证
通过在系统提示词中添加指定内容，引导AI忽略无效应答的上下文影响。具体操作为在提示词中加入"对于上下文你要关注的是结合用户之前的对话去理解，但不要因为上文中你无法回答的问题干扰你本次回答"。验证方式为：再次发送负向提问得到无效应答后，确认后续对话不再受该轮无效应答的干扰，且token消耗未出现额外增长。

> 来源: [FastGPT GitHub issue #1503](https://github.com/labring/FastGPT/issues/1503)
