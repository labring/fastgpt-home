---
title: FastGPT 第三方代码解释器 API 的历史社区分享
slug: /zh/troubleshoot/fastgpt-stale-issue-auto-close
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2396
source_type: GitHub issue
---

# FastGPT 第三方代码解释器 API 的历史社区分享

## 适用场景与历史记录

原议题分享一个个人制作的 Code-Interpreter-Api 项目，评论者表示试用了演示并反馈。 原始讨论提交于 2024-08-14，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

该分享证明第三方项目曾被介绍，集成与维护状态需要单独核对。FastGPT 也提供官方代码运行节点。

## 排查与复测

1. 明确代码解释任务需要的语言、依赖和输入输出。
2. 优先对照 FastGPT 已有代码运行节点的能力与隔离限制。
3. 评估第三方服务时在隔离环境测试超时、资源上限及错误返回，记录维护版本和接口差异。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：我自制一款代码解释器沙箱api，感兴趣的可以来研究一下](https://github.com/labring/FastGPT/issues/2396)

> 来源: [FastGPT 代码运行](https://doc.fastgpt.io/en/guide/build/workflow/nodes/sandbox-v2)
