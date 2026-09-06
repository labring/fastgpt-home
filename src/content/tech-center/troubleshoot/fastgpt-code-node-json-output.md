---
title: 解决FastGPT代码节点输出被强制转为字符串的问题
slug: /zh/troubleshoot/fastgpt-code-node-json-output
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1664
source_type: GitHub issue
---

# 解决FastGPT代码节点输出被强制转为字符串的问题

## 现象
使用FastGPT的代码节点处理多AI对话串联结果时，当前返回结果为长字符串，需通过特殊字符分隔。用户希望将结果以JSON格式直接返回，但代码节点的输出内容会被强制转为字符串，无法保留原始JSON结构，无法满足需求。

## 可能原因
代码节点的输出内容被平台默认强制转换为字符串类型，无法保留原始的JSON结构，导致无法直接返回符合需求的JSON格式结果。

## 排查步骤
1. 检查代码节点内的输出逻辑，确认是否直接输出JSON对象；
2. 查看代码节点执行后的返回结果，确认是否被转换为带引号的字符串形式；
3. 确认是否存在其他影响输出格式的环节，需按实际环境确认。

## 解决与验证
可在代码节点内手动调用JSON.stringify()方法将JSON对象转换为字符串后再输出，后续可在接收环节解析该字符串。如需保留原始JSON结构，需按实际环境确认平台相关配置项。

> 来源: [FastGPT GitHub issue #1664](https://github.com/labring/FastGPT/issues/1664)
