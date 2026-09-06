---
title: 解决FastGPT关联知识库后对话调用指定模型失败的问题
slug: /zh/troubleshoot/fastgpt-kb-model-call-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/882
source_type: GitHub issue
---

# 解决FastGPT关联知识库后对话调用指定模型失败的问题

## 现象
用户部署FastGPT 4.6.7版本，对接One API，新建应用并配置ChatGLM3模型，关联知识库后，每个对话的第一个问题可正常使用配置的模型回答。当发送第二个问题时，会触发报错：`undefined 当前分组 default 下对于模型 gpt-3.5-turbo-1106 无可用渠道 (request id: 20240222051155844508117UYKSVlFv)`。该问题在删除应用关联的知识库后消失。用户曾删除配置文件中gpt-3.5-turbo、gpt-3.5-turbo-16k相关配置，重启服务后问题仍存在。

## 可能原因
结合用户的排查尝试，问题大概率与应用关联知识库后的模型调用逻辑相关。当应用关联知识库时，系统可能触发了默认的 fallback 模型调用配置，该配置指向了gpt-3.5-turbo-1106。而用户的One API环境中未配置该模型的可用渠道，导致报错出现。需按实际环境确认系统默认模型分组、fallback 配置的具体内容。

## 排查步骤
1.  确认当前FastGPT版本为4.6.7，检查应用配置的目标模型为ChatGLM3，且已关联知识库。
2.  执行删除应用关联的知识库操作，验证报错是否消失，确认问题与知识库关联存在强相关性。
3.  查看FastGPT配置文件中的chatModels配置项，确认是否存在gpt-3.5-turbo-1106相关配置。
4.  核对One API控制台的渠道配置，确认是否存在gpt-3.5-turbo-1106的可用渠道。
5.  重启FastGPT服务，验证配置调整后的效果。

## 解决与验证
临时解决方法为删除应用关联的知识库，该操作可消除报错。永久解决需调整系统模型配置：确保默认模型分组未指定gpt-3.5-turbo-1106作为 fallback 模型，或补充配置该模型的可用渠道。验证方式为重新关联知识库，发起多个连续对话，确认每个对话的所有问题均调用配置的ChatGLM3模型，无报错出现。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/882)
