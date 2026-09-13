---
title: FastGPT 工具调用说明空白：历史记录与诊断步骤
slug: /zh/troubleshoot/fastgpt-tool-call-blank
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5082
source_type: GitHub issue
---

# FastGPT 工具调用说明空白：历史记录与诊断步骤

工具调用说明空白的排查需要区分文档页面、编排中的工具介绍和实际调用响应。原 Issue 缺少复现版本与截图，可先按以下步骤定位空白发生的环节。

## 历史范围与已知事实

[Issue #5082](https://github.com/labring/FastGPT/issues/5082) 于 2025 年 6 月报告“工具调用的说明变成空白”，并附旧文档链接。记录勾选了私有部署，但版本号及复现步骤留空；后续自动关闭反映的是维护状态。该记录支持的问题范围是“说明空白”，具体原因与修复版本需要额外证据。

## 诊断步骤

1. 若空白出现在文档页面，打开当前[工具调用与终止文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/tool)，记录旧链接、响应状态和页面截图，确认新页面内容可读。
2. 若空白出现在工作流，检查工具节点连接及模块或插件的“介绍”。官方文档说明，工具介绍与参数介绍参与模型的调用决策。
3. 仅保留一个工具和一组最小参数，检查保存后重新打开时介绍是否保留，再运行一次测试并查看工具参数、响应和节点运行详情。
4. 若问题表现为模型调用失败，按[官方模型问题排查](https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/model-errors) 验证模型服务的工具调用响应，并记录脱敏错误信息。

## 验证结果

记录具体版本、空白位置和可重复的步骤，分别确认文档可读、工具介绍可保存、调用结果可见。将实际故障与可复现结果对应后，再确定适用的修复方式。
