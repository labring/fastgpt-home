---
title: 解决FastGPT通过OneAPI接入大模型工具调用失败的问题
slug: /zh/troubleshoot/fastgpt-oneapi-toolcall-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1596
source_type: GitHub issue
---

# 解决FastGPT通过OneAPI接入大模型工具调用失败的问题

## 现象
用户使用xinference部署大模型，通过OneAPI自定义渠道接入FastGPT，聊天和补全功能正常，但工具调用失败。用户尝试了三种配置组合，分别出现以下问题：
1. 配置为"toolChoice": true, "functionCall": true时，OneAPI返回报错：bad_response_status_code bad response status code 400 (request id: 2024052522532778097880037127142)。
2. 配置为"toolChoice": false, "functionCall": true时，工具调用有输出，但输出为纯文本，未实际调用工具。
3. 配置为"toolChoice": false, "functionCall": false时，走提示词模式，工具调用效果较差。

## 可能原因
根据FastGPT官方文档的配置说明，工具调用优先使用toolChoice参数，若为false则使用functionCall参数，若仍为false则使用提示词模式。出现工具调用失败的可能原因包括：
1. 配置参数未匹配大模型支持的工具调用模式。
2. OneAPI对FastGPT的工具调用请求格式不兼容。
3. 大模型本身对toolChoice或functionCall的参数支持不足。

## 排查步骤
1. 确认当前FastGPT的工具调用配置参数，包括toolChoice和functionCall的当前值。
2. 查看OneAPI返回的完整报错日志，记录具体的错误信息和请求ID。
3. 按照官方文档的配置优先级，调整toolChoice和functionCall的组合。
4. 测试不同配置组合，复现工具调用失败的场景，对比聊天和补全功能的正常情况，定位工具调用失败的具体表现。
5. 验证大模型是否支持当前配置的工具调用模式。

## 解决与验证
根据官方文档的配置规则，可按以下方式尝试解决：
1. 若大模型不支持toolChoice参数，可将配置调整为"toolChoice": false, "functionCall": true，确保大模型能正确生成符合要求的函数调用格式，避免输出纯文本未实际调用工具。
2. 若配置为"toolChoice": true, "functionCall": true时出现400报错，可检查OneAPI的自定义渠道配置，确认其是否兼容FastGPT的工具调用请求格式。
3. 若使用提示词模式，需完善系统提示词，确保大模型能按照预设规则生成工具调用指令。
验证时，可发起工具调用测试，确认工具调用能正确触发工具，获取到预期的工具返回结果，并正确整理后返回给用户。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1596)
