---
title: 解决FastGPT长耗时任务异步推送会话进度消息的需求
slug: /zh/troubleshoot/fastgpt-session-progress-push
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/787
source_type: GitHub issue
---

# 解决FastGPT长耗时任务异步推送会话进度消息的需求

## 现象
使用FastGPT开发的插件处理长耗时任务（如视频生成）时，易因网络异常中断流程，无法在后台异步执行任务并向对应会话推送进度消息。

## 可能原因
FastGPT当前版本未提供直接向任意会话异步推送消息的内置能力，无法满足长任务后台执行后推送进度的场景需求。

## 排查步骤
1.  确认当前FastGPT版本为最新正式版，已查阅项目README文档。
2.  梳理插件接口的执行逻辑，明确是否需要异步处理长耗时任务。
3.  核对FastGPT内置功能，确认是否存在可直接推送会话消息的接口。

## 解决与验证
由于当前FastGPT未提供对应内置方法，需按实际环境确认开发适配方案。可参考需求场景，先通过接口返回响应终止当前工作流，后台执行长耗时任务，待任务进度更新后推送消息至目标会话。验证时需确认异步任务正常执行，且消息可准确推送至指定会话。

> 来源: [FastGPT GitHub issue #787](https://github.com/labring/FastGPT/issues/787)
