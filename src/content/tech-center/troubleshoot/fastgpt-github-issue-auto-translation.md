---
title: 解决FastGPT GitHub issue中非英文内容自动翻译相关问题
slug: /zh/troubleshoot/fastgpt-github-issue-auto-translation
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/649
source_type: GitHub issue
---

# 解决FastGPT GitHub issue中非英文内容自动翻译相关问题

## 现象
提交FastGPT项目的GitHub issue时，若提交的内容为非英文，会触发仓库内置的自动化翻译Bot，生成带有明确自动翻译标识的回复，并将原始非英文内容翻译为英文格式。

## 可能原因
该仓库配置了自动化翻译工具，当检测到issue内容的语言非英文时，自动执行翻译操作并发布对应的回复内容。

## 排查步骤
1. 确认本次提交的issue内容所使用的语言是否为非英文
2. 查看该issue的回复区域，确认是否出现带有“检测到非英文内容并自动翻译”标识的内容
3. 核对提交的原始非英文内容与回复中的英文翻译内容是否保持一致
4. 确认该自动翻译内容是否对issue的沟通流程产生影响

## 解决与验证
若需调整该自动翻译的行为，需按实际环境确认对应的配置修改方式。若无需调整自动翻译功能，可按照现有流程提交非英文的issue内容，系统将自动生成对应的翻译回复。若需提交完整的issue内容，可在自动翻译生成回复后，补充功能描述、应用场景、相关示例等相关信息。

> 来源: [FastGPT GitHub issue #649](https://github.com/labring/FastGPT/issues/649)
