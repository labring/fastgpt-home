---
title: 修复FastGPT中GPT-4o-mini工具调用数组参数拆分问题
slug: /zh/troubleshoot/fastgpt-gpt4omini-array-param-split
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3197
source_type: GitHub issue
---

# 修复FastGPT中GPT-4o-mini工具调用数组参数拆分问题

## 现象
用户在FastGPT私有部署版本v4.8.13-fix中，将工具参数的变量a类型设置为array<string>。当使用GPT-4o-mini触发工具调用时，若变量a包含两个元素（如a1、a2），工具调用参数会被错误拆分为两条独立的JSON对象记录，根据用户提供的日志截图，展示为{"a": "a1"}、{"a": "a2"}。当使用GPT-3.5-turbo触发相同配置的工具调用时，参数会正常展示为单条包含数组的JSON对象：{"a": ["a1","a2"]}。

## 可能原因
该问题仅在使用GPT-4o-mini模型时出现，未在GPT-3.5-turbo模型中复现，说明与两个模型的工具调用参数输出格式规则存在差异有关。目前暂未明确具体根因，需结合模型的官方输出规范进一步排查确认。

## 排查步骤
1. 确认当前FastGPT的部署版本为v4.8.13-fix，记录版本信息以便后续核对。
2. 进入对应工具的配置页面，检查变量a的参数类型是否被正确设置为array<string>。
3. 分别使用GPT-4o-mini和GPT-3.5-turbo触发工具调用，保持其他配置（如变量值、上下文）一致，对比两次调用的参数输出格式。
4. 查看工具调用的详细日志，确认参数拆分的具体表现，记录异常场景的触发条件。

## 解决与验证
目前该问题暂无临时修复方案，需等待官方发布对应版本的修复补丁。验证修复效果的步骤为：
1. 重新配置工具参数的array<string>类型变量，确保配置无误。
2. 使用GPT-4o-mini触发工具调用，检查参数是否以单条包含数组的JSON对象格式展示。
3. 调用GPT-3.5-turbo进行相同测试，对比两次调用的参数输出是否一致，确认修复效果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3197)
