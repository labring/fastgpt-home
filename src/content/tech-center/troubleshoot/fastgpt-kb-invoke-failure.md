---
title: 解决FastGPT知识库模式下AI不调用知识库的异常问题
slug: /zh/troubleshoot/fastgpt-kb-invoke-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/817
source_type: GitHub issue
---

# 解决FastGPT知识库模式下AI不调用知识库的异常问题

## 现象
用户使用FastGPT私有部署版4.6.8，在知识库模式下，当设置知识库输出数据上限为4000时，AI无法获取知识库内容，仅根据prompt胡乱回答；当设置输出上限少于2000时，无此异常问题。调用的模型为GPT 3.5 turbo-16k。

## 可能原因
目前无明确官方归因，结合现象推测可能与知识库输出长度配置和模型调用的上下文限制相关，具体需按实际部署环境确认。

## 排查步骤
1. 确认当前使用的FastGPT版本为私有部署版4.6.8，调用的模型为GPT 3.5 turbo-16k。
2. 检查知识库的输出数据上限配置，记录当前设置值。
3. 将知识库输出数据上限调整为少于2000，发起相同提问，观察AI回答是否基于知识库内容。
4. 将知识库输出数据上限恢复为4000，再次发起提问，观察是否仍出现未调用知识库的异常。
5. 确认自身API Key可正常调用对应模型，无调用限制或异常。

## 解决与验证
解决方法为调整知识库输出数据上限至2000以内，或确认模型上下文窗口可适配4000长度的知识库拼接内容。验证方式为将知识库输出上限设置为调整后的值，发起提问，确认AI回答基于知识库内容，无异常生成情况。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/817)
